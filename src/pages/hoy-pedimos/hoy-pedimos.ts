import { Component } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { OrdersProvider } from '../../providers/orders/orders'
import { ToastController } from 'ionic-angular'
import { Fecha } from '../../common/interfaces/fecha'

@IonicPage()
@Component({
  selector: 'app-hoy-pedimos',
  templateUrl: 'hoy-pedimos.html'
})
export class HoyPedimosComponent {
  // @Input('products') products: any[] = []
  products: any[]
  orders: any[]

  today: any[]
  basket: any[]
  inBasket: number
  currentShop: any

  fecha: Fecha

  constructor(
    private storage$: Storage,
    private order$: OrdersProvider,
    private toastCtrl: ToastController,
    public navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    this.today = []

    this.storage$.get('current-shop').then(currentshop => {
      this.storage$.get(currentshop.id.toString()).then(shop => {
        // console.log('TodayPage WILL gets shop cart', shop)
        this.inBasket = shop ? shop.length : 0
        this.currentShop = currentshop
        this.getOrderedToday()

        this.order$.messages.subscribe(msg => {
          if (msg.event === 'item updated' || msg.event === 'order ready') {
            // console.log(msg)
            // console.log(currentshop)
            setTimeout(() => this.getOrderedToday(), 2000)
          }
        })
      })
    })
  }

  private getOrderedToday() {
    this.storage$.get('current-shop').then(currentshop => {
      this.storage$.get('current-user').then(currentuser => {
        this.storage$.get('current-fecha').then(fecha => {
          this.fecha = fecha
          this.order$
            .orderedOnDay(currentuser.id, currentshop.id, fecha.fecha)
            .subscribe(res => {
              this.orders = res
              this.products = []
              res.forEach(order => {
                order.items.forEach(item => {
                  item['orderStatus'] = order.status
                  this.products.push(item)
                })
              })
            })
        })
      })
    })
  }

  gobasket() {
    this.navCtrl.push('BasketPage', this.currentShop)
  }

  goBack() {
    this.navCtrl.parent.viewCtrl.dismiss()
  }
}
