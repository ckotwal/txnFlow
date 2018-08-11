import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

type EntityResponseType = HttpResponse<IFlowApplicationSequence>;
type EntityArrayResponseType = HttpResponse<IFlowApplicationSequence[]>;

@Injectable({ providedIn: 'root' })
export class FlowApplicationSequenceService {
    private resourceUrl = SERVER_API_URL + 'api/flow-application-sequences';

    constructor(private http: HttpClient) {}

    create(flowApplicationSequence: IFlowApplicationSequence): Observable<EntityResponseType> {
        return this.http.post<IFlowApplicationSequence>(this.resourceUrl, flowApplicationSequence, { observe: 'response' });
    }

    update(flowApplicationSequence: IFlowApplicationSequence): Observable<EntityResponseType> {
        return this.http.put<IFlowApplicationSequence>(this.resourceUrl, flowApplicationSequence, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlowApplicationSequence>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlowApplicationSequence[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
