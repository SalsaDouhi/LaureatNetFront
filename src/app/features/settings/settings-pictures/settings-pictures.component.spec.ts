import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsPicturesComponent } from './settings-pictures.component';

describe('SettingsPicturesComponent', () => {
  let component: SettingsPicturesComponent;
  let fixture: ComponentFixture<SettingsPicturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsPicturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingsPicturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
