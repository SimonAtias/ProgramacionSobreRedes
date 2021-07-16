import {Component, Input, OnInit, ElementRef} from '@angular/core';
import {ReservarComponent} from '../reservar/reservar.component';

@Component({
  selector: 'app-butaca',
  templateUrl: './butaca.component.html',
  styleUrls: ['./butaca.component.css']
})
export class ButacaComponent implements OnInit {

  @Input()
  butacaId: String = "";

  constructor(private reserva: ReservarComponent, private el: ElementRef) {

  }

  ngOnInit(): void {
    if(JSON.parse(this.reserva.butacas_y_sala[0].butacas_disponibles).includes(this.butacaId)){
      let myTag = this.el.nativeElement.querySelector("div");
      myTag.classList.remove('occupied')
    }
  }

  public seleccionarButaca(){
    let myTag = this.el.nativeElement.querySelector("div");
    if(myTag.classList.contains("selected")){
      this.reserva.butacas_selecciondas.splice(this.reserva.butacas_selecciondas.indexOf(this.butacaId),1);
      myTag.classList.remove("selected");
    }
    else if(!myTag.classList.contains("occupied") && !myTag.classList.contains("selected") && this.reserva.butacas_selecciondas.length<6){
      this.reserva.butacas_selecciondas.push(this.butacaId);
      myTag.classList.add('selected');
    }
  }



}
