/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { FlowApplicationSequenceComponent } from 'app/entities/flow-application-sequence/flow-application-sequence.component';
import { FlowApplicationSequenceService } from 'app/entities/flow-application-sequence/flow-application-sequence.service';
import { FlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

describe('Component Tests', () => {
    describe('FlowApplicationSequence Management Component', () => {
        let comp: FlowApplicationSequenceComponent;
        let fixture: ComponentFixture<FlowApplicationSequenceComponent>;
        let service: FlowApplicationSequenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [FlowApplicationSequenceComponent],
                providers: []
            })
                .overrideTemplate(FlowApplicationSequenceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlowApplicationSequenceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlowApplicationSequenceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlowApplicationSequence(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flowApplicationSequences[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
