module.exports = {
    toInt(value) {
        return value >> 0;
    },
    toNumber(value){
        return utils.getTypeOf(value) === 'String' ? value + '' : value;
    },
    toString(value) {
        return utils.getTypeOf(value) === 'Number' ? value + '' : value;
    }
}