import {
    updateItem,
    deleteItem,
} from './collection-helper';

export default function ({server}) {

    return new Vuex.Store({
        strict: true,
        state: {
            items: [],
            new_item_upload_percent: 0,
   			async_state: null,
        },
        mutations: {
            create(state, item){
                state.items.push(item);
            },
            update(state, item){
                updateItem(state.items, item);
            },
            delete(state, item){
                deleteItem(state.items, item);
            },
			clear(state){
                state.items = [];
            },
            async_state(state, value){
                state.async_state = value;
            },
            fetch(state, items){
                state.items = items;
            },
        },
        actions: {
            create({commit, state}, item){
                commit('async_state', 'creating');

                state.new_item_upload_percent = 0;

                let callback = function (x, percent) {
                    state.new_item_upload_percent = percent;
                };

                return server.create(item, callback)
                    .then(function (serverItem) {

                        commit('async_state', null);
                        commit('create', serverItem);
                    });
            },
            update({commit, state}, item){
                commit('async_state', 'updating');

                let callback = function (x, percent) {
                    console.log('percent', percent);

                    commit('update', {
                        id: item.id,
                        upload_percent: percent
                    });
                };

                return server.update(item, callback)
                    .then(function (serverItem) {

                        commit('async_state', null);
                        commit('update', serverItem);

                    });
            },
            delete({commit}, item){
                commit('async_state', 'deleting');

                return server.delete(item)
                    .then(function (serverItem) {

                        commit('async_state', null);
                        commit('delete', serverItem);

                    });
            },
            fetch({commit}){
                commit('async_state', 'fetching');

                return server.fetch()
                    .then(function (items) {

                        commit('async_state', null);
                        commit('fetch', items);

                    });
            },
			sync({commit, state}){
                commit('async_state', 'syncing');

                return server.sync(state.items)
                    .then(function (items) {

                        commit('async_state', null);
                        commit('fetch', items);

                    });
            },
        },
    });
}