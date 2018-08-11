import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';
import { FlowApplicationSequenceService } from './flow-application-sequence.service';
import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';
import { TransactionFlowService } from 'app/entities/transaction-flow';
import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { ApplicationTransactionService } from 'app/entities/application-transaction';

@Component({
    selector: 'jhi-flow-application-sequence-update',
    templateUrl: './flow-application-sequence-update.component.html'
})
export class FlowApplicationSequenceUpdateComponent implements OnInit {
    private _flowApplicationSequence: IFlowApplicationSequence;
    isSaving: boolean;

    transactionflows: ITransactionFlow[];

    applicationtransactions: IApplicationTransaction[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private flowApplicationSequenceService: FlowApplicationSequenceService,
        private transactionFlowService: TransactionFlowService,
        private applicationTransactionService: ApplicationTransactionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flowApplicationSequence }) => {
            this.flowApplicationSequence = flowApplicationSequence;
        });
        this.transactionFlowService.query().subscribe(
            (res: HttpResponse<ITransactionFlow[]>) => {
                this.transactionflows = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.applicationTransactionService.query().subscribe(
            (res: HttpResponse<IApplicationTransaction[]>) => {
                this.applicationtransactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flowApplicationSequence.id !== undefined) {
            this.subscribeToSaveResponse(this.flowApplicationSequenceService.update(this.flowApplicationSequence));
        } else {
            this.subscribeToSaveResponse(this.flowApplicationSequenceService.create(this.flowApplicationSequence));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IFlowApplicationSequence>>) {
        result.subscribe(
            (res: HttpResponse<IFlowApplicationSequence>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTransactionFlowById(index: number, item: ITransactionFlow) {
        return item.id;
    }

    trackApplicationTransactionById(index: number, item: IApplicationTransaction) {
        return item.id;
    }
    get flowApplicationSequence() {
        return this._flowApplicationSequence;
    }

    set flowApplicationSequence(flowApplicationSequence: IFlowApplicationSequence) {
        this._flowApplicationSequence = flowApplicationSequence;
    }
}
