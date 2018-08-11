/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionUpdateComponent } from 'app/entities/application-transaction/application-transaction-update.component';
import { ApplicationTransactionService } from 'app/entities/application-transaction/application-transaction.service';
import { ApplicationTransaction } from 'app/shared/model/application-transaction.model';

describe('Component Tests', () => {
    describe('ApplicationTransaction Management Update Component', () => {
        let comp: ApplicationTransactionUpdateComponent;
        let fixture: ComponentFixture<ApplicationTransactionUpdateComponent>;
        let service: ApplicationTransactionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionUpdateComponent]
            })
                .overrideTemplate(ApplicationTransactionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationTransactionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ApplicationTransaction(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationTransaction = entity;
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
                    const entity = new ApplicationTransaction();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationTransaction = entity;
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
