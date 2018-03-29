import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import { WebsocketService } from '../../common/websocket.service'
import { Subject } from 'rxjs/Subject'
import 'rxjs/add/operator/map'
import { config } from '../config'

@Injectable()
export class OrdersProvider {
  apiUrl = config.API_URL
  messages: Subject<any>

  constructor(private http$: HttpClient, private wsService: WebsocketService) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response
      })
  }

  all(userId: string): Observable<any> {
    return this.http$.get(this.apiUrl + `/orders`)
  }

  one(id: string): Observable<any> {
    return this.http$.get(this.apiUrl + `/orders/${id}`)
  }

  add(obj: any) {
    return this.http$.post(this.apiUrl + `/orders`, obj)
  }

  addItem(id: number, obj: any) {
    return this.http$.post(this.apiUrl + `/orders/${id}/items`, obj)
  }

  orderedToday(userId: string, shopId: number): Observable<any> {
    return this.http$.get(
      this.apiUrl + `/orders/today/users/${userId}/shops/${shopId}`
    )
  }
}
