import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';
import { Principal } from 'app/core';
import { TransactionFlowGroupService } from './transaction-flow-group.service';

@Component({
    selector: 'jhi-transaction-flow-group',
    templateUrl: './transaction-flow-group.component.html'
})
export class TransactionFlowGroupComponent implements OnInit, OnDestroy {
    transactionFlowGroups: ITransactionFlowGroup[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transactionFlowGroupService: TransactionFlowGroupService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.transactionFlowGroupService.query().subscribe(
            (res: HttpResponse<ITransactionFlowGroup[]>) => {
                this.transactionFlowGroups = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTransactionFlowGroups();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITransactionFlowGroup) {
        return item.id;
    }

    registerChangeInTransactionFlowGroups() {
        this.eventSubscriber = this.eventManager.subscribe('transactionFlowGroupListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
