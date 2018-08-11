import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';
import { Principal } from 'app/core';
import { TransactionFlowService } from './transaction-flow.service';

@Component({
    selector: 'jhi-transaction-flow',
    templateUrl: './transaction-flow.component.html'
})
export class TransactionFlowComponent implements OnInit, OnDestroy {
    transactionFlows: ITransactionFlow[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionFlowService: TransactionFlowService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transactionFlowService.query().subscribe(
            (res: HttpResponse<ITransactionFlow[]>) => {
                this.transactionFlows = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionFlows();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransactionFlow) {
        return item.id;
    }

    registerChangeInTransactionFlows() {
        this.eventSubscriber = this.eventManager.subscribe('transactionFlowListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
