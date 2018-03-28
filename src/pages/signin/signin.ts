import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

import { AccountsProvider } from './../../providers/accounts/accounts'

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {
  username: string
  password: string
  first_name: string
  last_name: string
  email: string
  mobile: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app$: App,
    public accounts$: AccountsProvider,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage')
  }

  signin() {
    const user = {
      first_name: this.first_name,
      last_name: this.last_name,
      mobile: this.mobile,
      email: this.email,
      username: this.username,
      password: this.password
    }
    this.accounts$.create(user).subscribe(
      res => {
        // console.log('accounst srv', res.headers.get('Authorization'))
        // console.log('accounst srv', res.body)
        this.app$.getRootNavs()[0].setRoot('LoginPage')
      },
      error => {
        let msg = this.toastCtrl.create({
          message:
            'No hemos podido verificar los datos de usuario. Comprueba que los datos que has introducido sean los correctos y vuelve a intentarlo.',
          duration: 3000,
          position: 'bottom'
        })
        msg.present()
      }
    )
  }

  checkUsername() {
    this.accounts$.username(this.username).subscribe(res => {
      console.log(res)

      if (res.length > 0) {
        let msg = this.toastCtrl.create({
          message: 'Este nombre de usuario ya esxite. Deberás escoger otro.',
          duration: 3000,
          position: 'bottom'
        })
        msg.present()
        this.username = ''
      }
    })
  }

  login() {
    this.app$.getRootNavs()[0].setRoot('LoginPage')
  }
}
