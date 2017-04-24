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

            <template v-if="loading">
                <h3 class="text-center">Loading... </h3>
            </template>

        </div>

        <list-item-new
            :upload_percent="new_item_upload_percent"
        >
        </list-item-new>

    </div>

</template>

<script>
    import ListItem from './list-item';
    import ListItemNew from './list-item-new';

    export default {
        name: 'list',
        components: {
            ListItem,
            ListItemNew
        },
        computed: {
            items(){
                return this.$store.getters.items;
            },
            loading(){
                return this.$store.getters.async_state === 'fetching';
            },
        }
    }
</script>