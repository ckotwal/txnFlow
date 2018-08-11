import { IApplicationTransaction } from 'app/shared/model//application-transaction.model';
import { IFlowApplicationSequence } from 'app/shared/model//flow-application-sequence.model';

export interface IApplicationTransactionField {
    id?: number;
    name?: string;
    isIdentifier?: boolean;
    filterValue?: string;
    application?: IApplicationTransaction;
    applicationOverride?: IFlowApplicationSequence;
}

export class ApplicationTransactionField implements IApplicationTransactionField {
    constructor(
        public id?: number,
        public name?: string,
        public isIdentifier?: boolean,
        public filterValue?: string,
        public application?: IApplicationTransaction,
        public applicationOverride?: IFlowApplicationSequence
    ) {
        this.isIdentifier = false;
    }
}
