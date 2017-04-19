<template>
    <input type="file" @change="onFileChange" class="form-control" ref="file_input">

</template>


<script>
    export default {
        name: 'field-file',
        props: {},
        methods: {
            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                this.setImage(files[0]);
            },

            setImage(file) {

                this.$emit('file-changed', file);
                this.$emit('file-name-changed', file.name);
                this.$emit('file-size-changed', file.size);

                let reader = new FileReader();
                reader.onload = (e) => {
                    this.$emit('file-preview-changed', e.target.result);
                };

                reader.readAsDataURL(file);
            },

            clear(){
                this.$refs.file_input.value = null;
            }
        }
    }
</script>
