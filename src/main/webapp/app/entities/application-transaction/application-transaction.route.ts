import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApplicationTransaction } from 'app/shared/model/application-transaction.model';
import { ApplicationTransactionService } from './application-transaction.service';
import { ApplicationTransactionComponent } from './application-transaction.component';
import { ApplicationTransactionDetailComponent } from './application-transaction-detail.component';
import { ApplicationTransactionUpdateComponent } from './application-transaction-update.component';
import { ApplicationTransactionDeletePopupComponent } from './application-transaction-delete-dialog.component';
import { IApplicationTransaction } from 'app/shared/model/application-transaction.model';

@Injectable({ providedIn: 'root' })
export class ApplicationTransactionResolve implements Resolve<IApplicationTransaction> {
    constructor(private service: ApplicationTransactionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((applicationTransaction: HttpResponse<ApplicationTransaction>) => applicationTransaction.body));
        }
        return of(new ApplicationTransaction());
    }
}

export const applicationTransactionRoute: Routes = [
    {
        path: 'application-transaction',
        component: ApplicationTransactionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction/:id/view',
        component: ApplicationTransactionDetailComponent,
        resolve: {
            applicationTransaction: ApplicationTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction/new',
        component: ApplicationTransactionUpdateComponent,
        resolve: {
            applicationTransaction: ApplicationTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactions'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'application-transaction/:id/edit',
        component: ApplicationTransactionUpdateComponent,
        resolve: {
            applicationTransaction: ApplicationTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const applicationTransactionPopupRoute: Routes = [
    {
        path: 'application-transaction/:id/delete',
        component: ApplicationTransactionDeletePopupComponent,
        resolve: {
            applicationTransaction: ApplicationTransactionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'ApplicationTransactions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
