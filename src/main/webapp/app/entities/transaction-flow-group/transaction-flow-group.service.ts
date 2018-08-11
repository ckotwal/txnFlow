import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

type EntityResponseType = HttpResponse<ITransactionFlowGroup>;
type EntityArrayResponseType = HttpResponse<ITransactionFlowGroup[]>;

@Injectable({ providedIn: 'root' })
export class TransactionFlowGroupService {
    private resourceUrl = SERVER_API_URL + 'api/transaction-flow-groups';

    constructor(private http: HttpClient) {}

    create(transactionFlowGroup: ITransactionFlowGroup): Observable<EntityResponseType> {
        return this.http.post<ITransactionFlowGroup>(this.resourceUrl, transactionFlowGroup, { observe: 'response' });
    }

    update(transactionFlowGroup: ITransactionFlowGroup): Observable<EntityResponseType> {
        return this.http.put<ITransactionFlowGroup>(this.resourceUrl, transactionFlowGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransactionFlowGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransactionFlowGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
