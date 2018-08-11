/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionFieldUpdateComponent } from 'app/entities/application-transaction-field/application-transaction-field-update.component';
import { ApplicationTransactionFieldService } from 'app/entities/application-transaction-field/application-transaction-field.service';
import { ApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

describe('Component Tests', () => {
    describe('ApplicationTransactionField Management Update Component', () => {
        let comp: ApplicationTransactionFieldUpdateComponent;
        let fixture: ComponentFixture<ApplicationTransactionFieldUpdateComponent>;
        let service: ApplicationTransactionFieldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionFieldUpdateComponent]
            })
                .overrideTemplate(ApplicationTransactionFieldUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationTransactionFieldUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionFieldService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ApplicationTransactionField(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationTransactionField = entity;
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
                    const entity = new ApplicationTransactionField();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.applicationTransactionField = entity;
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
