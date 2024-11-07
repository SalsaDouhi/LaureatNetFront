import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsSocialmediaComponent } from './settings-socialmedia.component';

describe('SettingsSocialmediaComponent', () => {
  let component: SettingsSocialmediaComponent;
  let fixture: ComponentFixture<SettingsSocialmediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsSocialmediaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsSocialmediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
