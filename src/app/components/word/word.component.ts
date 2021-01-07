import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Word } from 'src/app/models/word.interface';
import { LastSearchesService } from 'src/app/services/last-searches.service';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit, OnDestroy {

  word: Word;
  pronunciation: string;
  activatedRouteSubscription: Subscription;
  getWordSubscription: Subscription;
  getRandomWordSubscription: Subscription;


  constructor(private ws: WordsService, private ls: LastSearchesService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.ar.params.subscribe(params => {
      this.getWordSubscription = this.ws.getWord(params.word).subscribe(word => {
        if (!word) return this.router.navigateByUrl('/');
        //console.log('Word: ', word);
        this.word = word;
        this.ls.add(word.word);
        if (typeof word.pronunciation === 'string') this.pronunciation = 'string';
        else this.pronunciation = 'object';
      })
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.getWordSubscription.unsubscribe();
    //if (this.getRandomWordSubscription) this.getRandomWordSubscription.unsubscribe();
  }

  randomWord() {
    this.getRandomWordSubscription = this.ws.getRandomWord().subscribe(word => {
      // this.word = word;
      this.router.navigateByUrl('/word/' + word.word);
    });

  }

}
