import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionFlowConfigurationSharedModule } from 'app/shared';
import {
    TransactionFlowComponent,
    TransactionFlowDetailComponent,
    TransactionFlowUpdateComponent,
    TransactionFlowDeletePopupComponent,
    TransactionFlowDeleteDialogComponent,
    transactionFlowRoute,
    transactionFlowPopupRoute
} from './';

const ENTITY_STATES = [...transactionFlowRoute, ...transactionFlowPopupRoute];

@NgModule({
    imports: [TransactionFlowConfigurationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransactionFlowComponent,
        TransactionFlowDetailComponent,
        TransactionFlowUpdateComponent,
        TransactionFlowDeleteDialogComponent,
        TransactionFlowDeletePopupComponent
    ],
    entryComponents: [
        TransactionFlowComponent,
        TransactionFlowUpdateComponent,
        TransactionFlowDeleteDialogComponent,
        TransactionFlowDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationTransactionFlowModule {}
