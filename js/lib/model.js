export default ModelFactory;


function ModelFactory({
                          defaults = {},
                          parse = null,
                      }) {

    const validKeys = Object.keys(defaults);

    return {
        defaults(){
            return _.extend({}, defaults);
        },
        parse(data){
            let parsed = _.pick(data, validKeys);
            let result = _.extend(this.defaults(), parsed);
            if (parse) {
                result = parse(result);
            }
            return result;
        },
    }
}
