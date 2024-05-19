import {Component, inject, OnInit} from '@angular/core';
import {FormComponent} from "./form/form.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ResidentialUnitAdmins} from "./residentialAdmons.interface";
import {NgForOf} from "@angular/common";
import {ResidentialUnitManagerService} from "./residential-unit-manager.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-residential-admon',
  standalone: true,
  templateUrl: './residential-admons.component.html',
  imports: [
    NgForOf
  ],
  styleUrl: './residential-admons.component.scss'
})
export class ResidentialAdmonsComponent implements OnInit{
  private modalService = inject(NgbModal);

  private managerService = inject(ResidentialUnitManagerService);

  public managerList: ResidentialUnitAdmins[] = [];

  ngOnInit() {
    this.managerService.getAll().subscribe({
      next: (data: any) => {
        console.log('ok')
        this.managerList = data.result;
      },
      error: (error: any) => {
        console.error(error, 'error');
        Swal.fire({
          title: 'Hubo un error!',
          text: 'Algo pasó',
          icon: 'error'
        });
      }
    })
  }

  onOpenModal(action: string, unidadResidencialAdmonData?: ResidentialUnitAdmins) {
    const modalTitle = this.getModalTitle(action);

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialAdmonData = unidadResidencialAdmonData ?? null;
    modalRef.result.then((unidadResidencialAdmon?: ResidentialUnitAdmins) => {
      if (unidadResidencialAdmon) {
        this.managerList.push(unidadResidencialAdmon);
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
