import { Fecha } from './../../common/interfaces/fecha'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { AvailablesProvider } from './../../providers/availables/availables'
import * as _ from 'lodash'

/**
 * Generated class for the DisponiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disponible',
  templateUrl: 'disponible.html'
})
export class DisponiblePage {
  // @Input('today') today: any[]
  @Output('updateBasket')
  updateBasket: EventEmitter<number> = new EventEmitter()

  today: any[]
  basket: any[]
  inBasket: number
  currentShop: any
  fecha: Fecha

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
        this.storage$.get('current-fecha').then(fecha => {
          this.fecha = fecha
          console.log('TodayPage WILL gets shop cart', shop)
          this.inBasket = shop ? shop.length : 0
          this.currentShop = currentshop
          this.getAvailablesToday(currentshop, fecha.fecha)
        })
      })
    })
  }

  private getAvailablesToday(currentshop: any, day: string) {
    this.avail$.fromDay(currentshop.id, day).subscribe(
      today => {
        // this.today = today.map(product => {
        //   product.quantity = 0
        //   return product
        // })
        this.today = today
      },
      error => {
        console.log('today products error', error)
      }
    )
  }

  alacesta(product) {
    this.storage$.get(product.shopId.toString()).then(shop => {
      this.basket = shop || []
      // comprobar si esta en el carro
      const inCart = _.find(this.basket, ['productId', product.productId])
      if (inCart) {
        inCart.quantity = inCart.quantity + 1
      } else {
        product.quantity = 1
        this.basket.push(product)
      }
      product.availableStockOut = product.availableStockOut - 1
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

  goBack() {
    this.navCtrl.parent.viewCtrl.dismiss()
  }
}
