import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChti } from 'app/shared/model/chti.model';

type EntityResponseType = HttpResponse<IChti>;
type EntityArrayResponseType = HttpResponse<IChti[]>;

@Injectable({ providedIn: 'root' })
export class ChtiService {
    public resourceUrl = SERVER_API_URL + 'api/chtis';

    constructor(protected http: HttpClient) {}

    create(chti: IChti): Observable<EntityResponseType> {
        return this.http.post<IChti>(this.resourceUrl, chti, { observe: 'response' });
    }

    update(chti: IChti): Observable<EntityResponseType> {
        return this.http.put<IChti>(this.resourceUrl, chti, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IChti>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IChti[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
