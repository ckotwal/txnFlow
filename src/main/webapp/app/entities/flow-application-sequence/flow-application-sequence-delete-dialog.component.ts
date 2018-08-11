import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';
import { FlowApplicationSequenceService } from './flow-application-sequence.service';

@Component({
    selector: 'jhi-flow-application-sequence-delete-dialog',
    templateUrl: './flow-application-sequence-delete-dialog.component.html'
})
export class FlowApplicationSequenceDeleteDialogComponent {
    flowApplicationSequence: IFlowApplicationSequence;

    constructor(
        private flowApplicationSequenceService: FlowApplicationSequenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flowApplicationSequenceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flowApplicationSequenceListModification',
                content: 'Deleted an flowApplicationSequence'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flow-application-sequence-delete-popup',
    template: ''
})
export class FlowApplicationSequenceDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flowApplicationSequence }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlowApplicationSequenceDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flowApplicationSequence = flowApplicationSequence;
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
