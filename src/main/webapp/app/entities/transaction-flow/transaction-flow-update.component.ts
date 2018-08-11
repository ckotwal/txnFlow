import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';
import { TransactionFlowService } from './transaction-flow.service';
import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';
import { TransactionFlowGroupService } from 'app/entities/transaction-flow-group';

@Component({
    selector: 'jhi-transaction-flow-update',
    templateUrl: './transaction-flow-update.component.html'
})
export class TransactionFlowUpdateComponent implements OnInit {
    private _transactionFlow: ITransactionFlow;
    isSaving: boolean;

    transactionflowgroups: ITransactionFlowGroup[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private transactionFlowService: TransactionFlowService,
        private transactionFlowGroupService: TransactionFlowGroupService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transactionFlow }) => {
            this.transactionFlow = transactionFlow;
        });
        this.transactionFlowGroupService.query().subscribe(
            (res: HttpResponse<ITransactionFlowGroup[]>) => {
                this.transactionflowgroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transactionFlow.id !== undefined) {
            this.subscribeToSaveResponse(this.transactionFlowService.update(this.transactionFlow));
        } else {
            this.subscribeToSaveResponse(this.transactionFlowService.create(this.transactionFlow));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionFlow>>) {
        result.subscribe((res: HttpResponse<ITransactionFlow>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTransactionFlowGroupById(index: number, item: ITransactionFlowGroup) {
        return item.id;
    }
    get transactionFlow() {
        return this._transactionFlow;
    }

    set transactionFlow(transactionFlow: ITransactionFlow) {
        this._transactionFlow = transactionFlow;
    }
}
