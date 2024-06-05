import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAngularComponent } from './test-angular.component';

describe('TestAngularComponent', () => {
  let component: TestAngularComponent;
  let fixture: ComponentFixture<TestAngularComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAngularComponent]
    });
    fixture = TestBed.createComponent(TestAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
