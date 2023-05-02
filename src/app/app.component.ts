import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordsService } from './services/words.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Dictionary';
  randomWordSubscription!: Subscription;

  constructor(private ws: WordsService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.randomWordSubscription) this.randomWordSubscription.unsubscribe();
  }

  randomWord() {
    this.randomWordSubscription = this.ws.getRandomWord().subscribe(word => {
      if (word) {
        this.router.navigateByUrl('/word/' + word.word);
      }
    });
  }
}
