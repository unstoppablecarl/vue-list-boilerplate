<template>
    <div>
        <div class="list">
            <div class="row list-header">
                <div class="col-sm-1">
                    ID
                </div>
                <div class="col-sm-4">
                    Name
                </div>
                <div class="col-sm-4">
                    Desc
                </div>
                <div class="col-sm-1">
                    Revision
                </div>
                <div class="col-sm-2">
                    Actions
                </div>
            </div>

            <draggable class="list-group"
                       v-model="items"
                       :options="sortableOptions"
                       @change="onSortableChange"
            >
                <transition-group type="transition">

                    <list-item
                            v-for="item in items"
                            :key="item.id"
                            :item="item"
                    ></list-item>
                </transition-group>
            </draggable>
        </div>

        <br>
        <br>

        <div class="row list-item-new">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-4">
                <input
                        class="form-control"
                        v-model="newItem.name"
                        @keyup.enter="addItem()"
                        placeholder="Name"
                >
            </div>
            <div class="col-sm-4">

                <input
                        class="form-control"
                        v-model="newItem.desc"
                        @keyup.enter="addItem()"
                        placeholder="Desc"
                >
            </div>

            <div class="col-sm-1">

            </div>
            <div class="col-sm-2">
                <button class="btn btn-success" @click="addItem()">Add</button>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: 'list',
        data: function () {
            return {
                newItem: {},
            };
        },
        methods: {
            addItem() {
                this.$store.dispatch('create', this.newItem);
                this.newItem = {};
            },
            onSortableChange(event){
                let moved = event.moved;
                if (!moved) {
                    return;
                }

                let settings = {
                    item: moved.element,
                    newIndex: moved.newIndex,
                };

                this.$store.dispatch('move', settings);

                console.log('change', event);

            }
        },
        computed: {
            items(){
                return this.$store.getters.items;
            },

            sortableOptions () {
                return {
                    ghostClass: 'sortable-ghost',
                    chosenClass: 'sortable-chosen',  // Class name for the chosen item
                    filter: '.sortable-disabled',  // Selectors that do not lead to dragging (String or Function)
                    forceFallback: true
                };
            },

        }
    }
</script>