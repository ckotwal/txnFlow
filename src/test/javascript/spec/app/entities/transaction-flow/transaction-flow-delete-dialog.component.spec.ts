/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowDeleteDialogComponent } from 'app/entities/transaction-flow/transaction-flow-delete-dialog.component';
import { TransactionFlowService } from 'app/entities/transaction-flow/transaction-flow.service';

describe('Component Tests', () => {
    describe('TransactionFlow Management Delete Component', () => {
        let comp: TransactionFlowDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionFlowDeleteDialogComponent>;
        let service: TransactionFlowService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowDeleteDialogComponent]
            })
                .overrideTemplate(TransactionFlowDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionFlowDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowService);
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
