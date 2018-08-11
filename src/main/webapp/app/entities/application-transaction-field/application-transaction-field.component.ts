import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';
import { Principal } from 'app/core';
import { ApplicationTransactionFieldService } from './application-transaction-field.service';

@Component({
    selector: 'jhi-application-transaction-field',
    templateUrl: './application-transaction-field.component.html'
})
export class ApplicationTransactionFieldComponent implements OnInit, OnDestroy {
    applicationTransactionFields: IApplicationTransactionField[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private applicationTransactionFieldService: ApplicationTransactionFieldService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.applicationTransactionFieldService.query().subscribe(
            (res: HttpResponse<IApplicationTransactionField[]>) => {
                this.applicationTransactionFields = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplicationTransactionFields();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplicationTransactionField) {
        return item.id;
    }

    registerChangeInApplicationTransactionFields() {
        this.eventSubscriber = this.eventManager.subscribe('applicationTransactionFieldListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
