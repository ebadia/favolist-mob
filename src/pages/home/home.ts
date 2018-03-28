import { Component, ViewChild } from '@angular/core'
import { IonicPage, NavController, NavParams, App, Nav } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { UsersProvider } from './../../providers/users/users'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  rootPage = 'TodayPage'
  @ViewChild(Nav) nav: Nav

  auth: string
  current: any
  shops: any[] = []
  hasShops: boolean

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app$: App,
    private storage$: Storage,
    private users$: UsersProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage')
    this.storage$.get('current-user').then(
      res => {
        this.current = res
        this.users$.shops(this.current.id).subscribe(
          shopArray => {
            console.log('SHOPS', shopArray.shops)

            if (shopArray.shops.length > 0) {
              console.log(shopArray)
              this.hasShops = true
              this.shops = shopArray.shops
            } else {
              this.hasShops = false
            }
            console.log('SHOPS', this.hasShops)
          },
          error => {
            console.log('user error', error)
          }
        )
      },
      error => {
        console.log('current error', error)
      }
    )
  }

  shopSelected(shop) {
    this.storage$.set('current-shop', shop).then(shop => {
      this.navCtrl.push('TodayPage')
      // this.app$.getRootNavs()[0].setRoot('TodayPage')
      // this.nav.setRoot('TodayPage')
    })
  }

  logout() {
    this.storage$.clear().then(current => {
      this.app$.getRootNavs()[0].setRoot('LoginPage')
    })
  }

  addShops() {
    console.log('Añade tiendas')
  }
}
