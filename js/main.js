import './_init';
import Store from './lib/store';
import Server from './lib/fake-server';
import List from './components/list.vue';

let server = Server({
    responseDelay: 2000
});


let store = Store({
    server
});

let app = new Vue({
    el: '#app',
    store: store,
    components: {
        List
    },
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
