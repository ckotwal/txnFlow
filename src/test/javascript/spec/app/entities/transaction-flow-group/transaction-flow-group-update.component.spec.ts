/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowGroupUpdateComponent } from 'app/entities/transaction-flow-group/transaction-flow-group-update.component';
import { TransactionFlowGroupService } from 'app/entities/transaction-flow-group/transaction-flow-group.service';
import { TransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

describe('Component Tests', () => {
    describe('TransactionFlowGroup Management Update Component', () => {
        let comp: TransactionFlowGroupUpdateComponent;
        let fixture: ComponentFixture<TransactionFlowGroupUpdateComponent>;
        let service: TransactionFlowGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowGroupUpdateComponent]
            })
                .overrideTemplate(TransactionFlowGroupUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionFlowGroupUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowGroupService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TransactionFlowGroup(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionFlowGroup = entity;
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
                    const entity = new TransactionFlowGroup();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.transactionFlowGroup = entity;
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
