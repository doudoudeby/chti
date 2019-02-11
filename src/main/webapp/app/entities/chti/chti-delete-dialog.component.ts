import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChti } from 'app/shared/model/chti.model';
import { ChtiService } from './chti.service';

@Component({
    selector: 'jhi-chti-delete-dialog',
    templateUrl: './chti-delete-dialog.component.html'
})
export class ChtiDeleteDialogComponent {
    chti: IChti;

    constructor(protected chtiService: ChtiService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.chtiService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chtiListModification',
                content: 'Deleted an chti'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chti-delete-popup',
    template: ''
})
export class ChtiDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chti }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ChtiDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.chti = chti;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/chti', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/chti', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
