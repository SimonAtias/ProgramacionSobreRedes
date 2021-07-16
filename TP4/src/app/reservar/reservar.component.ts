import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServiciosService} from "../services/servicios.service";


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  id: number = 1;
  butacas_y_sala: any = [];
  butacas_selecciondas: any = [];

  constructor(private activatedRoute: ActivatedRoute, private servicio: ServiciosService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];
      console.log(params["id"]); // Print the parameter to the console.
    });
  }

  ngOnInit(): void {
    this.getButacas()
  }

  public getButacas(){
    this.servicio.get('http://localhost:3000/butacas/'+this.id)
      .subscribe( res => {
        this.butacas_y_sala = res;
        console.log(this.butacas_y_sala);
      })
  }

  public reservar(){
    console.log("Enviando "+this.butacas_selecciondas+"...");
    let data: any;
    let usuario: number = 1;
    data = {
      "usuario": "5",
      "butacas_reservadas": this.butacas_selecciondas
    };
    this.servicio.post('http://localhost:3000/reservar/'+this.id, data)
      .subscribe(res =>{
        console.log("posteado!")
        console.log(res);
      })

  }

}
