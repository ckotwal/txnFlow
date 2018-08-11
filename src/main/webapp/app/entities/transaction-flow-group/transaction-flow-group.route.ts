import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';
import { TransactionFlowGroupService } from './transaction-flow-group.service';
import { TransactionFlowGroupComponent } from './transaction-flow-group.component';
import { TransactionFlowGroupDetailComponent } from './transaction-flow-group-detail.component';
import { TransactionFlowGroupUpdateComponent } from './transaction-flow-group-update.component';
import { TransactionFlowGroupDeletePopupComponent } from './transaction-flow-group-delete-dialog.component';
import { ITransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

@Injectable({ providedIn: 'root' })
export class TransactionFlowGroupResolve implements Resolve<ITransactionFlowGroup> {
    constructor(private service: TransactionFlowGroupService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transactionFlowGroup: HttpResponse<TransactionFlowGroup>) => transactionFlowGroup.body));
        }
        return of(new TransactionFlowGroup());
    }
}

export const transactionFlowGroupRoute: Routes = [
    {
        path: 'transaction-flow-group',
        component: TransactionFlowGroupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlowGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow-group/:id/view',
        component: TransactionFlowGroupDetailComponent,
        resolve: {
            transactionFlowGroup: TransactionFlowGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlowGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow-group/new',
        component: TransactionFlowGroupUpdateComponent,
        resolve: {
            transactionFlowGroup: TransactionFlowGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlowGroups'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow-group/:id/edit',
        component: TransactionFlowGroupUpdateComponent,
        resolve: {
            transactionFlowGroup: TransactionFlowGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlowGroups'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionFlowGroupPopupRoute: Routes = [
    {
        path: 'transaction-flow-group/:id/delete',
        component: TransactionFlowGroupDeletePopupComponent,
        resolve: {
            transactionFlowGroup: TransactionFlowGroupResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlowGroups'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
