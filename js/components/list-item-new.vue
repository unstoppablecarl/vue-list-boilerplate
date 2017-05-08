<template>
    <div class="list-item-new-container">

        <div class="row list-header">
            <div class="col-sm-1">

            </div>
            <div class="col-sm-2">
                Name
            </div>
            <div class="col-sm-2">
                Desc
            </div>
            <div class="col-sm-2">
                Image
            </div>
            <div class="col-sm-3">
                Thumb
            </div>
            <div class="col-sm-2">
                Actions
            </div>
        </div>

        <div class="row list-item-new">
            <div class="col-sm-1">
            </div>
            <div class="col-sm-2">
                <template v-if="mode === 'edit'">

                    <input  type="text" class="form-control" v-model="model.name">

                </template>

                <template v-if="mode === 'saving'">
                    <div class="form-control-static">
                        {{model.name}}
                    </div>
                </template>

            </div>

            <div class="col-sm-2">
                <template v-if="mode === 'edit'">

                    <input  type="text" class="form-control" v-model="model.desc">

                </template>
                <template v-else>

                    <div class="form-control-static">
                        {{model.desc}}
                    </div>

                </template>
            </div>

            <div class="col-sm-2">

                <field-file
                    @file-changed="model.file = $event"
                    @file-preview-changed="thumb_preview = $event"
                    ref="new_file"
                >
                </field-file>

            </div>

            <div class="col-sm-3">

                <div v-if="thumb_preview">
                    <img :src="thumb_preview" class="img-responsive"/>
                </div>

            </div>

            <div class="col-sm-2">

                <template v-if="mode === 'save'">
                    <strong>Uploading</strong>
                    {{upload_percent}}%
                </template>

                <template v-if="mode === 'edit'">
                    <button class="btn btn-success" :disabled="!itemValid" @click="add()">Add</button>

                    <template v-if="itemValid">
                        <button class="btn btn-default" @click="reset()">Cancel</button>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import FieldFile from './field-file';
    import Model from '../lib/model';
    import { extend } from "lodash";

    let model = Model({
        defaults: {
            id: null,
            name: null,
            desc: null,

            file: null,
            file_name: null,
            file_size: null,
            file_url: null,
            file_url_thumb: null,
        }
    });

    function start() {
        return {
            mode: 'edit',
            model: model.defaults(),
            thumb_preview: null,
        }
    }

    export default {
        name: 'list-item-new',
        components: {
            FieldFile
        },
        data() {
            return start()
        },
        methods: {
            reset(){
                extend(this.$data, start());
                this.$refs.new_file.clear();
            },
            add() {
                this.mode = 'saving';

                this.$store
                    .dispatch('create', this.model)
                    .then(() => {
                        this.reset();
                    });
            },

        },
        computed: {
            itemValid(){
                return this.name || this.desc || this.file;
            },
            new_item_upload_percent(){
                return this.$store.state.new_item_upload_percent;
            },
        }
    }
</script>