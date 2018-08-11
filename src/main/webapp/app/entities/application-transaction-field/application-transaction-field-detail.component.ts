import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

@Component({
    selector: 'jhi-application-transaction-field-detail',
    templateUrl: './application-transaction-field-detail.component.html'
})
export class ApplicationTransactionFieldDetailComponent implements OnInit {
    applicationTransactionField: IApplicationTransactionField;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicationTransactionField }) => {
            this.applicationTransactionField = applicationTransactionField;
        });
    }

    previousState() {
        window.history.back();
    }
}
