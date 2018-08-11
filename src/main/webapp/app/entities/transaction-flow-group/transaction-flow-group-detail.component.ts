import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

@Component({
    selector: 'jhi-transaction-flow-group-detail',
    templateUrl: './transaction-flow-group-detail.component.html'
})
export class TransactionFlowGroupDetailComponent implements OnInit {
    transactionFlowGroup: ITransactionFlowGroup;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionFlowGroup }) => {
            this.transactionFlowGroup = transactionFlowGroup;
        });
    }

    previousState() {
        window.history.back();
    }
}
