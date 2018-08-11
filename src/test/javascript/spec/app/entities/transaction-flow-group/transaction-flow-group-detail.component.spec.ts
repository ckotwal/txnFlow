/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowGroupDetailComponent } from 'app/entities/transaction-flow-group/transaction-flow-group-detail.component';
import { TransactionFlowGroup } from 'app/shared/model/transaction-flow-group.model';

describe('Component Tests', () => {
    describe('TransactionFlowGroup Management Detail Component', () => {
        let comp: TransactionFlowGroupDetailComponent;
        let fixture: ComponentFixture<TransactionFlowGroupDetailComponent>;
        const route = ({ data: of({ transactionFlowGroup: new TransactionFlowGroup(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowGroupDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TransactionFlowGroupDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionFlowGroupDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.transactionFlowGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
