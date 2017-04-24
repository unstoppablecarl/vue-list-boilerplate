<template>
    <div class="row list-item">
        <div class="col-sm-1">

            <template v-if="mode === 'edit'">
                <label>ID</label>
            </template>

            <div class="form-control-static">
                {{item.id}}
            </div>
        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Name</label>
                <input type="text" class="form-control" v-model="model.name">

            </template>
            <template v-else>
                <div class="form-control-static">
                    {{item.name}}
                </div>
            </template>
        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Desc</label>
                <input type="text" class="form-control" v-model="model.desc">

            </template>
            <template v-else>

                <div class="form-control-static">
                    {{item.desc}}
                </div>

            </template>
        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Image</label>
                <field-file
                        @file-changed="model.file = $event"
                        @file-preview-changed="thumb_preview = $event"
                        ref="input_file"
                >
                </field-file>

            </template>

            <template v-else>

                <div class="form-control-static">

                    <a :href="model.file_url" target="_blank">
                        {{model.file_name}}
                    </a>
                </div>

            </template>

        </div>

        <div class="col-sm-3">
            <template v-if="mode === 'edit'">
                <label>Image</label>
            </template>

            <template v-if="thumb_preview">
                <img :src="thumb_preview" class="img-responsive"/>
            </template>

            <template v-else-if="model.file_url_thumb">
                <img :src="model.file_url_thumb" class="img-responsive"/>
            </template>

        </div>

        <div class="col-sm-2">

            <template v-if="mode === 'save'">
                <label>Saving</label><br>
                {{upload_percent}} %
            </template>

            <template v-if="mode === 'delete'">
                <label>Deleting</label><br>
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
    import FieldFile from './field-file';
    import Model from '../lib/model';

    let model = Model({
        defaults: {
            id: null,
            name: null,
            desc: null,

            file: null,
            file_name: null,
            file_size: null,
        }
    });

    let parse = model.parse;

    export default {
        name: 'list-item',
        components: {
            FieldFile,
        },
        props: {
            item: {
                type: Object,
            },
        },
        data() {
            return {
                mode: 'view',
                thumb_preview: null,
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
                        this.thumb_preview = null;
                    });
            },
            remove(){
                this.mode = 'delete';

                this.$store
                    .dispatch('delete', this.model);
            },
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