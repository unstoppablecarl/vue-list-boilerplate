import {
    updateItem,
    deleteItem,
} from './collection-helper';

export default function ({server}) {

    return new Vuex.Store({
        state: {
            items: [],
            asyncState: null,
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
            asyncState(state, value){
                state.asyncState = value;
            }
        },
        actions: {
            create({commit, state}, item){
                commit('asyncState', 'creating');

                return server.create(item)
                    .then(function (serverItem) {

                        commit('asyncState', null);
                        commit('create', serverItem);

                    });
            },
            update({commit}, item){
                commit('asyncState', 'updating');

                return server.update(item)
                    .then(function (serverItem) {

                        commit('asyncState', null);
                        commit('update', serverItem);

                    });
            },

            delete({commit}, item){
                commit('asyncState', 'deleting');

                return server.delete(item)
                    .then(function (serverItem) {

                        commit('asyncState', null);
                        commit('delete', serverItem);

                    });
            },
            fetch({commit}){
                commit('asyncState', 'fetching');

                return server.fetch()
                    .then(function (items) {

                        commit('asyncState', null);
                        items.forEach(function (item) {
                            commit('create', item);
                        });

                    });
            }

        },
        getters: {
            items(state){
                return state.items;
            },
            asyncState(state){
                return state.asyncState;
            }
        }
    });

}