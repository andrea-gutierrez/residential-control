import { Component, inject } from '@angular/core';
import { FormComponent } from './form/form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {UnidadResidencial} from "./residentialUnit.interface";
import {NgForOf} from "@angular/common";

@Component( {
  selector: 'app-residential-unit',
  standalone: true,
  imports: [
    FormComponent,
    NgForOf
  ],
  templateUrl: './residential-unit.component.html',
  styleUrl: './residential-unit.component.scss'
} )
export class ResidentialUnitComponent {
  private modalService = inject( NgbModal );

  public residentList: UnidadResidencial[] = [
    {
      emailAdmon: 'unidad_orinoco@gmail.com',
      registroInmobiliario: '#####',
      telefonoAdmon: 2131231,
      empresaVigilancia: 'Jesus Andres',
      ciudad: 'Medellin',
      codigoPostal: 324323,
      id: 'jldf32rjlks',
      departamento: 'Antioquia',
      direccion: 'cra 33',
      nitEmpresaVigilancia: '3423dfs',
      nombre: 'Orinoco de la cuenca',
      pais: 'Colombia',
    }
  ];

  onOpenModal( action: string, unidadResidencialData?: UnidadResidencial ) {
    const modalTitle = this.getModalTitle( action );

    const modalRef = this.modalService.open( FormComponent, {
      size: 'lg',
    } );

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialData = unidadResidencialData ?? null;
    modalRef.result.then((unidadResidencial?: UnidadResidencial) => {
      console.log('result', unidadResidencial);
      if(unidadResidencial) {
        this.residentList.push(unidadResidencial);
      }
    })
  }

  onDelete(id: string): void {
    const residentIndex = this.residentList.findIndex( resident => resident.id === id );
    this.residentList.splice(residentIndex, 1);
  }

  getModalTitle( action: string ): string {
    switch ( action ) {
      case 'edit':
        return 'Editar'
      default:
        return 'Nuevo';
    }
  }
}
