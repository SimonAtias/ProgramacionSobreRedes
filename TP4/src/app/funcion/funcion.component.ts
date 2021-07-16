import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-funcion',
  templateUrl: './funcion.component.html',
  styleUrls: ['./funcion.component.css']
})
export class FuncionComponent implements OnInit {

  funciones: any = []

  constructor(private servicio: ServiciosService) {

  }

  ngOnInit(): void {
    this.getFuncionesDisponibles()
  }

  public getFuncionesDisponibles(){
    this.servicio.get('http://localhost:3000/funciones')
      .subscribe( res => {
        this.funciones = res;
        console.log(this.funciones);
      })
  }

}
