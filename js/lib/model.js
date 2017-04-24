export default ModelFactory;


function ModelFactory({
                          defaults = {},
                          parse = null,
                      }) {

    const validKeys = Object.keys(defaults);

    function _defaults() {
        return _.extend({}, defaults);
    }

    function _parse(data) {

        let parsed = _.pick(data, validKeys);
        let result = _.extend(_defaults(), parsed);
        if (parse) {
            result = parse(result);
        }
        return result;

    }

    return {
        defaults: _defaults,
        parse: _parse,
    }
}
