export {
    findItemIndex,
    updateItem,
    deleteItem,
    moveItem,
    move,
};

function findItemIndex(items, item) {
    for (let i = 0; i < items.length; i++) {
        let cItem = items[i];
        if (cItem && item.id == cItem.id) {
            return i;
        }
    }
    throw Error('Item not found', item);

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

function moveItem(items, item, toIndex) {
    let index = findItemIndex(items, item);
    move(items, index, toIndex);
}

function move(items, fromIndex, toIndex) {
    let item = items.splice(fromIndex, 1)[0];
    items.splice(toIndex, 0, item);

}
