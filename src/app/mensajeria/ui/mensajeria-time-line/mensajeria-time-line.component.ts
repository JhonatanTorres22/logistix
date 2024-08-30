import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { TimelineModule } from 'primeng/timeline';
import { MensajeriaTimeLine, MensajeriaTimeLine2 } from '../../domain/models/mensajeria.model';
import { MensajeriaRepository } from '../../domain/repositories/mensajeria.repository';
import { MensajeriaSignal } from '../../domain/signals/mensajeria.signal';
import { AlertService } from 'src/app/demo/services/alert.service';
import { animate, trigger } from '@angular/animations';

@Component({
  selector: 'mensajeria-time-line',
  standalone: true,
  imports: [ CommonModule, SharedModule, TimelineModule ],
  templateUrl: './mensajeria-time-line.component.html',
  styleUrl: './mensajeria-time-line.component.scss',
  // animations: [
  //   trigger('myAnim', [
  //     animate( '1.5s ease 1.5s infinite normal forwards' )
  //   ])
  // ]
})
export class MensajeriaTimeLineComponent implements OnInit {

  selectMensaje = this.signal.selectMensaje;

  hitos1: MensajeriaTimeLine2[];
  hitos: MensajeriaTimeLine[];

  constructor(
    private repository: MensajeriaRepository,
    private signal: MensajeriaSignal,
    private alert: AlertService,
  ) {
    // this.hitos1 = [
    //   { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
    //   { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
    //   { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    //   { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
    // ];

    // this.hitos = [
    //   {
    //       emisor: "Vicerrectorado Académico",
    //       receptor: "Decano de Facultad de Ingeniería Ciencias y Administración",
    //       fechaCreacion: "8/27/2024 7:51:47 PM",
    //       fechaVencimiento: "8/28/2024 7:51:47 PM",
    //       orden: 1,
    //       nHitos: 6,
    //       nMensajes: 3,
    //   },
    //   {
    //       emisor: "Decano de Facultad de Ingeniería Ciencias y Administración",
    //       receptor: "Director de Escuela de Administración y Finanzas",
    //       fechaCreacion: "8/27/2024 7:52:46 PM",
    //       fechaVencimiento: "8/30/2024 7:52:46 PM",
    //       orden: 2,
    //       nHitos: 6,
    //       nMensajes: 3,
    //   },
    //   {
    //       emisor: "Director de Escuela de Administración y Finanzas",
    //       receptor: "Decano de Facultad de Ingeniería Ciencias y Administración",
    //       fechaCreacion: "8/27/2024 7:55:45 PM",
    //       fechaVencimiento: "8/28/2024 7:55:45 PM",
    //       orden: 3,
    //       nHitos: 6,
    //       nMensajes: 3,
    //   },
    //   {
    //     emisor: "Decano de Facultad de Ingeniería Ciencias y Administración",
    //     receptor: "",
    //     fechaCreacion: "",
    //     fechaVencimiento: "",
    //     orden: 4,
    //     nHitos: 6,
    //     nMensajes: 3,
    //   },
    //   {
    //     emisor: "Vicerrectorado Académico",
    //     receptor: "",
    //     fechaCreacion: "",
    //     fechaVencimiento: "",
    //     orden: 5,
    //     nHitos: 6,
    //     nMensajes: 3,
    //   },
    //   {
    //     emisor: "Consejo Universitario",
    //     receptor: "",
    //     fechaCreacion: "",
    //     fechaVencimiento: "",
    //     orden: 6,
    //     nHitos: 6,
    //     nMensajes: 3,
    //   }
    // ];
  }
  ngOnInit(): void {
    this.obtenerTimeLine();
  }

  obtenerTimeLine = () => {
    console.log( this.selectMensaje().idMensaje );
    
    this.repository.obtenerTimeLine( this.selectMensaje().idMensaje ).subscribe({
      next: ( response ) => {
        console.log( response );
        this.hitos = response;
      }, error: ( error ) => {
        console.log( error );
        this.alert.showAlert('Ocurrió un error al obtener el seguimiento de su mensaje', 'error', 6);
      }
    })
  }
}
