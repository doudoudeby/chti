import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared';
import {
    ChtiComponent,
    ChtiDetailComponent,
    ChtiUpdateComponent,
    ChtiDeletePopupComponent,
    ChtiDeleteDialogComponent,
    chtiRoute,
    chtiPopupRoute
} from './';

const ENTITY_STATES = [...chtiRoute, ...chtiPopupRoute];

@NgModule({
    imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ChtiComponent, ChtiDetailComponent, ChtiUpdateComponent, ChtiDeleteDialogComponent, ChtiDeletePopupComponent],
    entryComponents: [ChtiComponent, ChtiUpdateComponent, ChtiDeleteDialogComponent, ChtiDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterSampleApplicationChtiModule {}
