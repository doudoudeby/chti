/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ChtiComponent } from 'app/entities/chti/chti.component';
import { ChtiService } from 'app/entities/chti/chti.service';
import { Chti } from 'app/shared/model/chti.model';

describe('Component Tests', () => {
    describe('Chti Management Component', () => {
        let comp: ChtiComponent;
        let fixture: ComponentFixture<ChtiComponent>;
        let service: ChtiService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ChtiComponent],
                providers: []
            })
                .overrideTemplate(ChtiComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ChtiComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChtiService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Chti(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.chtis[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
