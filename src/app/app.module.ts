import { AfterViewInit, ElementRef, NgModule, ViewChild } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MusicModule } from './music/music.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AudioprocessorService } from './services/audioprocessor/audioprocessor.service';
import { FilterBarComponent } from './search/filter-bar/filter-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule} from '@angular/material/button';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';


@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MusicModule,
    FlexLayoutModule,
    FilterBarComponent,
    MatButtonModule,
    SearchBarComponent,
    AudioPlayerComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ]
})
export class AppModule {}

