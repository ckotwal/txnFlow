import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { Principal } from 'app/core';
import { ApplicationTransactionService } from './application-transaction.service';

@Component({
    selector: 'jhi-application-transaction',
    templateUrl: './application-transaction.component.html'
})
export class ApplicationTransactionComponent implements OnInit, OnDestroy {
    applicationTransactions: IApplicationTransaction[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private applicationTransactionService: ApplicationTransactionService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.applicationTransactionService.query().subscribe(
            (res: HttpResponse<IApplicationTransaction[]>) => {
                this.applicationTransactions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplicationTransactions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplicationTransaction) {
        return item.id;
    }

    registerChangeInApplicationTransactions() {
        this.eventSubscriber = this.eventManager.subscribe('applicationTransactionListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
