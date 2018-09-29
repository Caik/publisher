import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighligthsComponent } from './highligths.component';

describe('HighligthsComponent', () => {
	let component: HighligthsComponent;
	let fixture: ComponentFixture<HighligthsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HighligthsComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HighligthsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
