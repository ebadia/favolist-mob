import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { AvailablesProvider } from './../../providers/availables/availables'

@IonicPage()
@Component({
  selector: 'app-hoy-tenemos',
  templateUrl: 'hoy-tenemos.html'
})
export class HoyTenemosComponent {
  // @Input('today') today: any[]
  @Output('updateBasket')
  updateBasket: EventEmitter<number> = new EventEmitter()

  today: any[]
  basket: any[]
  inBasket: number
  currentShop: any

  constructor(
    private storage$: Storage,
    private avail$: AvailablesProvider,
    public navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    console.log('ionViewWillEnter TodayPage')
    this.today = []

    this.storage$.get('current-shop').then(currentshop => {
      this.storage$.get(currentshop.id.toString()).then(shop => {
        console.log('TodayPage WILL gets shop cart', shop)
        this.inBasket = shop ? shop.length : 0
        this.currentShop = currentshop
        this.getAvailablesToday(currentshop)
        //
        // this.order$.messages.subscribe(msg => {
        //   if (msg.event === 'item updated') {
        //     console.log(msg)
        //     console.log(currentshop)
        //     setTimeout(() => this.getOrderedToday(), 2000)
        //     this.presentToast()
        //   }
        // })
      })
    })
  }

  private getAvailablesToday(currentshop: any) {
    this.avail$.today(currentshop.id).subscribe(
      today => {
        this.today = today.map(product => {
          product.quantity = 0
          return product
        })
      },
      error => {
        console.log('today products error', error)
      }
    )
  }

  alacesta(product) {
    this.storage$.get(product.shopId.toString()).then(shop => {
      this.basket = shop || []
      this.basket.push(product)
      product.stock = product.stock - 1
      this.storage$
        // .set(product.shopId, Object.assign(basket, product))
        .set(product.shopId.toString(), this.basket)
        .then(final => {
          this.inBasket = final.length
          this.updateBasket.emit(this.inBasket)
        })
    })
  }

  gobasket() {
    this.navCtrl.push('BasketPage', this.currentShop)
  }
}
