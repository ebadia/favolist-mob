import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams, App } from 'ionic-angular'
import { ToastController } from 'ionic-angular'

import { AccountsProvider } from './../../providers/accounts/accounts'
import {UsersProvider} from '../../providers/users/users';

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
    public user$: UsersProvider,
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
      password: this.randomPassword(8)
    }
    this.accounts$.create(user).subscribe(
      res => {
        this.user$.addUserToShop(res['id'], { id: 1 }).subscribe(
          () => this.app$.getRootNavs()[0].setRoot('LoginPage')
        ,
          () => {
            this.deleteUser(res['id'])
            let msg = this.toastCtrl.create({
              message:
                'No hemos crear el usuario. Comprueba que los datos que has introducido sean los correctos y vuelve a intentarlo.',
              duration: 3000,
              position: 'bottom'
            })
            msg.present()
          })
      },
      () => {
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
          message: 'Este nombre de usuario ya existe. Deberás escoger otro.',
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

  private deleteUser( id: number ) {
    this.user$.delete(id).subscribe(() => {
      console.log('Anulado nuevo cliente')
    })
  }

  private randomPassword(length) {
    const chars =
      'abcdefghijklmnopqrstuvwxyz!@#$%&*ABCDEFGHIJKLMNOP1234567890'
    let pass = ''
    for (let x = 0; x < length; x++) {
      const i = Math.floor(Math.random() * chars.length)
      pass += chars.charAt(i)
    }
    return pass
  }

}
