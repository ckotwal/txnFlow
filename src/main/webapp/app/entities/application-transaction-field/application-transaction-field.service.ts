import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

type EntityResponseType = HttpResponse<IApplicationTransactionField>;
type EntityArrayResponseType = HttpResponse<IApplicationTransactionField[]>;

@Injectable({ providedIn: 'root' })
export class ApplicationTransactionFieldService {
    private resourceUrl = SERVER_API_URL + 'api/application-transaction-fields';

    constructor(private http: HttpClient) {}

    create(applicationTransactionField: IApplicationTransactionField): Observable<EntityResponseType> {
        return this.http.post<IApplicationTransactionField>(this.resourceUrl, applicationTransactionField, { observe: 'response' });
    }

    update(applicationTransactionField: IApplicationTransactionField): Observable<EntityResponseType> {
        return this.http.put<IApplicationTransactionField>(this.resourceUrl, applicationTransactionField, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IApplicationTransactionField>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IApplicationTransactionField[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
