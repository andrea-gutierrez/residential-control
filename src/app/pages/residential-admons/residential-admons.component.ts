import {Component, inject} from '@angular/core';
import {FormComponent} from "./form/form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UnidadResidencialAdmons} from "./residentialAdmons.interface";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-residential-admons',
  standalone: true,
  templateUrl: './residential-admons.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './residential-admons.component.scss'
})
export class ResidentialAdmonsComponent {
  private modalService = inject(NgbModal);

  public residentialUnitAdmonList: UnidadResidencialAdmons[] = [
    {
      email: 'cataguirales@gmail.com',
      id: 'fdsjkfj323423432',
      celular: 312345345,
      documento: '323432423',
      apellido: 'Guirales',
      nombre: 'Catalina',
      password: 'password',
      tipoDocumento: 'cc',
      usuario: 'cataguirales'
    }
  ];

  onOpenModal(action: string, unidadResidencialAdmonData?: UnidadResidencialAdmons) {
    const modalTitle = this.getModalTitle(action);

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialAdmonData = unidadResidencialAdmonData ?? null;
    modalRef.result.then((unidadResidencialAdmon?: UnidadResidencialAdmons) => {
      console.log('result', unidadResidencialAdmon);
      if (unidadResidencialAdmon) {
        this.residentialUnitAdmonList.push(unidadResidencialAdmon);
      }
    })
  }

  getModalTitle(action: string): string {
    switch (action) {
      case 'edit':
        return 'Editar'
      default:
        return 'Nuevo';
    }
  }

  onDelete(id: string): void {
    const residentIndex = this.residentialUnitAdmonList.findIndex(resident => resident.id === id);
    this.residentialUnitAdmonList.splice(residentIndex, 1);
  }

}
