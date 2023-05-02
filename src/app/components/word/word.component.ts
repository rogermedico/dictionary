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

  word!: Word;
  pronunciation: {all:string|null, noun:string|null;verb:string|null} = {
    all: null,
    noun: null,
    verb: null,
  };
  activatedRouteSubscription!: Subscription;
  getWordSubscription!: Subscription;
  getRandomWordSubscription!: Subscription;


  constructor(private ws: WordsService, private ls: LastSearchesService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRouteSubscription = this.ar.params.subscribe(params => {
      this.getWordSubscription = this.ws.getWord(params['word']).subscribe(word => {
        if (!word) return this.router.navigateByUrl('/');
        this.word = word;
        if (typeof word.pronunciation === 'string') {
          this.pronunciation.all = word.pronunciation;
        }
        if (typeof word.pronunciation === 'object') {
          this.pronunciation.all = word.pronunciation.all;
          this.pronunciation.noun = word.pronunciation.noun ?? null;
          this.pronunciation.verb = word.pronunciation.verb ?? null;
        }
        this.ls.add(word.word);
        return null;
      })
    });
  }

  ngOnDestroy(): void {
    this.activatedRouteSubscription.unsubscribe();
    this.getWordSubscription.unsubscribe();
  }

}
