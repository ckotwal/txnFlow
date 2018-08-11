import { NgModule } from '@angular/core';

import { TransactionFlowConfigurationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TransactionFlowConfigurationSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TransactionFlowConfigurationSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TransactionFlowConfigurationSharedCommonModule {}
