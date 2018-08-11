/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowUpdateComponent } from 'app/entities/transaction-flow/transaction-flow-update.component';
import { TransactionFlowService } from 'app/entities/transaction-flow/transaction-flow.service';
import { TransactionFlow } from 'app/shared/model/transaction-flow.model';

describe('Component Tests', () => {
    describe('TransactionFlow Management Update Component', () => {
        let comp: TransactionFlowUpdateComponent;
        let fixture: ComponentFixture<TransactionFlowUpdateComponent>;
        let service: TransactionFlowService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowUpdateComponent]
            })
                .overrideTemplate(TransactionFlowUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionFlowUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransactionFlow(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionFlow = entity;
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
                    const entity = new TransactionFlow();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionFlow = entity;
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
