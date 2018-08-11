/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TransactionFlowConfigurationTestModule } from '../../../test.module';
import { TransactionFlowGroupDeleteDialogComponent } from 'app/entities/transaction-flow-group/transaction-flow-group-delete-dialog.component';
import { TransactionFlowGroupService } from 'app/entities/transaction-flow-group/transaction-flow-group.service';

describe('Component Tests', () => {
    describe('TransactionFlowGroup Management Delete Component', () => {
        let comp: TransactionFlowGroupDeleteDialogComponent;
        let fixture: ComponentFixture<TransactionFlowGroupDeleteDialogComponent>;
        let service: TransactionFlowGroupService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TransactionFlowConfigurationTestModule],
                declarations: [TransactionFlowGroupDeleteDialogComponent]
            })
                .overrideTemplate(TransactionFlowGroupDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TransactionFlowGroupDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TransactionFlowGroupService);
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
