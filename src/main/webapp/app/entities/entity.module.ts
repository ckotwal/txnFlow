import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TransactionFlowConfigurationTransactionFlowGroupModule } from './transaction-flow-group/transaction-flow-group.module';
import { TransactionFlowConfigurationTransactionFlowModule } from './transaction-flow/transaction-flow.module';
import { TransactionFlowConfigurationApplicationTransactionModule } from './application-transaction/application-transaction.module';
import { TransactionFlowConfigurationFlowApplicationSequenceModule } from './flow-application-sequence/flow-application-sequence.module';
import { TransactionFlowConfigurationApplicationTransactionFieldModule } from './application-transaction-field/application-transaction-field.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TransactionFlowConfigurationTransactionFlowGroupModule,
        TransactionFlowConfigurationTransactionFlowModule,
        TransactionFlowConfigurationApplicationTransactionModule,
        TransactionFlowConfigurationFlowApplicationSequenceModule,
        TransactionFlowConfigurationApplicationTransactionFieldModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TransactionFlowConfigurationEntityModule {}
