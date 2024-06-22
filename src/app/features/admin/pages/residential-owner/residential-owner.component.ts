import { NgForOf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { FormActions } from '@shared/interfaces/formActions.enum';

import { FormComponent } from '../../components/form/form.component';
import { ResidentialOwner } from '../../interfaces';
import { ResidentialOwnerService } from '../../services/residential-owner.service';

@Component({
  standalone: true,
  imports: [NgForOf],
  templateUrl: './residential-owner.component.html',
  styleUrl: './residential-owner.component.scss',
})
export class ResidentialOwnerComponent implements OnInit {
  private modalService = inject(NgbModal);

  private residentialOwnerService = inject(ResidentialOwnerService);

  public residentialOwnerList: ResidentialOwner[] = [];

  ngOnInit() {
    this.loadResidentialOwner();
  }

  loadResidentialOwner(): void {
    this.residentialOwnerService.getAll().subscribe(data => {
      this.residentialOwnerList = data;
    });
  }

  onOpenFormModal(
    action: FormActions,
    residentialOwnerInfo?: ResidentialOwner
  ): void {
    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    const isEditing: boolean = action === FormActions.Edit;

    modalRef.componentInstance.modalTitle = isEditing ? 'Editar' : 'Nuevo';
    modalRef.componentInstance.residentialOwnerInfo = isEditing
      ? residentialOwnerInfo
      : null;
    modalRef.result.then((isCreated: boolean) => {
      if (isCreated) {
        this.loadResidentialOwner();
      }
    });
  }

  onRemove(document: string): void {
    this.residentialOwnerService.remove(document).subscribe({
      next: () => {
        Swal.fire({
          text: 'Fue eliminado con éxito',
          icon: 'success',
        });
        this.loadResidentialOwner();
      },
    });
  }

  protected readonly FormActions = FormActions;
}
