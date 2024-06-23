import { AsyncPipe, NgForOf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, startWith } from 'rxjs';

import { InputComponent } from '@shared/components/form/input/input.component';
import { FormActions } from '@shared/interfaces/formActions.enum';

import { FormComponent } from '../../components/form/form.component';
import { ApartmentResident } from '../../interfaces';
import { ApartmentResidentService } from '../../services/apartment-resident.service';

@Component({
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    InputComponent,
  ],
  templateUrl: './resident.component.html',
  styleUrl: './resident.component.scss',
})
export class ResidentComponent implements OnInit {
  private modalService = inject(NgbModal);

  private apartmentResidentService = inject(ApartmentResidentService);

  public apartmentResidentList: ApartmentResident[] = [];

  protected readonly FormActions = FormActions;

  apartmentResidentList$: Observable<ApartmentResident[]>;
  filter = new FormControl('', { nonNullable: true });

  constructor() {
    this.apartmentResidentList$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit() {
    this.loadApartmentResident();
  }

  loadApartmentResident(): void {
    this.apartmentResidentService.getAll().subscribe(data => {
      this.apartmentResidentList = data;
      console.log(this.apartmentResidentList, 'list ');
    });
  }

  onOpenFormModal(action: FormActions, residentInfo?: ApartmentResident): void {
    const modalRef = this.modalService.open(FormComponent, {
      size: 'lg',
    });

    const isEditing: boolean = action === FormActions.Edit;

    modalRef.componentInstance.modalTitle = isEditing ? 'Editar' : 'Nuevo';
    modalRef.componentInstance.residentInfo = isEditing ? residentInfo : null;
    modalRef.result.then((isCreated: boolean) => {
      if (isCreated) {
        this.loadApartmentResident();
      }
    });
  }

  search(text: string): ApartmentResident[] {
    return this.apartmentResidentList.filter(apartment => {
      const term = text.toLowerCase();
      return (
        apartment.name.toLowerCase().includes(term) ||
        apartment.plate.toLowerCase().includes(term) ||
        apartment.document.toLowerCase().includes(term) ||
        apartment.tower.toLowerCase().includes(term)
      );
    });
  }
}
