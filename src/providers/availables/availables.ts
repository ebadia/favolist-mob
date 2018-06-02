import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { config } from '../config'

@Injectable()
export class AvailablesProvider {
  apiUrl = config.API_URL
  endpoint = '/availables/today/shops/'

  constructor(public http$: HttpClient) {
    // console.log('Hello AvailablesProvider Provider')
  }

  today(shopId: number): Observable<any> {
    return this.http$.get(this.apiUrl + this.endpoint + shopId)
  }

  fromDay(shopId: number, day: string): Observable<any> {
    let params: HttpParams = new HttpParams()
    params = params.append('date', day)
    return this.http$.get(`${this.apiUrl}/availables/shops/${shopId}`, {
      params
    })
  }
}
