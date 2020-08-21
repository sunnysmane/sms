import { Injectable, ɵConsole } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { ApiCallService } from './api.service';
import * as qs from 'qs';
// import { DatePipe } from '@angular/common';
import { GlobalUrls } from '../utils/global-urls';
import { forkJoin } from 'rxjs';  // RxJS 6 syntax

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private apiCall: ApiCallService) {
  }

  static callResponse(Response): any {
    if (Response) {
      return Response;
    } else {
      return 'error';
    }
  }

  getCityList(opts?: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      let url = `${GlobalUrls.GET_CITY_LIST}`;
      if (opts) {
        const params = qs.stringify(opts);
        url = `${url}?${params}`;
      }
      this.apiCall.callGetApi(url).subscribe(
        response => {
          observer.next(CityService.callResponse(response));
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  createCity(data: any): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.apiCall.callPostApi(GlobalUrls.CREATE_CITY, data).subscribe(
        response => {
          observer.next(CityService.callResponse(response));
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  updateCity(data: any, id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.apiCall.callPutApi(`${GlobalUrls.UPDATE_CITY}`.replace('{id}', id), data).subscribe(
        response => {
          observer.next(CityService.callResponse(response));
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  deleteCity(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.apiCall.callDeleteApi(`${GlobalUrls.DELETE_CITY}`.replace('{id}', id)).subscribe(
        response => {
          observer.next(CityService.callResponse(response));
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  getCityById(id: string): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      this.apiCall.callGetApi(`${GlobalUrls.GET_CITY}`.replace('{id}', id)).subscribe(
        response => {
          observer.next(CityService.callResponse(response));
        },
        error => {
          observer.error(error);
        }
      );
    });
  }
}
