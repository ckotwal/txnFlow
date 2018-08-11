import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';
import { ApplicationTransactionFieldService } from './application-transaction-field.service';

@Component({
    selector: 'jhi-application-transaction-field-delete-dialog',
    templateUrl: './application-transaction-field-delete-dialog.component.html'
})
export class ApplicationTransactionFieldDeleteDialogComponent {
    applicationTransactionField: IApplicationTransactionField;

    constructor(
        private applicationTransactionFieldService: ApplicationTransactionFieldService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicationTransactionFieldService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicationTransactionFieldListModification',
                content: 'Deleted an applicationTransactionField'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-transaction-field-delete-popup',
    template: ''
})
export class ApplicationTransactionFieldDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationTransactionField }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ApplicationTransactionFieldDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.applicationTransactionField = applicationTransactionField;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
