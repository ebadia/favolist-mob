import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { config } from '../config'

@Injectable()
export class UsersProvider {
  apiUrl = config.API_URL

  constructor(public http$: HttpClient) {
    // console.log('Hello UsersProvider Provider')
  }

  shops(userId: string): Observable<any> {
    const res = this.http$.get(this.apiUrl + `/users/${userId}/shops`)
    return res
  }

  addUserToShop(userId: number, obj: any): Observable<any> {
    return this.http$.post(`${this.apiUrl}/users/${userId}/shops`, obj)
  }

  delete(id: number): Observable<any> {
    return this.http$.delete(`${this.apiUrl}/users/${id}`)
  }



}
