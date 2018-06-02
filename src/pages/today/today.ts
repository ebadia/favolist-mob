import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular'
import { AvailablesProvider } from './../../providers/availables/availables'
import { OrdersProvider } from '../../providers/orders/orders'
import { Storage } from '@ionic/storage'
import { ToastController } from 'ionic-angular'

import { DisponiblePage } from '../disponible/disponible'
import { HoyPedimosComponent } from '../hoy-pedimos/hoy-pedimos'
import { Fecha } from './../../common/interfaces/fecha'

@IonicPage()
@Component({
  selector: 'page-today',
  templateUrl: 'today.html'
})
export class TodayPage {
  // Reference to the app's root nav
  fecha: Fecha
  today: any[]
  products: any[]
  currentShop: any
  basket: any[]
  inBasket: number

  tab1: any
  tab2: any

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage$: Storage,
    private avail$: AvailablesProvider,
    private order$: OrdersProvider,
    private toastCtrl: ToastController
  ) {
    this.tab1 = HoyPedimosComponent
    this.tab2 = DisponiblePage
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodayPage')
    this.storage$.get('current-fecha').then(fecha => {
      this.fecha = fecha
      console.log('FECHA', this.fecha)
    })
  }

  onUpdateBasket(event) {
    this.inBasket = event
  }

  gobasket() {
    this.navCtrl.push('BasketPage', this.currentShop)
  }
}
