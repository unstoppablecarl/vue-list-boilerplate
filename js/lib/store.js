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
            fetch(state, items){
                state.items = items;
            }
        },
        actions: {
            create({commit, state}, item){
                state.new_item_upload_percent = 0;

                let callback = function (x, percent) {
                    state.new_item_upload_percent = percent;
                };

                return server.create(item, callback)
                    .then(function (serverItem) {
                        commit('create', serverItem);
                    });
            },
            update({commit, state}, item){
                let callback = function (x, percent) {
                    console.log('percent', percent);
                    commit('update', {
                        id: item.id,
                        upload_percent: percent
                    });
                };

                return server.update(item, callback)
                    .then(function (serverItem) {
                        commit('update', serverItem);
                    });
            },
            delete({commit}, item){
                return server.delete(item)
                    .then(function (serverItem) {
                        commit('delete', serverItem);
                    });
            },
            fetch({commit}){
                return server.fetch()
                    .then(function (items) {
                        commit('fetch', items);
                    });
            }

        },
        getters: {
            items(state){
                return state.items;
            }
        }
    });

}