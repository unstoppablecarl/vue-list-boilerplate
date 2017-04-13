import './_init';
import Store from './lib/store';
import server from './lib/fake-server';
//import server from './lib/server';


let store = Store({
    server
});

let app = new Vue({
    el: '#app',
    store: store,
});

// seed some server data
let data = [
    {
        id: 1,
        name: 'foo',
        desc: 'this is a foo',

    },
    {
        id: 2,
        name: 'bar',
        desc: 'this is a bar',

    }
];

data.forEach(function (item) {
    server.create(item);
});

app.$store.dispatch('fetch');