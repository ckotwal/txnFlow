import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';

type EntityResponseType = HttpResponse<IApplicationTransaction>;
type EntityArrayResponseType = HttpResponse<IApplicationTransaction[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationTransactionService {
    private resourceUrl = SERVER_API_URL + 'api/application-transactions';

    constructor(private http: HttpClient) {}

    create(applicationTransaction: IApplicationTransaction): Observable<EntityResponseType> {
        return this.http.post<IApplicationTransaction>(this.resourceUrl, applicationTransaction, { observe: 'response' });
    }

    update(applicationTransaction: IApplicationTransaction): Observable<EntityResponseType> {
        return this.http.put<IApplicationTransaction>(this.resourceUrl, applicationTransaction, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IApplicationTransaction>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IApplicationTransaction[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
