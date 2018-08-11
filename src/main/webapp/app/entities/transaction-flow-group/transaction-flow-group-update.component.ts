import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';
import { TransactionFlowGroupService } from './transaction-flow-group.service';

@Component({
    selector: 'jhi-transaction-flow-group-update',
    templateUrl: './transaction-flow-group-update.component.html'
})
export class TransactionFlowGroupUpdateComponent implements OnInit {
    private _transactionFlowGroup: ITransactionFlowGroup;
    isSaving: boolean;

    constructor(private transactionFlowGroupService: TransactionFlowGroupService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ transactionFlowGroup }) => {
            this.transactionFlowGroup = transactionFlowGroup;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.transactionFlowGroup.id !== undefined) {
            this.subscribeToSaveResponse(this.transactionFlowGroupService.update(this.transactionFlowGroup));
        } else {
            this.subscribeToSaveResponse(this.transactionFlowGroupService.create(this.transactionFlowGroup));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionFlowGroup>>) {
        result.subscribe(
            (res: HttpResponse<ITransactionFlowGroup>) => this.onSaveSuccess(),
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
    get transactionFlowGroup() {
        return this._transactionFlowGroup;
    }

    set transactionFlowGroup(transactionFlowGroup: ITransactionFlowGroup) {
        this._transactionFlowGroup = transactionFlowGroup;
    }
}
