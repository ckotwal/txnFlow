/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowDetailComponent } from 'app/entities/transaction-flow/transaction-flow-detail.component';
import { TransactionFlow } from 'app/shared/model/transaction-flow.model';

describe('Component Tests', () => {
    describe('TransactionFlow Management Detail Component', () => {
        let comp: TransactionFlowDetailComponent;
        let fixture: ComponentFixture<TransactionFlowDetailComponent>;
        const route = ({ data: of({ transactionFlow: new TransactionFlow(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransactionFlowDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionFlowDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transactionFlow).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
