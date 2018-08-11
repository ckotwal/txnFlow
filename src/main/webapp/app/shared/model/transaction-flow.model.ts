import { IFlowApplicationSequence } from 'app/shared/model//flow-application-sequence.model';
import { ITransactionFlowGroup } from 'app/shared/model//transaction-flow-group.model';

export interface ITransactionFlow {
    id?: number;
    lOB?: string;
    name?: string;
    flowCorrelationId?: string;
    applications?: IFlowApplicationSequence[];
    group?: ITransactionFlowGroup;
}

export class TransactionFlow implements ITransactionFlow {
    constructor(
        public id?: number,
        public lOB?: string,
        public name?: string,
        public flowCorrelationId?: string,
        public applications?: IFlowApplicationSequence[],
        public group?: ITransactionFlowGroup
    ) {}
}
