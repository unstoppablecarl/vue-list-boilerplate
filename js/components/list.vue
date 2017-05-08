<template>
    <div class="list-container">
        <p>
            <strong>Async State:</strong> {{async_state ? async_state : 'none'}}
        </p>

        <hr/>

        <div class="list">
            <div class="row list-header">
                <div class="col-sm-1">
                    ID

                </div>
                <div class="col-sm-4">
                    Name

                </div>
                <div class="col-sm-4">
                    Desc

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

            <template v-if="loading">
                <h3 class="text-center">Loading... </h3>
            </template>

        </div>

        <list-item-new></list-item-new>
    </div>

</template>

<script>
    import ListItem from './list-item';
    import ListItemNew from './list-item-new';
    import {mapState} from 'vuex';

    export default {
        name: 'list',
        components: {
            ListItem,
            ListItemNew,
        },
        computed: {
            loading(state) {
                return state.async_state === 'fetching';
            },

            ...mapState({
                async_state: 'async_state',
                items: 'items',

            })

        },
    }
</script>