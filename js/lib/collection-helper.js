import { extend, findIndex } from "lodash";

export {
    findItemById,
    findItemIndexById,
    findItemIndex,
    updateItem,
    replaceItem,
    deleteItem,
    moveItem,
    move,
};

function findItemById(items, id) {
    let index = findItemIndexById(items, id);
    if (index === false) {
        throw Error('Item not found with id', id);
    }
    return items[index];
}

function findItemIndexById(items, id) {
    let index = findIndex(items, ['id', id]);
    if (index === -1) {
        return false;
    }
    return index;
}

function findItemIndex(items, item) {
    return findItemIndexById(items, item.id);
}

function replaceItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === false) {
        throw Error('Item not found', item);
    }

    items.splice(index, 1, item);
}

function updateItem(items, item){

    let index = findItemIndex(items, item);
    if (index === false) {
        throw Error('Item not found', item);
    }
    let current = items[index];
    let updated = extend({}, current, item);

    items.splice(index, 1, updated);
}

function deleteItem(items, item) {
    let index = findItemIndex(items, item);
    if (index === false) {
        throw Error('Item not found', item);
    }

    items.splice(index, 1);
}

function moveItem(items, item, toIndex) {
    let index = findItemIndex(items, item);
    if (index === false) {
        throw Error('Item not found', item);
    }
    move(items, index, toIndex);
}

function move(items, fromIndex, toIndex) {
    let item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);

}
