import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';

@Component({
    selector: 'jhi-transaction-flow-detail',
    templateUrl: './transaction-flow-detail.component.html'
})
export class TransactionFlowDetailComponent implements OnInit {
    transactionFlow: ITransactionFlow;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ transactionFlow }) => {
            this.transactionFlow = transactionFlow;
        });
    }

    previousState() {
        window.history.back();
    }
}
