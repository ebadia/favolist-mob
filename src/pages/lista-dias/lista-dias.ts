import { Component } from '@angular/core'
import { IonicPage, NavController, NavParams } from 'ionic-angular'
import { Storage } from '@ionic/storage'

import { Fecha } from './../../common/interfaces/fecha'
import * as moment from 'moment'
import * as _ from 'lodash'

/**
 * Generated class for the ListaDiasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-dias',
  templateUrl: 'lista-dias.html'
})
export class ListaDiasPage {
  hoy: Fecha
  semana: Fecha[]
  diaEscogido: string

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage$: Storage
  ) {
    moment.locale('es')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaDiasPage')
    this.setHoy()
  }

  setDia(cual: any) {
    const dia = Object.assign({})
    dia.fecha = cual.format('YYYY-MM-DD')
    dia.dia = cual.format('DD')
    dia.mes = cual.format('MM')
    dia.nombre = cual.format('dddd')
    return dia
  }

  setSemana(primero: Fecha) {
    this.semana = []
    _.each([0, 1, 2, 3, 4, 5, 6], value => {
      const dia = this.setDia(moment(primero.fecha).add(value, 'days'))
      this.semana.push(dia)
    })
  }

  cambiaDia() {
    console.log('ESCOGIDO', this.diaEscogido)
    this.hoy = this.setDia(moment(this.diaEscogido))
    this.setSemana(this.hoy)
  }

  muestraDia(dia: any) {
    this.storage$.set('current-fecha', dia).then(() => {
      this.navCtrl.push('TodayPage')
    })
  }

  setHoy() {
    this.hoy = this.setDia(moment())
    this.setSemana(this.hoy)
    this.diaEscogido = moment().toISOString()
  }
}
