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
                <input class="form-control" v-model="model.name">

            </template>
            <template v-if="mode === 'view'">
                <div class="form-control-static">
                    {{item.name}}
                </div>
            </template>
        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Desc</label>
                <input class="form-control" v-model="model.desc">

            </template>
            <template v-if="mode === 'view'">

                <div class="form-control-static">
                    {{item.desc}}
                </div>

            </template>
        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Image</label>

                <input type="file" @change="onFileChange" class="form-control">

            </template>


            <template v-if="mode === 'view'">

                <div class="form-control-static">
                    {{model.file_name}}
                </div>

            </template>

        </div>

        <div class="col-sm-2">
            <template v-if="mode === 'edit'">

                <label>Image</label>
            </template>

            <div v-if="model.file_url_thumb">
                <img :src="model.file_url_thumb" class="img-responsive"/>
            </div>
        </div>

        <div class="col-sm-1">
            <div class="form-control-static">
                {{item.revision}}

            </div>
        </div>

        <div class="col-sm-2">
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
                type: Object,

            },
        },
        data() {
            return {
                mode: 'view',
                model: this.item,
            }
        },
        methods: {
            resetModel(){
                this.model = _.extend({
                    file_url_thumb: null,
                }, this.item);
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
                this.mode = 'view';
                this.$store.dispatch('update', {
                    id: this.model.id,
                    name: this.model.name,
                    desc: this.model.desc,
                    file: this.model.file,
                });

            },

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.setImage(files[0]);
            },

            setImage(file) {
                let reader = new FileReader();
                let vm     = this;

                this.model.file      = file;
                this.model.file_name = file.name;

//                var fs = filesize(file.size);

//                console.log(fs);

                reader.onload = (e) => {
                    vm.model.file_url_thumb = e.target.result;
                };
                reader.readAsDataURL(file);

            },

            remove(){
                this.$store.dispatch('delete', this.model);
            },
        },
        watch: {
            item(item){
                this.model = _.extend({}, item);
            }
        },
    }
</script>


<style lang="scss" scoped>


</style>