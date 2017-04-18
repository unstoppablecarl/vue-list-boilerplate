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

        let data = _.sortBy(this.items, 'display_order');

        data = data.map((item) => {
            let cItem = _.extend({}, item);
            delete cItem.display_order;
            return cItem;
        });

        console.log('server', 'fetch', data);
        return Promise.resolve(data);
    },
    create(item){
        item = json(item);

        item.id             = idIncrement++;
        let created         = makeItem(item);
        this.items[item.id] = created;

        console.log('server', 'create', created);
        return Promise.resolve(created);
    },
    update(item){
        item = json(item);

        let updated         = makeItem(item);
        this.items[item.id] = updated;

        console.log('server', 'update', updated);
        return Promise.resolve(updated);
    },
    sync(allItems){
        allItems = json(allItems);

        this.items = {};
        let items  = this.items;
        allItems.forEach(function (item, index) {
            item.display_order = index;
            items[item.id]     = item;
        });

        console.log('server', 'sync');
        return this.fetch();

    },
    delete(item){
        item = json(item);

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


function json(data) {
    return JSON.parse(JSON.stringify(data));
}
