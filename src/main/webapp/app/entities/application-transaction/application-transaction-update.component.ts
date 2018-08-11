import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { ApplicationTransactionService } from './application-transaction.service';

@Component({
    selector: 'jhi-application-transaction-update',
    templateUrl: './application-transaction-update.component.html'
})
export class ApplicationTransactionUpdateComponent implements OnInit {
    private _applicationTransaction: IApplicationTransaction;
    isSaving: boolean;

    constructor(private applicationTransactionService: ApplicationTransactionService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicationTransaction }) => {
            this.applicationTransaction = applicationTransaction;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicationTransaction.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationTransactionService.update(this.applicationTransaction));
        } else {
            this.subscribeToSaveResponse(this.applicationTransactionService.create(this.applicationTransaction));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationTransaction>>) {
        result.subscribe(
            (res: HttpResponse<IApplicationTransaction>) => this.onSaveSuccess(),
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
    get applicationTransaction() {
        return this._applicationTransaction;
    }

    set applicationTransaction(applicationTransaction: IApplicationTransaction) {
        this._applicationTransaction = applicationTransaction;
    }
}
