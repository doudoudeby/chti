/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ChtiDetailComponent } from 'app/entities/chti/chti-detail.component';
import { Chti } from 'app/shared/model/chti.model';

describe('Component Tests', () => {
    describe('Chti Management Detail Component', () => {
        let comp: ChtiDetailComponent;
        let fixture: ComponentFixture<ChtiDetailComponent>;
        const route = ({ data: of({ chti: new Chti(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterSampleApplicationTestModule],
                declarations: [ChtiDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ChtiDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ChtiDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.chti).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
