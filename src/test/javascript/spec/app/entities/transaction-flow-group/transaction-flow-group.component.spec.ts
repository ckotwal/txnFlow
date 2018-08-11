/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowGroupComponent } from 'app/entities/transaction-flow-group/transaction-flow-group.component';
import { TransactionFlowGroupService } from 'app/entities/transaction-flow-group/transaction-flow-group.service';
import { TransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

describe('Component Tests', () => {
    describe('TransactionFlowGroup Management Component', () => {
        let comp: TransactionFlowGroupComponent;
        let fixture: ComponentFixture<TransactionFlowGroupComponent>;
        let service: TransactionFlowGroupService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowGroupComponent],
                providers: []
            })
                .overrideTemplate(TransactionFlowGroupComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TransactionFlowGroupComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowGroupService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TransactionFlowGroup(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.transactionFlowGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
