import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class UsersProvider {
  apiUrl = '/api/v1'

  constructor(public http$: HttpClient) {
    // console.log('Hello UsersProvider Provider')
  }

  shops(userId: string): Observable<any> {
    const res = this.http$.get(this.apiUrl + `/users/${userId}/shops`)
    return res
  }
}
