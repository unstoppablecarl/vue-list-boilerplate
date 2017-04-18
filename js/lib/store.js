import {
    updateItem,
    deleteItem,
} from './collection-helper';

export default function ({server}) {

    return new Vuex.Store({
        state: {
            items: [],
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
        },
        actions: {
            create({commit}, item){
                return server.create(item)
                    .then(function (serverItem) {
                        commit('create', serverItem);
                    });
            },
            update({commit}, item){
                return server.update(item)
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
                        items.forEach(function (item) {
                            commit('create', item);
                        });
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