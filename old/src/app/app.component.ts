import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { WordsService } from './services/words.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  title = 'Dictionary';
  randomWordSubscription: Subscription;

  constructor(private ws: WordsService, private router: Router) { }

  ngOnDestroy(): void {
    if (this.randomWordSubscription) this.randomWordSubscription.unsubscribe();
  }

  randomWord() {
    this.randomWordSubscription = this.ws.getRandomWord().subscribe(word => {
      this.router.navigateByUrl('/word/' + word.word);
    });
  }

}
