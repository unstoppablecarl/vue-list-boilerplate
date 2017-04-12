let idIncrement = 3;
const emptyItem = {
    id: null,
    name: null,
    desc: null,
};

export default {
    items: {},
    fetch(){
        let data = _.values(this.items);

        return new Promise((resolve, reject) => {
            console.log('server', 'fetch', data);
            resolve(data);
        });
    },
    create(item){
        item.id             = idIncrement++;
        item                = makeItem(item);
        this.items[item.id] = item;

        return new Promise((resolve, reject) => {
            console.log('server', 'create', item);
            resolve(item);

        });
    },
    update(item){
        let current         = this.items[item.id];
        let updated         = _.extend(current, item);
        this.items[item.id] = updated;

        return new Promise((resolve, reject) => {

            console.log('server', 'update', item);
            resolve(updated);

        });
    },
    delete(item){

        let deleted = makeItem(item.id);
        delete this.items[item.id];

        return new Promise((resolve, reject) => {

            console.log('server', 'delete', deleted);
            resolve(deleted);

        });
    }
};

function makeItem(item) {
    return Object.assign({}, emptyItem, item);
}

