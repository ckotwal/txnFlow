import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionFlow } from 'app/shared/model/transaction-flow.model';
import { TransactionFlowService } from './transaction-flow.service';
import { TransactionFlowComponent } from './transaction-flow.component';
import { TransactionFlowDetailComponent } from './transaction-flow-detail.component';
import { TransactionFlowUpdateComponent } from './transaction-flow-update.component';
import { TransactionFlowDeletePopupComponent } from './transaction-flow-delete-dialog.component';
import { ITransactionFlow } from 'app/shared/model/transaction-flow.model';

@Injectable({ providedIn: 'root' })
export class TransactionFlowResolve implements Resolve<ITransactionFlow> {
    constructor(private service: TransactionFlowService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((transactionFlow: HttpResponse<TransactionFlow>) => transactionFlow.body));
        }
        return of(new TransactionFlow());
    }
}

export const transactionFlowRoute: Routes = [
    {
        path: 'transaction-flow',
        component: TransactionFlowComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow/:id/view',
        component: TransactionFlowDetailComponent,
        resolve: {
            transactionFlow: TransactionFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow/new',
        component: TransactionFlowUpdateComponent,
        resolve: {
            transactionFlow: TransactionFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'transaction-flow/:id/edit',
        component: TransactionFlowUpdateComponent,
        resolve: {
            transactionFlow: TransactionFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlows'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transactionFlowPopupRoute: Routes = [
    {
        path: 'transaction-flow/:id/delete',
        component: TransactionFlowDeletePopupComponent,
        resolve: {
            transactionFlow: TransactionFlowResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TransactionFlows'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
