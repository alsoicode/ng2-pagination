var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var pagination_service_1 = require("./pagination-service");
var PaginatePipe = (function () {
    function PaginatePipe(service) {
        this.service = service;
    }
    PaginatePipe.prototype.transform = function (collection, args) {
        var usingConfig = typeof args[0] === 'object';
        var serverSideMode = usingConfig && args[0].totalItems !== undefined;
        var instance; // = this.service.getInstance(id);
        var id = usingConfig ? args[0].id : this.service.defaultId;
        var start, end;
        instance = this.createInstance(collection, args);
        this.service.register(instance);
        if (!usingConfig && instance.totalItems !== collection.length) {
            this.service.setTotalItems(id, collection.length);
        }
        var itemsPerPage = instance.itemsPerPage;
        if (!serverSideMode && collection instanceof Array) {
            itemsPerPage = itemsPerPage || 9999999999;
            start = (this.service.getCurrentPage(id) - 1) * itemsPerPage;
            end = start + itemsPerPage;
            return collection.slice(start, end);
        }
        return collection;
    };
    PaginatePipe.prototype.createInstance = function (collection, args) {
        var instance;
        if (typeof args[0] === 'string' || typeof args[0] === 'number') {
            instance = {
                id: this.service.defaultId,
                itemsPerPage: parseInt(args[0]),
                currentPage: 1,
                totalItems: collection.length
            };
        }
        else if (typeof args[0] === 'object') {
            instance = {
                id: args[0].id || this.service.defaultId,
                itemsPerPage: args[0].itemsPerPage,
                currentPage: args[0].currentPage,
                totalItems: args[0].totalItems || collection.length
            };
        }
        else {
            throw new Error("PaginatePipe: Argument must be a string, number or an object. Got " + typeof args[0]);
        }
        return instance;
    };
    PaginatePipe = __decorate([
        core_1.Pipe({
            name: 'paginate',
            pure: false
        }), 
        __metadata('design:paramtypes', [pagination_service_1.PaginationService])
    ], PaginatePipe);
    return PaginatePipe;
})();
exports.PaginatePipe = PaginatePipe;