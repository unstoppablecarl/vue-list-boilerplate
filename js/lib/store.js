import server from './fake-server';

export default new Vuex.Store({
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
            server.create(item)
                .then(function (item) {
                    commit('create', item)
                });
        },
        update({commit}, item){
            server.update(item)
                .then(function (item) {
                    commit('update', item)
                });
        },
        delete({commit}, item){
            server.delete(item)
                .then(function (item) {
                    commit('delete', item)
                });
        },
        fetch({commit}){
            server.fetch()
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

function findItemIndex(items, item) {
    for (let i = 0; i < items.length; i++) {
        let cItem = items[i];
        if (cItem && item.id == cItem.id) {
            return i;
        }
    }
}

function updateItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === -1) {
        return;
    }

    items.splice(index, 1, item);
}

function deleteItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === -1) {
        return;
    }

    items.splice(index, 1);
}