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
                <input type="text" class="form-control" v-model="model.name">

            </template>
            <template v-else>
                <div class="form-control-static">
                    {{model.name}}
                </div>
            </template>
        </div>

        <div class="col-sm-4">
            <template v-if="mode === 'edit'">

                <label>Desc</label>
                <input type="text" class="form-control" v-model="model.desc">

            </template>

            <template v-else>

                <div class="form-control-static">
                    {{model.desc}}
                </div>

            </template>
        </div>

        <div class="col-sm-1">
            <div class="form-control-static">
                {{model.revision}}
            </div>
        </div>

        <div class="col-sm-2">

            <template v-if="mode === 'save'">
                <div class="form-control-static">
                    <strong>Saving</strong>
                </div>
            </template>

            <template v-if="mode === 'delete'">
                <div class="form-control-static">
                    <strong>Deleting</strong>
                </div>
            </template>

            <template v-if="mode === 'edit'">
                <label>Editing</label>
                <br>
                <button class="btn btn-success" :disabled="!itemValid" @click="save()">Save</button>
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

    import Model from '../lib/model';

    let {parse} = Model({
        defaults: {
            id: null,
            name: null,
            desc: null,
            revision: null,
        }
    });

    export default {
        name: 'list-item',
        props: {
            item: {
                type: Object,
            },
        },
        data() {
            return {
                mode: 'view',
                model: parse(this.item),
            };
        },
        methods: {
            resetModel(){
                this.model = parse(this.item);
            },
            edit(){
                this.resetModel();
                this.mode = 'edit';
            },
            cancelEdit(){
                this.resetModel();
                this.mode = 'view';
            },

            save(){
                this.mode = 'save';
                this.$store
                    .dispatch('update', this.model)
                    .then(() => {
                        this.mode = 'view';
                    });
            },
            remove(){
                this.mode = 'delete';

                this.$store
                    .dispatch('delete', this.model);
            },
        },
        watch: {
            item(item){
                this.model = parse(item);
            }
        },
        computed: {
            itemValid(){
                return this.model.name || this.model.desc;
            }
        }
    }
</script>


<style lang="scss" scoped>

</style>