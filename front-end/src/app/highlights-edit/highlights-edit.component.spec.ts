import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightsEditComponent } from './highlights-edit.component';

describe('HighlightsEditComponent', () => {
	let component: HighlightsEditComponent;
	let fixture: ComponentFixture<HighlightsEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HighlightsEditComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HighlightsEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
