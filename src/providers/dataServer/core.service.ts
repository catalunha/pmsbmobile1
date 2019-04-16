import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/observable/throw";

@Injectable()
export class CoreService {

  // public base_url: string = "http://pmsb.pythonanywhere.com/pmsb";
  // public base_url: string = "http://104.131.168.27/pmsb";
  // public base_url: string = "http://127.0.0.1:8000/pmsb";
  public base_url: string = "http://174.138.119.228";
  // public base_url: string = "http://192.168.2.127:8000/pmsb"; // Rede Local

  private headers: Headers = new Headers({
    "Content-Type": "application/json"
  });

  constructor(public core_http: Http,
    public api_url: String) {
    let usuario_atual_PMSB = JSON.parse(localStorage.getItem("usuario_atual_PMSB"));
    if (usuario_atual_PMSB) {
      this.headers = new Headers({
        "Content-Type": "application/json",
        Authorization: "Token " + usuario_atual_PMSB["token"]
      });
    }
  }

  public post(instance: any): Observable<any> {
    return this.core_http
      .post(this.base_url + this.api_url, JSON.stringify(instance), {
        headers: this.headers
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public all(params: any): Observable<any[]> {
    return this.core_http
      .get(this.base_url + this.api_url, {
        headers: this.headers,
        search: params
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public get(id): Observable<any> {
    return this.core_http
      .get(this.base_url + this.api_url + id, {
        headers: this.headers,
        search: {}
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public add(instance: any): Observable<any> {
    return this.core_http
      .post(`${this.base_url}${this.api_url}/`, JSON.stringify(instance), {
        headers: this.headers
      })
      .map(this.extractData)
      .catch(this.handleError);
  }

  public update(instance: any): Observable<any> {
    return this.core_http
      .put(
        `${this.base_url}${this.api_url}/${instance.id}/`,
        JSON.stringify(instance),
        { headers: this.headers }
      )
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response.json() || {};
  }

  private handleError(error: Response | any): Observable<any> {
    return Observable.throw(error);
  }

}