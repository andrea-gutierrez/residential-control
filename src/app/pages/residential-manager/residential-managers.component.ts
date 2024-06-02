import {Component, inject, OnInit} from '@angular/core';
import {NgFor, NgIf} from '@angular/common';

import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {FormComponent} from "./form/form.component";
import {ResidentialUnitAdmins} from "./model/residentialManagers.model";
import {ResidentialUnitManagerService} from "./service/residential-unit-manager.service";
import Swal from "sweetalert2";

@Component({
  selector: 'management-residential-manager',
  standalone: true,
  templateUrl: './residential-managers.component.html',
  imports: [
    NgFor,
    NgIf
  ],

})
export class ResidentialManagersComponent implements OnInit {
  private modalService = inject(NgbModal);

  private managerService = inject(ResidentialUnitManagerService);

  public managerList: ResidentialUnitAdmins[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(showSuccessfulToast = false, action = 'guardado'): void {
    this.managerService.getAll().subscribe({
      next: (data: any) => {
        this.managerList = data.result;
        if (showSuccessfulToast) {
          Swal.fire({
            text: `Fue ${action} con éxito`,
            icon: 'success'
          });
        }
      }
    })
  }

  onOpenModal(action: string, unidadResidencialAdminData?: ResidentialUnitAdmins): void {
    const modalTitle = this.getModalTitle(action);

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialAdmonData = unidadResidencialAdminData ?? null;
    modalRef.result.then((unidadResidencialAdmin?: ResidentialUnitAdmins) => {
      if (unidadResidencialAdmin) {
        this.loadData();
      }
    });
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
    Swal.fire({
      text: 'Estás seguro de eliminar a',
      confirmButtonText: 'Si',
      showConfirmButton: true,
      icon: 'warning'
    }).then((result) => {
      if (result.isConfirmed) {
        this.managerService.deleteById(id).subscribe({
          next: () => {
            this.loadData(true, 'eliminado');
          }
        })
      }
    });
  }

}
