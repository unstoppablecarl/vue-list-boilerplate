<template>
    <div>
        <div class="list">
            <div class="row list-header">
                <div class="col-sm-1">
                    ID
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
                <div class="col-sm-2">
                    Thumb
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
            <div class="col-sm-2">
                <input
                        class="form-control"
                        v-model="newItem.name"
                        @keyup.enter="addItem()"
                        placeholder="Name"
                >
            </div>
            <div class="col-sm-2">

                <input
                        class="form-control"
                        v-model="newItem.desc"
                        @keyup.enter="addItem()"
                        placeholder="Desc"
                >
            </div>


            <div class="col-sm-2">
                <input type="file" @change="onFileChange" ref="file_input" class="form-control">
            </div>

            <div class="col-sm-2">

                <div v-if="new_file_url">
                    <img :src="new_file_url" class="img-responsive"/>
                </div>
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
                new_file_url: null,
                new_file_name: null,
            };
        },
        methods: {
            addItem() {
                this.$store.dispatch('create', this.newItem);
                this.newItem = {};
                this.new_file_url  = null;
                this.new_file_name = null;

                this.$refs.file_input.value = null;

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

                this.newItem.file  = file;
                this.new_file_name = file.name;

//                var fs = filesize(file.size);

//                console.log(fs);

                reader.onload = (e) => {
                    vm.new_file_url = e.target.result;
                };
                reader.readAsDataURL(file);

            },
        },
        computed: {
            items(){
                return this.$store.getters.items;
            },
        }
    }
</script>