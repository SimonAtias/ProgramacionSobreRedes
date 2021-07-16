import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import { ReservarComponent } from './reservar/reservar.component';
import { FuncionComponent } from './funcion/funcion.component';
import {RouterModule} from "@angular/router";
import {AsientosComponent} from "./asientos/asientos.component";
import { AsientosTriangularComponent } from './asientos-triangular/asientos-triangular.component';
import { ButacaComponent } from './butaca/butaca.component';

@NgModule({
  declarations: [
    AppComponent,
    ReservarComponent,
    FuncionComponent,
    AsientosComponent,
    AsientosTriangularComponent,
    ButacaComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
      RouterModule.forRoot([
        {
          path: 'funciones', component: FuncionComponent
        },{
          path: 'reservar/:id', component: ReservarComponent, pathMatch: 'full'
        },{
          path:'', redirectTo:'/funciones', pathMatch: 'full'
        }
      ])
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
