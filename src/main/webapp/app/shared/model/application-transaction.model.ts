import { IFlowApplicationSequence } from 'app/shared/model//flow-application-sequence.model';
import { IApplicationTransactionField } from 'app/shared/model//application-transaction-field.model';

export const enum EventRepositoryType {
    DP = 'DP'
}

export interface IApplicationTransaction {
    id?: number;
    name?: string;
    eventCount?: number;
    eventRepositoryType?: EventRepositoryType;
    repositoryEventName?: string;
    flows?: IFlowApplicationSequence[];
    fields?: IApplicationTransactionField[];
}

export class ApplicationTransaction implements IApplicationTransaction {
    constructor(
        public id?: number,
        public name?: string,
        public eventCount?: number,
        public eventRepositoryType?: EventRepositoryType,
        public repositoryEventName?: string,
        public flows?: IFlowApplicationSequence[],
        public fields?: IApplicationTransactionField[]
    ) {}
}
