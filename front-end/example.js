class ItemModel {
    constructor(Parse) {
        this.Parse = Parse;
        this.data = {};
        this.collection = [];
        this.name = 'Item';
        this.fields = [
            'name',
            'type',
            'cost',
            'image',
            'look'
        ];
    }
    New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    getByLook(lookObject) {
        return new this.Parse.Query(this.New()).get(lookObject).then(result => {
            console.log('parse query result', result);
        })
    }
}
angular
    .module('common')
    .service('ItemModel', ItemModel);