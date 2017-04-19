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
                <div class="col-sm-3">
                    Thumb
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

        <list-item-new

            :upload_percent="new_item_upload_percent"
        >
        </list-item-new>

        <br><br>
    </div>

</template>

<script>
    import ListItemNew from './list-item-new';

    export default {
        components: {
            ListItemNew
        },
        name: 'list',
        data: function () {
            return {

            };
        },
        methods: {

        },
        computed: {
            items(){
                return this.$store.getters.items;
            },
            new_item_upload_percent(){
                return this.$store.state.new_item_upload_percent;
            }
        }
    }
</script>