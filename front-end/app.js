var angularApp = angular.module('angularApp', ["ngRoute", 'ngParse']);

var maincontroller = function($scope, $http, ItemModel, LookModel, StyleModel) {
    
    StyleModel.getAll().then(function(styleResult){
        console.log("style result", styleResult);
        return LookModel.getByStyle(styleResult[0])
    }).then(function(lookResult){
        LookModel.data = LookModel.New(lookResult)
        console.log("look result", lookResult);
    })
    LookModel.getById('pcGLLKJfWb').then(function(lookResult){
        return ItemModel.getByLook(lookResult)
    .then(function(itemResult){
        ItemModel.data = ItemModel.New(itemResult[0])
        console.log("parse request", ItemModel.data);
    })
//    $http({
//        method: 'GET',
//        url: 'http://localhost:3000/main'
//}).then(function successCallback(response) {
//    console.log(response);
//    $scope.items = response.data;
//  }, function errorCallback(response) {
//    // called asynchronously if an error occurs
//    // or server returns response with an error status.
//  });
    })
}

maincontroller.$inject = ['$scope', '$http', 'ItemModel', 'LookModel', 'StyleModel'];
angularApp.controller('maincontroller', maincontroller);

var lookscontroller = function($scope, $http, $routeParams) {
    $scope.style = $routeParams.style;
    console.log("hello",$scope.style);
    $http({
        method: 'GET',
        url: 'http://localhost:3000/looks/'+$routeParams.style
    }).then(function successCallback(response) {
    console.log('lookscontroller',response);
    $scope.things = response.data;
  }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}

lookscontroller.$inject = ['$scope', '$http','$routeParams'];
angularApp.controller('lookscontroller', lookscontroller);

angularApp.config(function($routeProvider, ParseProvider) {
    
    var MY_PARSE_APP_ID = 'iQZexfsTBr7Cgejv2OaJEGUzzPnAD8FUNium7rOq';
    var MY_PARSE_JS_KEY = 'rCDpXPIVWKWAbMDL0770MeqiBZyPOmH8iuf31XFx';
    
    ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
    ParseProvider.serverURL = 'https://parseapi.back4app.com';
    $routeProvider
    
    .when("/", {
        templateUrl: "main.html", 
        controller: "maincontroller"
    })
    
    .when("/looks/:style", {
        templateUrl: "looks.html",
        controller: "lookscontroller"
    });
});

var ItemModel = function(Parse){  
        this.Parse = Parse;
        this.data = {};
        this.collection = [];
        this.name = 'Item';
        this.fields = [
            'name',
            'type',
            'cost',
            'images',
            'look'
        ];
    this.New = New;
    this.getById = getById;
    this.getByLook = getByLook;
    
    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
    }
    function getByLook(lookObject) {
        return new this.Parse.Query(this.New()).find(lookObject)
    }
};
ItemModel.$inject = ['Parse'];
angularApp.service('ItemModel', ItemModel);

var LookModel = function(Parse){
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Look';
    this.fields = [
        'name',
        'price',
        'style',
        'likes'
    ];
    
    this.New = New;
    this.getById = getById;
    this.getByStyle = getByStyle; 
    
    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
    }
    
    function getByStyle(styleObject) {
        return new this.Parse.Query(this.New())
            .equalTo('style', styleObject)
            .first()
            .then(result => {
                this.Parse.defineAttributes(result, this.fields);
                this.data = result;
                return result
            })
    }
    
};
LookModel.$inject = ['Parse'];
angularApp.service('LookModel', LookModel);

var StyleModel = function(Parse){
    this.Parse = Parse;
    this.data = {};
    this.collection = [];
    this.name = 'Style';
    this.fields = [
        'name',
        'lookCount',
        'image'
    ];
    
    this.New = New;
    this.getById = getById;
    this.getAll = getAll;

    function New(obj) {
        if (angular.isUndefined(obj)) {
            const parseObject = new this.Parse.Object(this.name)
            this.Parse.defineAttributes(parseObject, this.fields);
            return parseObject;
        } else {
            this.Parse.defineAttributes(obj, this.fields);
            return obj;
        }
    }
    
    function getById(id) {
        return new this.Parse.Query(this.New()).get(id)
    }
    
    function getAll(){
        return new this.Parse.Query(this.New()).find(looks => {
            looks.forEach(look =>
                this.Parse.defineAttributes(look, this.fields)
            );
            this.collection = looks;
            return Promise.resolve(looks);
        }).catch(error => Promise.reject(error));
    }
};

StyleModel.$inject = ['Parse'];
angularApp.service('StyleModel', StyleModel);