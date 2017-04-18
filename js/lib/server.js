import * as axios from 'axios';


const BASE_URL = 'http://make-the-cut.dev/test/1';

export default {
    fetch(){

        var data   = {};
        var config = {};
        var url    = BASE_URL + '/fetch';

        return axios.get(url, data, config)
            .catch(function (err) {
                console.log('err', err);
            })
            .then(function (res) {
                return res.data;
            });
    },
    create(item){

        var data = toFormData(item);
        var config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log('percentCompleted', percentCompleted);
            }
        };

        var url = BASE_URL + '/create';

        return axios.post(url, data, config)

            .catch(function (err) {
                console.log('err', err);
            })
            .then(function (res) {
                return res.data;
            });

    },
    update(item){
        console.log('item', item);
        var data   = toFormData(item);
        var config = {};
        var url    = BASE_URL + '/update/' + item.id;

        return axios.post(url, data, config)
            .catch(function (err) {
                console.log('err', err);
            })
            .then(function (res) {
                return res.data;
            });
    },
    delete(item){

        var data   = {};
        var config = {};
        var url    = BASE_URL + '/delete/' + item.id;

        return axios.post(url, data, config)
            .catch(function (err) {
                console.log('err', err);
            })
            .then(function (res) {
                return res.data;
            });
    }
};

function toFormData(item) {

    var data = new FormData();
    _.each(item, function (val, key) {
        if (val !== null && val !== undefined) {
            data.append(key, val);
        }
    });
    return data;
}

