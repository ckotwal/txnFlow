import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { ApplicationTransactionService } from './application-transaction.service';

@Component({
    selector: 'jhi-application-transaction-delete-dialog',
    templateUrl: './application-transaction-delete-dialog.component.html'
})
export class ApplicationTransactionDeleteDialogComponent {
    applicationTransaction: IApplicationTransaction;

    constructor(
        private applicationTransactionService: ApplicationTransactionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicationTransactionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicationTransactionListModification',
                content: 'Deleted an applicationTransaction'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-application-transaction-delete-popup',
    template: ''
})
export class ApplicationTransactionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationTransaction }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ApplicationTransactionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.applicationTransaction = applicationTransaction;
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
