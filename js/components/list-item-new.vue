<template>
    <div>
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

                    <input class="form-control" v-model="name">

                </template>
                <template v-if="mode === 'saving'">
                    <div class="form-control-static">
                        {{name}}
                    </div>
                </template>
            </div>

            <div class="col-sm-2">
                <template v-if="mode === 'edit'">

                    <input class="form-control" v-model="desc">

                </template>
                <template v-if="mode !== 'edit'">

                    <div class="form-control-static">
                        {{desc}}
                    </div>

                </template>
            </div>

            <div class="col-sm-2">

                <field-file
                    @file-preview-changed="onPreviewChanged"
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

                <template v-if="mode === 'saving'">
                    <strong>Uploading</strong>
                    {{upload_percent}}%
                </template>
                <template v-if="mode === 'edit'">
                    <button class="btn btn-success" @click="add()">Add</button>

                    <template v-if="!modelEmpty">
                        <button class="btn btn-default" @click="reset()">Cancel</button>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    import FieldFile from './field-file';

    function start() {
        return {
            mode: 'edit',
            name: null,
            desc: null,
            file: null,
            thumb_preview: null,
        }
    }

    export default {
        name: 'list-item-new',
        components: {
            FieldFile
        },
        props: {
            upload_percent: {
                type: Number
            }
        },
        data() {
            return start()
        },
        methods: {
            reset(){
                _.extend(this.$data, start());
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

            onPreviewChanged(preview){
                this.thumb_preview = preview;
            }
        },
        computed: {
            modelEmpty(){
                return !(this.name || this.desc || this.file);
            }
        }
    }
</script>