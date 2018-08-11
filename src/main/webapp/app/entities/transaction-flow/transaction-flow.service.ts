import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';

type EntityResponseType = HttpResponse<ITransactionFlow>;
type EntityArrayResponseType = HttpResponse<ITransactionFlow[]>;

@Injectable({ providedIn: 'root' })
export class TransactionFlowService {
    private resourceUrl = SERVER_API_URL + 'api/transaction-flows';

    constructor(private http: HttpClient) {}

    create(transactionFlow: ITransactionFlow): Observable<EntityResponseType> {
        return this.http.post<ITransactionFlow>(this.resourceUrl, transactionFlow, { observe: 'response' });
    }

    update(transactionFlow: ITransactionFlow): Observable<EntityResponseType> {
        return this.http.put<ITransactionFlow>(this.resourceUrl, transactionFlow, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITransactionFlow>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITransactionFlow[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
