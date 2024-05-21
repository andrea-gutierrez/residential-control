import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

import Swal from "sweetalert2";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {FormComponent} from "./form/form.component";
import {ResidentialUnitAdmins} from "./model/residentialManagers.model";
import {ResidentialUnitManagerService} from "./service/residential-unit-manager.service";

@Component({
  selector: 'management-residential-manager',
  standalone: true,
  templateUrl: './residential-managers.component.html',
  imports: [
    NgForOf
  ]
})
export class ResidentialManagersComponent implements OnInit{
  private modalService = inject(NgbModal);

  private managerService = inject(ResidentialUnitManagerService);

  public managerList: ResidentialUnitAdmins[] = [];

  ngOnInit() {
    this.managerService.getAll().subscribe({
      next: (data: any) => {
        this.managerList = data.result;
      },
      error: () => {
        Swal.fire({
          title: 'Hubo un error!',
          text: 'Algo pasó',
          icon: 'error'
        });
      }
    })
  }

  onOpenModal(action: string, unidadResidencialAdminData?: ResidentialUnitAdmins) {
    const modalTitle = this.getModalTitle(action);

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialAdmonData = unidadResidencialAdminData ?? null;
    modalRef.result.then((unidadResidencialAdmin?: ResidentialUnitAdmins) => {
      if (unidadResidencialAdmin) {
        this.managerList.push(unidadResidencialAdmin);
      }
    })
  }

  getModalTitle(action: string): string {
    switch (action) {
      case 'edit':
        return 'Editar Administrador'
      default:
        return 'Nuevo Administrador';
    }
  }

  onDelete(id: string): void {
    const residentIndex = this.managerList.findIndex(resident => resident.id === id);
    this.managerList.splice(residentIndex, 1);
  }

}
