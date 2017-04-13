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

            <list-item
                    v-for="item in items"
                    :key="item.id"
                    :item="item"
            ></list-item>

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
                newItem: {
                    name: null,
                    desc: null,
                    file: null,
                },
            };
        },
        methods: {
            addItem() {
                this.$store.dispatch('create', this.newItem);
                this.newItem = {};
            },
        },
        computed: {
            items(){
                return this.$store.getters.items;
            },
        }
    }
</script>