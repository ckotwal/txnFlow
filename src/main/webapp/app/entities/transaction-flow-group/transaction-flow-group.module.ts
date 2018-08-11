import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionFlowConfigurationSharedModule } from 'app/shared';
import {
    TransactionFlowGroupComponent,
    TransactionFlowGroupDetailComponent,
    TransactionFlowGroupUpdateComponent,
    TransactionFlowGroupDeletePopupComponent,
    TransactionFlowGroupDeleteDialogComponent,
    transactionFlowGroupRoute,
    transactionFlowGroupPopupRoute
} from './';

const ENTITY_STATES = [...transactionFlowGroupRoute, ...transactionFlowGroupPopupRoute];

@NgModule({
    imports: [TransactionFlowConfigurationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TransactionFlowGroupComponent,
        TransactionFlowGroupDetailComponent,
        TransactionFlowGroupUpdateComponent,
        TransactionFlowGroupDeleteDialogComponent,
        TransactionFlowGroupDeletePopupComponent
    ],
    entryComponents: [
        TransactionFlowGroupComponent,
        TransactionFlowGroupUpdateComponent,
        TransactionFlowGroupDeleteDialogComponent,
        TransactionFlowGroupDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationTransactionFlowGroupModule {}
