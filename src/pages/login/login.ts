import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { ToastController } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { AccountsProvider } from './../../providers/accounts/accounts'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username: string
  password: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public app$: App,
    public accounts$: AccountsProvider,
    public toastCtrl: ToastController,
    private storage$: Storage
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }

  login() {
    this.accounts$.login(this.username, this.password).subscribe(
      res => {
        // console.log('accounst srv', res.headers.get('Authorization'))
        // console.log('accounst srv', res.body)
        localStorage.setItem('auth-token', res.headers.get('Authorization'))

        this.storage$
          .set('auth-token', res.headers.get('Authorization'))
          .then(store => {
            this.storage$.set('current-user', res.body).then(store => {
              console.log('set', store)
              this.app$.getRootNavs()[0].setRoot('HomePage')
            })
          })
      },
      error => {
        let msg = this.toastCtrl.create({
          message:
            'No hemos podido verificar los datos de usuario. Comprueba que los datos que has introducido sean los correctos y vuelve a intentarlo. ' + error,
          duration: 3000,
          position: 'bottom'
        })
        msg.present()
      }
    )
  }

  signin() {
    this.app$.getRootNavs()[0].setRoot('SigninPage')
  }

  forgot() {}
}
