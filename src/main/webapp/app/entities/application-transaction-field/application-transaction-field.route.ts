import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';
import { ApplicationTransactionFieldService } from './application-transaction-field.service';
import { ApplicationTransactionFieldComponent } from './application-transaction-field.component';
import { ApplicationTransactionFieldDetailComponent } from './application-transaction-field-detail.component';
import { ApplicationTransactionFieldUpdateComponent } from './application-transaction-field-update.component';
import { ApplicationTransactionFieldDeletePopupComponent } from './application-transaction-field-delete-dialog.component';
import { IApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

@Injectable({ providedIn: 'root' })
export class ApplicationTransactionFieldResolve implements Resolve<IApplicationTransactionField> {
    constructor(private service: ApplicationTransactionFieldService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((applicationTransactionField: HttpResponse<ApplicationTransactionField>) => applicationTransactionField.body));
        }
        return of(new ApplicationTransactionField());
    }
}

export const applicationTransactionFieldRoute: Routes = [
    {
        path: 'application-transaction-field',
        component: ApplicationTransactionFieldComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactionFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction-field/:id/view',
        component: ApplicationTransactionFieldDetailComponent,
        resolve: {
            applicationTransactionField: ApplicationTransactionFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactionFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction-field/new',
        component: ApplicationTransactionFieldUpdateComponent,
        resolve: {
            applicationTransactionField: ApplicationTransactionFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactionFields'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction-field/:id/edit',
        component: ApplicationTransactionFieldUpdateComponent,
        resolve: {
            applicationTransactionField: ApplicationTransactionFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactionFields'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationTransactionFieldPopupRoute: Routes = [
    {
        path: 'application-transaction-field/:id/delete',
        component: ApplicationTransactionFieldDeletePopupComponent,
        resolve: {
            applicationTransactionField: ApplicationTransactionFieldResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactionFields'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
