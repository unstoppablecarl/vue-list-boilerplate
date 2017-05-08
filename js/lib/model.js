import { extend, pick } from "lodash";


export default ModelFactory;


function ModelFactory({
                          defaults = {},
                          parse = null,
                      }) {

    const validKeys = Object.keys(defaults);

    return {
        defaults(){
            return extend({}, defaults);
        },
        parse(data){
            let parsed = pick(data, validKeys);
            let result = extend(this.defaults(), parsed);
            if (parse) {
                result = parse(result);
            }
            return result;
        },
    }
}
