import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observer } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  constructor(private http: HttpClient, private router: Router) { }
  observer: Observer<any>;

  handleResponse(response) {
    return response;
  }

  handleErrorResponse(error) {
    return error; // this.observer.error(error.error || 'Server Error');
  }

  callGetApi(apiurl: string) {
    return this.http
      .get(apiurl, {
        headers: {
          Authorization: 'Basic YWRtaW46cGEzM3dvcmQ='
        }
      })
      .pipe(
        tap(
          data => this.handleResponse(data),
          error => this.handleErrorResponse(error)
        ));
  }

  callPostApi(apiurl: string, body: any, options?) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic YWRtaW46cGEzM3dvcmQ=',
    });
    return this.http.post(apiurl, body, { headers}).pipe(
      tap(
        data => this.handleResponse(data),
        error => this.handleErrorResponse(error)
      ));
  }

  callPutApi(apiurl: string, body: any, options?) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic YWRtaW46cGEzM3dvcmQ='
    });
    return this.http.put(apiurl, body, { headers }).pipe(
      tap(
        data => this.handleResponse(data),
        error => this.handleErrorResponse(error)
      ));
  }

  callDeleteApi(apiurl: string, data?: any) {
    const options = {
      headers: new HttpHeaders({
        Authorization: 'Basic YWRtaW46cGEzM3dvcmQ='
      })
    };
    if (data) {
      const body = 'body';
      options[body] = data;
    }
    return this.http
      .delete(apiurl, options)
      .pipe(
        tap(data => this.handleResponse(data),
          error => this.handleErrorResponse(error)
        ));
  }
}
