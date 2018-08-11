import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionFlowConfigurationSharedModule } from 'app/shared';
import {
    ApplicationTransactionFieldComponent,
    ApplicationTransactionFieldDetailComponent,
    ApplicationTransactionFieldUpdateComponent,
    ApplicationTransactionFieldDeletePopupComponent,
    ApplicationTransactionFieldDeleteDialogComponent,
    applicationTransactionFieldRoute,
    applicationTransactionFieldPopupRoute
} from './';

const ENTITY_STATES = [...applicationTransactionFieldRoute, ...applicationTransactionFieldPopupRoute];

@NgModule({
    imports: [TransactionFlowConfigurationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ApplicationTransactionFieldComponent,
        ApplicationTransactionFieldDetailComponent,
        ApplicationTransactionFieldUpdateComponent,
        ApplicationTransactionFieldDeleteDialogComponent,
        ApplicationTransactionFieldDeletePopupComponent
    ],
    entryComponents: [
        ApplicationTransactionFieldComponent,
        ApplicationTransactionFieldUpdateComponent,
        ApplicationTransactionFieldDeleteDialogComponent,
        ApplicationTransactionFieldDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationApplicationTransactionFieldModule {}
