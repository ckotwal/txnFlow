import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionFlowConfigurationSharedModule } from 'app/shared';
import {
    ApplicationTransactionComponent,
    ApplicationTransactionDetailComponent,
    ApplicationTransactionUpdateComponent,
    ApplicationTransactionDeletePopupComponent,
    ApplicationTransactionDeleteDialogComponent,
    applicationTransactionRoute,
    applicationTransactionPopupRoute
} from './';

const ENTITY_STATES = [...applicationTransactionRoute, ...applicationTransactionPopupRoute];

@NgModule({
    imports: [TransactionFlowConfigurationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationTransactionComponent,
        ApplicationTransactionDetailComponent,
        ApplicationTransactionUpdateComponent,
        ApplicationTransactionDeleteDialogComponent,
        ApplicationTransactionDeletePopupComponent
    ],
    entryComponents: [
        ApplicationTransactionComponent,
        ApplicationTransactionUpdateComponent,
        ApplicationTransactionDeleteDialogComponent,
        ApplicationTransactionDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationApplicationTransactionModule {}
