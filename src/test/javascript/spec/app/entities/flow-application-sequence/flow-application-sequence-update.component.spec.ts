/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { FlowApplicationSequenceUpdateComponent } from 'app/entities/flow-application-sequence/flow-application-sequence-update.component';
import { FlowApplicationSequenceService } from 'app/entities/flow-application-sequence/flow-application-sequence.service';
import { FlowApplicationSequence } from 'app/shared/model/flow-application-sequence.model';

describe('Component Tests', () => {
    describe('FlowApplicationSequence Management Update Component', () => {
        let comp: FlowApplicationSequenceUpdateComponent;
        let fixture: ComponentFixture<FlowApplicationSequenceUpdateComponent>;
        let service: FlowApplicationSequenceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [FlowApplicationSequenceUpdateComponent]
            })
                .overrideTemplate(FlowApplicationSequenceUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlowApplicationSequenceUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlowApplicationSequenceService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FlowApplicationSequence(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flowApplicationSequence = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new FlowApplicationSequence();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.flowApplicationSequence = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
