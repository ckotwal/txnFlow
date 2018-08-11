import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';
import { FlowApplicationSequenceService } from './flow-application-sequence.service';
import { FlowApplicationSequenceComponent } from './flow-application-sequence.component';
import { FlowApplicationSequenceDetailComponent } from './flow-application-sequence-detail.component';
import { FlowApplicationSequenceUpdateComponent } from './flow-application-sequence-update.component';
import { FlowApplicationSequenceDeletePopupComponent } from './flow-application-sequence-delete-dialog.component';
import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

@Injectable({ providedIn: 'root' })
export class FlowApplicationSequenceResolve implements Resolve<IFlowApplicationSequence> {
    constructor(private service: FlowApplicationSequenceService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service
                .find(id)
                .pipe(map((flowApplicationSequence: HttpResponse<FlowApplicationSequence>) => flowApplicationSequence.body));
        }
        return of(new FlowApplicationSequence());
    }
}

export const flowApplicationSequenceRoute: Routes = [
    {
        path: 'flow-application-sequence',
        component: FlowApplicationSequenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlowApplicationSequences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flow-application-sequence/:id/view',
        component: FlowApplicationSequenceDetailComponent,
        resolve: {
            flowApplicationSequence: FlowApplicationSequenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlowApplicationSequences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flow-application-sequence/new',
        component: FlowApplicationSequenceUpdateComponent,
        resolve: {
            flowApplicationSequence: FlowApplicationSequenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlowApplicationSequences'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flow-application-sequence/:id/edit',
        component: FlowApplicationSequenceUpdateComponent,
        resolve: {
            flowApplicationSequence: FlowApplicationSequenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlowApplicationSequences'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flowApplicationSequencePopupRoute: Routes = [
    {
        path: 'flow-application-sequence/:id/delete',
        component: FlowApplicationSequenceDeletePopupComponent,
        resolve: {
            flowApplicationSequence: FlowApplicationSequenceResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlowApplicationSequences'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
