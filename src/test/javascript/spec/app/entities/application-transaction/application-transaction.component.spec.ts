/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionComponent } from 'app/entities/application-transaction/application-transaction.component';
import { ApplicationTransactionService } from 'app/entities/application-transaction/application-transaction.service';
import { ApplicationTransaction } from 'app/shared/model/application-transaction.model';

describe('Component Tests', () => {
    describe('ApplicationTransaction Management Component', () => {
        let comp: ApplicationTransactionComponent;
        let fixture: ComponentFixture<ApplicationTransactionComponent>;
        let service: ApplicationTransactionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionComponent],
                providers: []
            })
                .overrideTemplate(ApplicationTransactionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ApplicationTransactionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ApplicationTransaction(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.applicationTransactions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
