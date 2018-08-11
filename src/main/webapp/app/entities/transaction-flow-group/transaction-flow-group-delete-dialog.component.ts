import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';
import { TransactionFlowGroupService } from './transaction-flow-group.service';

@Component({
    selector: 'jhi-transaction-flow-group-delete-dialog',
    templateUrl: './transaction-flow-group-delete-dialog.component.html'
})
export class TransactionFlowGroupDeleteDialogComponent {
    transactionFlowGroup: ITransactionFlowGroup;

    constructor(
        private transactionFlowGroupService: TransactionFlowGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transactionFlowGroupService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'transactionFlowGroupListModification',
                content: 'Deleted an transactionFlowGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transaction-flow-group-delete-popup',
    template: ''
})
export class TransactionFlowGroupDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionFlowGroup }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TransactionFlowGroupDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.transactionFlowGroup = transactionFlowGroup;
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
