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

        <list-item-new></list-item-new>
    </div>

</template>

<script>
    import ListItem from './list-item';
    import ListItemNew from './list-item-new';
    import draggable from 'vuedraggable';
    export default {
        name: 'list',
        components: {
            ListItem,
            ListItemNew,
            draggable,
        },
        methods: {
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
                    filter: 'input',  // Selectors that do not lead to dragging (String or Function)
                    preventOnFilter: false,
                    forceFallback: true,
                    draggable: '.list-item-sortable'
                };
            },
            loading(){
                return this.$store.getters.asyncState === 'fetching';
            }

        }
    }
</script>