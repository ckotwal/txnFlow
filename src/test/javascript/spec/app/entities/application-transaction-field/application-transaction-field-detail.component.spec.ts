/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionFieldDetailComponent } from 'app/entities/application-transaction-field/application-transaction-field-detail.component';
import { ApplicationTransactionField } from 'app/shared/model/application-transaction-field.model';

describe('Component Tests', () => {
    describe('ApplicationTransactionField Management Detail Component', () => {
        let comp: ApplicationTransactionFieldDetailComponent;
        let fixture: ComponentFixture<ApplicationTransactionFieldDetailComponent>;
        const route = ({ data: of({ applicationTransactionField: new ApplicationTransactionField(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionFieldDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ApplicationTransactionFieldDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationTransactionFieldDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.applicationTransactionField).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
