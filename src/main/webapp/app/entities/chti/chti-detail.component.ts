import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChti } from 'app/shared/model/chti.model';

@Component({
    selector: 'jhi-chti-detail',
    templateUrl: './chti-detail.component.html'
})
export class ChtiDetailComponent implements OnInit {
    chti: IChti;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ chti }) => {
            this.chti = chti;
        });
    }

    previousState() {
        window.history.back();
    }
}
