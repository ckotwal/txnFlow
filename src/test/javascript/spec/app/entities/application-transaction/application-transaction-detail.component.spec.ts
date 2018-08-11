/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionDetailComponent } from 'app/entities/application-transaction/application-transaction-detail.component';
import { ApplicationTransaction } from 'app/shared/model/application-transaction.model';

describe('Component Tests', () => {
    describe('ApplicationTransaction Management Detail Component', () => {
        let comp: ApplicationTransactionDetailComponent;
        let fixture: ComponentFixture<ApplicationTransactionDetailComponent>;
        const route = ({ data: of({ applicationTransaction: new ApplicationTransaction(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ApplicationTransactionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationTransactionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.applicationTransaction).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
