import { extend, pick } from "lodash";

export default ModelFactory;


function ModelFactory({
                          defaults = {},
                          parse = null,
                      }) {

    const validKeys = Object.keys(defaults);

    function _defaults() {
        return extend({}, defaults);
    }

    function _parse(data) {

        let parsed = pick(data, validKeys);
        let result = extend(_defaults(), parsed);
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
