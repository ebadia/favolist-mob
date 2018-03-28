import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AvailablesProvider {
  apiUrl = '/api/v1'
  endpoint = '/availables/today/shops/'

  constructor(public http$: HttpClient) {
    // console.log('Hello AvailablesProvider Provider')
  }

  today(shopId: number): Observable<any> {
    return this.http$.get(this.apiUrl + this.endpoint + shopId)
  }
}
