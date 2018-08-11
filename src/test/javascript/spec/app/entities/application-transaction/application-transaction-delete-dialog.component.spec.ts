/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { ApplicationTransactionDeleteDialogComponent } from 'app/entities/application-transaction/application-transaction-delete-dialog.component';
import { ApplicationTransactionService } from 'app/entities/application-transaction/application-transaction.service';

describe('Component Tests', () => {
    describe('ApplicationTransaction Management Delete Component', () => {
        let comp: ApplicationTransactionDeleteDialogComponent;
        let fixture: ComponentFixture<ApplicationTransactionDeleteDialogComponent>;
        let service: ApplicationTransactionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [ApplicationTransactionDeleteDialogComponent]
            })
                .overrideTemplate(ApplicationTransactionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ApplicationTransactionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ApplicationTransactionService);
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
