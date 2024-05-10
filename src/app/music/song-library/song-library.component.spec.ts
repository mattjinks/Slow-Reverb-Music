import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongLibraryComponent } from './song-library.component';

describe('SongLibraryComponent', () => {
  let component: SongLibraryComponent;
  let fixture: ComponentFixture<SongLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SongLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
