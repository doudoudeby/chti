import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IChti } from 'app/shared/model/chti.model';
import { ChtiService } from './chti.service';

@Component({
    selector: 'jhi-chti-update',
    templateUrl: './chti-update.component.html'
})
export class ChtiUpdateComponent implements OnInit {
    chti: IChti;
    isSaving: boolean;

    constructor(protected chtiService: ChtiService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ chti }) => {
            this.chti = chti;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.chti.id !== undefined) {
            this.subscribeToSaveResponse(this.chtiService.update(this.chti));
        } else {
            this.subscribeToSaveResponse(this.chtiService.create(this.chti));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IChti>>) {
        result.subscribe((res: HttpResponse<IChti>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
