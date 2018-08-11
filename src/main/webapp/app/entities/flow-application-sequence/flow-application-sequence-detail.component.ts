import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

@Component({
    selector: 'jhi-flow-application-sequence-detail',
    templateUrl: './flow-application-sequence-detail.component.html'
})
export class FlowApplicationSequenceDetailComponent implements OnInit {
    flowApplicationSequence: IFlowApplicationSequence;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flowApplicationSequence }) => {
            this.flowApplicationSequence = flowApplicationSequence;
        });
    }

    previousState() {
        window.history.back();
    }
}
