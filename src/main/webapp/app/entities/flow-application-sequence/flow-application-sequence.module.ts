import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TransactionFlowConfigurationSharedModule } from 'app/shared';
import {
    FlowApplicationSequenceComponent,
    FlowApplicationSequenceDetailComponent,
    FlowApplicationSequenceUpdateComponent,
    FlowApplicationSequenceDeletePopupComponent,
    FlowApplicationSequenceDeleteDialogComponent,
    flowApplicationSequenceRoute,
    flowApplicationSequencePopupRoute
} from './';

const ENTITY_STATES = [...flowApplicationSequenceRoute, ...flowApplicationSequencePopupRoute];

@NgModule({
    imports: [TransactionFlowConfigurationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlowApplicationSequenceComponent,
        FlowApplicationSequenceDetailComponent,
        FlowApplicationSequenceUpdateComponent,
        FlowApplicationSequenceDeleteDialogComponent,
        FlowApplicationSequenceDeletePopupComponent
    ],
    entryComponents: [
        FlowApplicationSequenceComponent,
        FlowApplicationSequenceUpdateComponent,
        FlowApplicationSequenceDeleteDialogComponent,
        FlowApplicationSequenceDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationFlowApplicationSequenceModule {}
