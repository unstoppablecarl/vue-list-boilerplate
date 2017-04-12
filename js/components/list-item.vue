<template>
    <div class="row list-item">
        <div class="col-sm-1">
            <template v-if="mode === 'edit'">
                <label>ID</label>
            </template>
            <div class="form-control-static">
                {{model.id}}
            </div>
        </div>

        <div class="col-sm-4">
            <template v-if="mode === 'edit'">

                <label>Name</label>
                <input class="form-control" v-model="model.name">

            </template>
            <template v-if="mode === 'view'">
                <div class="form-control-static">
                   {{model.name}}
                </div>
            </template>
        </div>

        <div class="col-sm-4">
            <template v-if="mode === 'edit'">

                <label>Desc</label>
                <input class="form-control" v-model="model.desc">

            </template>
            <template v-if="mode === 'view'">

                <div class="form-control-static">
                    {{model.desc}}

                </div>

            </template>
        </div>

        <div class="col-sm-3">
            <template v-if="mode === 'edit'">
                <label>Editing</label><br>

                <button class="btn btn-success" @click="save()">Save</button>
                <button class="btn btn-default" @click="cancelEdit()">Cancel</button>

            </template>
            <template v-if="mode === 'view'">
                <button class="btn btn-default" @click="edit()">Edit</button>
                <button class="btn btn-danger" @click="remove()">Delete</button>
            </template>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'list-item',
        props: {
            item: {
                type: Object
            }
        },
        data() {
            return {
                mode: 'view',
                model: this.item,
                prev: {}
            }
        },
        methods: {
            _setPrev(){
                this.prev = _.extend({}, this.model);
            },
            _revertPrev(){
                this.model = _.extend({}, this.prev);
                this.prev  = {}
            },

            edit(){
                this._setPrev();
                this.mode = 'edit';
            },
            cancelEdit(){
                this._revertPrev();
                this.mode = 'view';
            },

            save(){
                this.mode = 'view';
                this.$store.dispatch('update', this.model);
            },
            remove(){
                this.$store.dispatch('delete', this.model);
            }
        }
    }
</script>


<style lang="scss" scoped>


</style>