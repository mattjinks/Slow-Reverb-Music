import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { Song } from '../models/Song';
import { MusicService } from '../services/music/music.service';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { AudioprocessorService } from '../services/audioprocessor/audioprocessor.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSliderModule,
    MatButtonModule,
    FormsModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule

  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.css'
})
export class AudioPlayerComponent {
  reverbs: String[] = [
    'Transit Center',
    'Steinman Hall',
    'Cranbrook Art Museum',
    'Cliff'
  ];

  speeds: string[] = [
    'normal',
    '0.9',
    '0.8',
    '0.7',
    '0.6',
    '0.5',
  ];
  songs: Song[] = [];
  isPlaying: Boolean = false;
  currentTrack: Song | null = null;
  private subscriptionSource: Subscription | null = null;
  private subscriptionPlaying: Subscription | null = null;

  constructor(
    private musicService: MusicService,
    private audioService: AudioprocessorService,
  ) {}


  ngOnInit() {
    console.log(`Controls View On Init `);
    this.subscriptionSource = this.audioService.getCurrentAudioInfo().subscribe(currentTrackData => {
      this.currentTrack = currentTrackData;
    });

    this.subscriptionPlaying = this.audioService.getSongPlaying().subscribe(isPlaying => {
      this.isPlaying = isPlaying;
    });

  }

  onReverbChange(value: string) {
    if (value === 'Transit Center') {
      value = 'TransitCenter.wav';
    } else if (value === 'Steinman Hall') {
      value = 'SteinmanHall.wav';
    } else if (value === 'Cranbrook Art Museum') {
      value = 'Cranbrook Art Museum.wav';
    } else if (value === 'Cliff') {
      value = 'CliffOfTheDawn.wav'
    }
    this.audioService.loadImpulseResponse(`../assets/audio/${value}`);
    console.log(`Reverb: `, value);
  }

  onSpeedChange(value: string) {
    if (value === 'normal') {
      value = '1';
    }
    this.audioService.setPlaybackRate(Number(value), this.audioService.getCurrentAudioId());
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioService.pauseAudio()
      this.audioService.setSongPlaying(false);
    } else {
      console.log("Play Audio");
      this.audioService.playAudio(this.currentTrack!.file_path);
      this.audioService.setSongPlaying(true);
    }
  }

  onToggleChange(event: MatSlideToggleChange) {
    console.log('Toggle state:', event.checked); // `checked` will be true or false
    if (event.checked) {
      this.reverbOn();
    } else {
      this.reverbOff();
    }
  }

  reverbOn(): void {
    this.audioService.applyReverb(this.audioService.getCurrentAudioId());
  }

  reverbOff(): void {
    this.audioService.removeReverb(this.audioService.getCurrentAudioId());
  }
}
