let idIncrement = 1;
const emptyItem = {
    id: null,
    name: null,
    desc: null,
    revision: null,
};

export default {
    items: {},
    fetch(){
        let data = _.values(this.items);

        console.log('server', 'fetch', data);
        return Promise.resolve(data);
    },
    create(item){
        item.id             = idIncrement++;
        let created         = makeItem(item);
        this.items[item.id] = created;

        console.log('server', 'create', created);
        return Promise.resolve(created);
    },
    update(item){
        let updated         = makeItem(item);
        this.items[item.id] = updated;

        console.log('server', 'update', updated);
        return Promise.resolve(updated);

    },
    delete(item){
        let current = this.items[item.id];
        let deleted = makeItem(current);

        delete this.items[item.id];

        console.log('server', 'delete', deleted);
        return Promise.resolve(deleted);
    }
};

function makeItem(item) {
    let result = _.extend({revision: 0,}, emptyItem, item);

    result.revision++;

    return result;
}

