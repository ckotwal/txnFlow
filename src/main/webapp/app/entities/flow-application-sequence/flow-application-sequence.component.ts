import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';
import { Principal } from 'app/core';
import { FlowApplicationSequenceService } from './flow-application-sequence.service';

@Component({
    selector: 'jhi-flow-application-sequence',
    templateUrl: './flow-application-sequence.component.html'
})
export class FlowApplicationSequenceComponent implements OnInit, OnDestroy {
    flowApplicationSequences: IFlowApplicationSequence[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private flowApplicationSequenceService: FlowApplicationSequenceService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.flowApplicationSequenceService.query().subscribe(
            (res: HttpResponse<IFlowApplicationSequence[]>) => {
                this.flowApplicationSequences = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlowApplicationSequences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlowApplicationSequence) {
        return item.id;
    }

    registerChangeInFlowApplicationSequences() {
        this.eventSubscriber = this.eventManager.subscribe('flowApplicationSequenceListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
