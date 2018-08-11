import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';
import { ApplicationTransactionFieldService } from './application-transaction-field.service';
import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { ApplicationTransactionService } from 'app/entities/application-transaction';
import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';
import { FlowApplicationSequenceService } from 'app/entities/flow-application-sequence';

@Component({
    selector: 'jhi-application-transaction-field-update',
    templateUrl: './application-transaction-field-update.component.html'
})
export class ApplicationTransactionFieldUpdateComponent implements OnInit {
    private _applicationTransactionField: IApplicationTransactionField;
    isSaving: boolean;

    applicationtransactions: IApplicationTransaction[];

    flowapplicationsequences: IFlowApplicationSequence[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private applicationTransactionFieldService: ApplicationTransactionFieldService,
        private applicationTransactionService: ApplicationTransactionService,
        private flowApplicationSequenceService: FlowApplicationSequenceService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicationTransactionField }) => {
            this.applicationTransactionField = applicationTransactionField;
        });
        this.applicationTransactionService.query().subscribe(
            (res: HttpResponse<IApplicationTransaction[]>) => {
                this.applicationtransactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.flowApplicationSequenceService.query().subscribe(
            (res: HttpResponse<IFlowApplicationSequence[]>) => {
                this.flowapplicationsequences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicationTransactionField.id !== undefined) {
            this.subscribeToSaveResponse(this.applicationTransactionFieldService.update(this.applicationTransactionField));
        } else {
            this.subscribeToSaveResponse(this.applicationTransactionFieldService.create(this.applicationTransactionField));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IApplicationTransactionField>>) {
        result.subscribe(
            (res: HttpResponse<IApplicationTransactionField>) => this.onSaveSuccess(),
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

    trackApplicationTransactionById(index: number, item: IApplicationTransaction) {
        return item.id;
    }

    trackFlowApplicationSequenceById(index: number, item: IFlowApplicationSequence) {
        return item.id;
    }
    get applicationTransactionField() {
        return this._applicationTransactionField;
    }

    set applicationTransactionField(applicationTransactionField: IApplicationTransactionField) {
        this._applicationTransactionField = applicationTransactionField;
    }
}
