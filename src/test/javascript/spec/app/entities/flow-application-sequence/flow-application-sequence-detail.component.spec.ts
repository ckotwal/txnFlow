/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { FlowApplicationSequenceDetailComponent } from 'app/entities/flow-application-sequence/flow-application-sequence-detail.component';
import { FlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

describe('Component Tests', () => {
    describe('FlowApplicationSequence Management Detail Component', () => {
        let comp: FlowApplicationSequenceDetailComponent;
        let fixture: ComponentFixture<FlowApplicationSequenceDetailComponent>;
        const route = ({ data: of({ flowApplicationSequence: new FlowApplicationSequence(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [FlowApplicationSequenceDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlowApplicationSequenceDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlowApplicationSequenceDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flowApplicationSequence).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
