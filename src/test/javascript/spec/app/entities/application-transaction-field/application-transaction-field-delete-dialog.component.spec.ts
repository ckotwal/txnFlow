/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionFieldDeleteDialogComponent } from 'app/entities/application-transaction-field/application-transaction-field-delete-dialog.component';
import { ApplicationTransactionFieldService } from 'app/entities/application-transaction-field/application-transaction-field.service';

describe('Component Tests', () => {
    describe('ApplicationTransactionField Management Delete Component', () => {
        let comp: ApplicationTransactionFieldDeleteDialogComponent;
        let fixture: ComponentFixture<ApplicationTransactionFieldDeleteDialogComponent>;
        let service: ApplicationTransactionFieldService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionFieldDeleteDialogComponent]
            })
                .overrideTemplate(ApplicationTransactionFieldDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationTransactionFieldDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionFieldService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
