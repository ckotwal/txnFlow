/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowComponent } from 'app/entities/transaction-flow/transaction-flow.component';
import { TransactionFlowService } from 'app/entities/transaction-flow/transaction-flow.service';
import { TransactionFlow } from 'app/shared/model/transaction-flow.model';

describe('Component Tests', () => {
    describe('TransactionFlow Management Component', () => {
        let comp: TransactionFlowComponent;
        let fixture: ComponentFixture<TransactionFlowComponent>;
        let service: TransactionFlowService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowComponent],
                providers: []
            })
                .overrideTemplate(TransactionFlowComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionFlowComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransactionFlow(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transactionFlows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
