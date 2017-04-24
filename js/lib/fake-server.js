export default function ({
                             emptyItem = {
                                 id: null,
                                 name: null,
                                 desc: null,
                                 revision: null,
                             },
                             responseDelay = 2000,
                             fetchResponseDelay = 500,
                         }) {

    let idIncrement = 1;

    return {
        items: {},
        fetch(){
            let data = _.sortBy(this.items, 'display_order');

            data = data.map((item) => {
                let cItem = _.extend({}, item);
                delete cItem.display_order;
                return cItem;
            });

            console.log('server', 'fetch', data);
            return delayedResponse(data, fetchResponseDelay);

        },
        create(item){
            item = json(item);

            item.id             = idIncrement++;
            let created         = makeItem(item);
            this.items[item.id] = created;

            console.log('server', 'create', created);
            return delayedResponse(created, responseDelay);

        },
        update(item){
            item                = json(item);
            let current         = this.items[item.id];
            item.revision       = current.revision;
            let updated         = makeItem(item);
            this.items[item.id] = updated;

            console.log('server', 'update', updated);
            return delayedResponse(updated, responseDelay);

        },
        delete(item){
            item = json(item);

            let current = this.items[item.id];
            let deleted = makeItem(current);

            delete this.items[item.id];

            console.log('server', 'delete', deleted);
            return delayedResponse(deleted, responseDelay);
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
    };

    function makeItem(item) {
        return itemFactory(item, emptyItem);
    }

}

function itemFactory(item, emptyItem) {
    let result = _.extend({revision: 0}, emptyItem, item);

    result.revision++;

    return result;
}

function json(data) {
    return JSON.parse(JSON.stringify(data));
}

function delayedResponse(value, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value)
        }, delay);
    });
}