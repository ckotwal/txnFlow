/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionFieldComponent } from 'app/entities/application-transaction-field/application-transaction-field.component';
import { ApplicationTransactionFieldService } from 'app/entities/application-transaction-field/application-transaction-field.service';
import { ApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

describe('Component Tests', () => {
    describe('ApplicationTransactionField Management Component', () => {
        let comp: ApplicationTransactionFieldComponent;
        let fixture: ComponentFixture<ApplicationTransactionFieldComponent>;
        let service: ApplicationTransactionFieldService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionFieldComponent],
                providers: []
            })
                .overrideTemplate(ApplicationTransactionFieldComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationTransactionFieldComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionFieldService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ApplicationTransactionField(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.applicationTransactionFields[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
