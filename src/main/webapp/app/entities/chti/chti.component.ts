import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChti } from 'app/shared/model/chti.model';
import { AccountService } from 'app/core';
import { ChtiService } from './chti.service';

@Component({
    selector: 'jhi-chti',
    templateUrl: './chti.component.html'
})
export class ChtiComponent implements OnInit, OnDestroy {
    chtis: IChti[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected chtiService: ChtiService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.chtiService
            .query()
            .pipe(
                filter((res: HttpResponse<IChti[]>) => res.ok),
                map((res: HttpResponse<IChti[]>) => res.body)
            )
            .subscribe(
                (res: IChti[]) => {
                    this.chtis = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInChtis();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IChti) {
        return item.id;
    }

    registerChangeInChtis() {
        this.eventSubscriber = this.eventManager.subscribe('chtiListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
