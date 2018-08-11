import { ITransactionFlow } from 'app/shared/model//transaction-flow.model';

export interface ITransactionFlowGroup {
    id?: number;
    name?: string;
    flows?: ITransactionFlow[];
}

export class TransactionFlowGroup implements ITransactionFlowGroup {
    constructor(public id?: number, public name?: string, public flows?: ITransactionFlow[]) {}
}
