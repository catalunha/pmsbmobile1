var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";
var CoreService = /** @class */ (function () {
    function CoreService(core_http, api_url) {
        this.core_http = core_http;
        this.api_url = api_url;
        // public base_url: string = "http://pmsb.pythonanywhere.com/pmsb";
        // public base_url: string = "http://104.131.168.27/pmsb";
        // public base_url: string = "http://127.0.0.1:8000/pmsb";
        this.base_url = "http://174.138.119.228";
        // public base_url: string = "http://192.168.2.127:8000/pmsb"; // Rede Local
        this.headers = new Headers({
            "Content-Type": "application/json"
        });
        var usuario_atual_PMSB = JSON.parse(localStorage.getItem("usuario_atual_PMSB"));
        if (usuario_atual_PMSB) {
            this.headers = new Headers({
                "Content-Type": "application/json",
                Authorization: "Token " + usuario_atual_PMSB["token"]
            });
        }
    }
    CoreService.prototype.post = function (instance) {
        return this.core_http
            .post(this.base_url + this.api_url, JSON.stringify(instance), {
            headers: this.headers
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.postUserInfo = function (instance, api_url) {
        return this.core_http
            .post(this.base_url + api_url, JSON.stringify(instance), {
            headers: this.headers
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.all = function (params) {
        return this.core_http
            .get(this.base_url + this.api_url, {
            headers: this.headers,
            search: params
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.get = function (id) {
        return this.core_http
            .get(this.base_url + this.api_url + id, {
            headers: this.headers,
            search: {}
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.add = function (instance) {
        return this.core_http
            .post("" + this.base_url + this.api_url + "/", JSON.stringify(instance), {
            headers: this.headers
        })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.update = function (instance) {
        return this.core_http
            .put("" + this.base_url + this.api_url + "/" + instance.id + "/", JSON.stringify(instance), { headers: this.headers })
            .map(this.extractData)
            .catch(this.handleError);
    };
    CoreService.prototype.extractData = function (response) {
        return response.json() || {};
    };
    CoreService.prototype.handleError = function (error) {
        return Observable.throw(error);
    };
    CoreService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http,
            String])
    ], CoreService);
    return CoreService;
}());
export { CoreService };
//# sourceMappingURL=core.service.js.map