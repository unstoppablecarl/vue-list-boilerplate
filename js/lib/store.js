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
            move({commit, state}, {item, newIndex}){
                commit('move', {item, newIndex});
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
            },
            asyncState(state){
                return state.asyncState;
            }
        }
    });

}

