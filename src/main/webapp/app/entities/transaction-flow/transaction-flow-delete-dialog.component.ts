import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';
import { TransactionFlowService } from './transaction-flow.service';

@Component({
    selector: 'jhi-transaction-flow-delete-dialog',
    templateUrl: './transaction-flow-delete-dialog.component.html'
})
export class TransactionFlowDeleteDialogComponent {
    transactionFlow: ITransactionFlow;

    constructor(
        private transactionFlowService: TransactionFlowService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionFlowService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionFlowListModification',
                content: 'Deleted an transactionFlow'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-flow-delete-popup',
    template: ''
})
export class TransactionFlowDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionFlow }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionFlowDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transactionFlow = transactionFlow;
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
