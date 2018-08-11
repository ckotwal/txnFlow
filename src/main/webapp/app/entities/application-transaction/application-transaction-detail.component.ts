import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';

@Component({
    selector: 'jhi-application-transaction-detail',
    templateUrl: './application-transaction-detail.component.html'
})
export class ApplicationTransactionDetailComponent implements OnInit {
    applicationTransaction: IApplicationTransaction;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationTransaction }) => {
            this.applicationTransaction = applicationTransaction;
        });
    }

    previousState() {
        window.history.back();
    }
}
