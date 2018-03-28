import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

// import { HoyTenemosComponent } from './hoy-tenemos/hoy-tenemos'
// import { HoyPedimosComponent } from './hoy-pedimos/hoy-pedimos'
import { CommonModule } from '@angular/common'

@NgModule({
  declarations: [],
  entryComponents: [],
  imports: [
    // IonicModule.forRoot(HoyTenemosComponent),
    // IonicModule.forRoot(HoyPedimosComponent)
    IonicModule,
    CommonModule
  ],
  exports: []
})
export class ComponentsModule {}
