import {Component, inject, OnInit} from '@angular/core';

import {FormComponent} from './form/form.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

import Swal from 'sweetalert2';

import {ResidentialUnitService} from "./residential-unit.service";
import {ResidentialUnit} from "./residentialUnit.interface";

@Component({
  selector: 'app-residential-unit',
  standalone: true,
  imports: [
    FormComponent,
    NgForOf,
  ],
  providers: [
    ResidentialUnitService,
  ],
  templateUrl: './residential-unit.component.html',
  styleUrl: './residential-unit.component.scss'
})
export class ResidentialUnitComponent implements OnInit {
  private modalService = inject(NgbModal);
  private router = inject(Router);

  private residentialUnitService = inject(ResidentialUnitService);

  public residentList: ResidentialUnit[] = [];

  ngOnInit() {
    this.residentialUnitService.getAll().subscribe({
      next: (data: any) => {
        this.residentList = data.result;
      },
      error: () => {
        Swal.fire({
          title: 'Hubo un error!',
          text: 'Algo pasó',
          icon: 'error'
        });
      }
    });
  }

  onOpenModal(action: string, unidadResidencialData?: ResidentialUnit) {
    const modalTitle = this.getModalTitle(action);

    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    modalRef.componentInstance.modalTitle = modalTitle;
    modalRef.componentInstance.unidadResidencialData = unidadResidencialData ?? null;
    modalRef.result.then((unidadResidencial?: ResidentialUnit) => {
      if (unidadResidencial) {
        this.residentList.push(unidadResidencial);
      }
    })
  }

  onDelete(id: string): void {
    const residentIndex = this.residentList.findIndex(resident => resident.id === id);
    this.residentList.splice(residentIndex, 1);
  }

  getModalTitle(action: string): string {
    switch (action) {
      case 'edit':
        return 'Editar'
      default:
        return 'Nueva Unidad Residencial';
    }
  }

  goToView(): void {
    this.router.navigate(['residential-admons']);
  }
}
