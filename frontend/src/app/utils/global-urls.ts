import {environment} from '../../environments/environment';

const BASE_URL = environment.BASE_URL;

export class GlobalUrls {
  public static readonly CREATE_CITY = `${BASE_URL}/city`;
  public static readonly UPDATE_CITY = `${BASE_URL}/city/{id}`;
  public static readonly GET_CITY = `${BASE_URL}/city/{id}`;
  public static readonly GET_CITY_LIST = `${BASE_URL}/city`;
  public static readonly DELETE_CITY = `${BASE_URL}/city/{id}`;
}
