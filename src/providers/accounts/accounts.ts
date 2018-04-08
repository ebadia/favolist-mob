import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { config } from '../config'

@Injectable()
export class AccountsProvider {
  apiUrl = config.API_URL

  constructor(private http$: HttpClient) {
    console.log('Hello UsersProvider Provider')
  }

  login(username: string, password: string): Observable<any> {
    const send = {
      username,
      password
    }
    return this.http$.post(this.apiUrl + '/accounts/login', send, {
      observe: 'response',
      // responseType: 'text',
      headers: new HttpHeaders().append(
        'Access-Control-Expose-Headers',
        'Total, Link, Authorization'
      )
    })
  }

  create(user: any) {
    return this.http$.post(this.apiUrl + '/accounts', user)
  }

  username(username: string): Observable<any> {
    return this.http$.get(this.apiUrl + `/accounts/username/${username}`)
  }
}
