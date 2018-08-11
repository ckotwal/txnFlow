import { IApplicationTransactionField } from 'app/shared/model//application-transaction-field.model';
import { ITransactionFlow } from 'app/shared/model//transaction-flow.model';
import { IApplicationTransaction } from 'app/shared/model//application-transaction.model';

export interface IFlowApplicationSequence {
    id?: number;
    appSequence?: number;
    fields?: IApplicationTransactionField[];
    flow?: ITransactionFlow;
    application?: IApplicationTransaction;
}

export class FlowApplicationSequence implements IFlowApplicationSequence {
    constructor(
        public id?: number,
        public appSequence?: number,
        public fields?: IApplicationTransactionField[],
        public flow?: ITransactionFlow,
        public application?: IApplicationTransaction
    ) {}
}
