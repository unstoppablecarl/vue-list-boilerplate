import {
    updateItem,
    deleteItem,
    moveItem,
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
            move(state, {item, newIndex}){
                moveItem(state.items, item, newIndex);
            },
            clear(state){
                state.items = [];
            }

        },
        actions: {
            create({commit}, item){
                commit('create', serverItem);
            },

            update({commit, state}, item){
                commit('update', serverItem);
            },

            delete({commit}, item){
                commit('delete', serverItem);
            },

            move({commit, state}, {item, newIndex}){
                commit('move', {item, newIndex});
            },

            fetch({commit}){
                commit('clear');

                return server.fetch()
                    .then(function (items) {
                        items.forEach(function (item) {
                            commit('create', item);
                        });
                    });
            },

            sync({commit, state}){

                return server.sync(state.items)
                    .then(function (items) {
                        commit('clear');

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

