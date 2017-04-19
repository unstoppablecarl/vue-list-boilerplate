export default ModelFactory;

function ModelFactory({defaults = {}}) {

    const validKeys = Object.keys(defaults);

    return {
        defaults(){
            return _.extend({}, defaults);
        },
        parse(data){
            let parsed = _.pick(data, validKeys);
            return _.extend(this.defaults(), parsed);
        },
    }
}



