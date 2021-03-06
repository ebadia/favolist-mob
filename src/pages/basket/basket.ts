import { Component } from '@angular/core'
import { IonicPage, NavController } from 'ionic-angular'
import { AlertController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import * as moment from 'moment'
import { OrdersProvider } from '../../providers/orders/orders'
import { AvailablesProvider } from '../../providers/availables/availables'

@IonicPage()
@Component({
  selector: 'page-basket',
  templateUrl: 'basket.html'
})
export class BasketPage {
  products: any[]
  shopId: number

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private storage$: Storage,
    private available$: AvailablesProvider,
    private order$: OrdersProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BasketPage')

    this.storage$.get('current-shop').then(shop => {
      this.shopId = shop.id
      this.storage$.get(shop.id).then(products => {
        this.products = products
      })
    })
  }

  deleteProduct(index) {
    this.products.splice(index, 1)
    this.storage$.get('current-shop').then(shop => {
      this.storage$.set(shop.id, this.products).then(products => {
        if (this.products.length == 0) {
          this.navCtrl.pop()
        } else {
          console.log(products)
        }
      })
    })
  }

  placeOrder() {
    let confirm = this.alertCtrl.create({
      title: '¿Envio el pedido?',
      message:
        'Vas a enviar el pedido a la tienda para su preparación. Confirma que quieres enviarlo.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked')
          }
        },
        {
          text: 'Enviar',
          handler: () => {
            console.log('Agree clicked')
            this.confirmOrder()
          }
        }
      ]
    })
    confirm.present()
  }

  confirmOrder() {
    this.getData().then(res => {
      // day: moment().format('YYYY-MM-DD'),
      let order = {
        day: res[2].fecha,
        hour: moment().format('HH:mm'),
        status: 'ORDERING',
        user: res[0].id,
        shop: res[1].id
      }
      console.log(order)
      this.order$.add(order).subscribe(
        neworder => {
          this.storage$.get(this.shopId.toString()).then(items => {
            this.saveItems(neworder['id'], items)
          })
        },
        error => console.log('error creating order', error)
      )
    })
  }

  getData() {
    const user = this.storage$.get('current-user')
    const shop = this.storage$.get('current-shop')
    const fecha = this.storage$.get('current-fecha')
    return Promise.all([user, shop, fecha]).then(values => values)
  }

  saveItems(orderId: number, items: any[]) {
    for (let i = 0; i < items.length; i++) {
      this.order$
        .addItem(orderId, {
          quantity: items[i].quantity,
          place: 'APP',
          product: { id: items[i].productId }
        })
        .subscribe(() => {
          console.log('Item Updated')
          // // update stock
          // const obj = {
          //   stock: items[i].availableStock - items[i].quantity,
          //   stockOut: items[i].availableStockOut - items[i].quantity
          // }
          // this.available$
          //   .update(items[i].availableId, obj)
          //   .subscribe(() => console.log('Stock Updated'))
        })
    }
    this.vaciaCarro()
  }

  vaciaCarro() {
    this.storage$.get('current-shop').then(shop => {
      this.storage$.set(shop.id, null).then(products => {
        this.products = products
        // this.navCtrl.pop()
        this.navCtrl.parent.viewCtrl.dismiss()
      })
    })
  }

  emptyBasket() {
    let confirm = this.alertCtrl.create({
      title: 'Vacio el carrito?',
      message:
        'Vas a vaciar la lista de la compra. Confirma que quieres vaciarla.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked')
          }
        },
        {
          text: 'Vaciar',
          handler: () => {
            console.log('Agree clicked')
            this.vaciaCarro()
          }
        }
      ]
    })
    confirm.present()
  }
}
