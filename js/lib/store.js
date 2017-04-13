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

function findItemIndex(items, item) {
    for (let i = 0; i < items.length; i++) {
        let cItem = items[i];
        if (cItem && item.id == cItem.id) {
            return i;
        }
    }
    console.error('not found', item);

    return false;
}

function updateItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === false) {
        return;
    }

    items.splice(index, 1, item);
}

function deleteItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === false) {
        return;
    }

    items.splice(index, 1);
}
