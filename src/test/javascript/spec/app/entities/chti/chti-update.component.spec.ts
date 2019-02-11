/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ChtiUpdateComponent } from 'app/entities/chti/chti-update.component';
import { ChtiService } from 'app/entities/chti/chti.service';
import { Chti } from 'app/shared/model/chti.model';

describe('Component Tests', () => {
    describe('Chti Management Update Component', () => {
        let comp: ChtiUpdateComponent;
        let fixture: ComponentFixture<ChtiUpdateComponent>;
        let service: ChtiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ChtiUpdateComponent]
            })
                .overrideTemplate(ChtiUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChtiUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChtiService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Chti(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chti = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Chti();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.chti = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
