import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Chti } from 'app/shared/model/chti.model';
import { ChtiService } from './chti.service';
import { ChtiComponent } from './chti.component';
import { ChtiDetailComponent } from './chti-detail.component';
import { ChtiUpdateComponent } from './chti-update.component';
import { ChtiDeletePopupComponent } from './chti-delete-dialog.component';
import { IChti } from 'app/shared/model/chti.model';

@Injectable({ providedIn: 'root' })
export class ChtiResolve implements Resolve<IChti> {
    constructor(private service: ChtiService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChti> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Chti>) => response.ok),
                map((chti: HttpResponse<Chti>) => chti.body)
            );
        }
        return of(new Chti());
    }
}

export const chtiRoute: Routes = [
    {
        path: '',
        component: ChtiComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chtis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: ChtiDetailComponent,
        resolve: {
            chti: ChtiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chtis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: ChtiUpdateComponent,
        resolve: {
            chti: ChtiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chtis'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: ChtiUpdateComponent,
        resolve: {
            chti: ChtiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chtis'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chtiPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: ChtiDeletePopupComponent,
        resolve: {
            chti: ChtiResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Chtis'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
