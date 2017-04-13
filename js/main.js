import './_init';
import Store from './lib/store';
import server from './lib/fake-server';

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
        name: 'foo',
        desc: 'this is a foo',
    },
    {
        name: 'bar',
        desc: 'this is a bar',
    },
    {
        name: 'abc',
        desc: 'this is a abc',
    }
];

data.forEach(function (item) {
    server.create(item);
});

app.$store.dispatch('fetch');
