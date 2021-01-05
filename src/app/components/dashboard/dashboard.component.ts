import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { SearchResult } from 'src/app/models/searchResult.interface';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private searchTerm = new Subject<string>();
  term: string;
  words: string[];
  nWords: number;
  page: number;
  nPages: number;
  searchTermSubscription: Subscription;


  constructor(private ws: WordsService) { }

  ngOnInit(): void {
    this.searchTermSubscription = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((term: string) => term.length >= 2),
      switchMap((term: string) => this.ws.searchWords(term))
    ).subscribe((searchResult: SearchResult) => {
      console.log('SearchResult:', searchResult);
      this.words = searchResult.results.data;
      this.nWords = searchResult.results.total;
      this.page = searchResult.query.page;
      if (searchResult.results.total > 100) {
        this.nPages = Math.floor(searchResult.results.total / 100);
        if (searchResult.results.total % 100 !== 0) this.nPages++;
      }
      else {
        this.nPages = 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
  }

  search(term: string) {
    this.term = term;
    this.searchTerm.next(term);
  }

  goToPage(page: any) {
    this.ws.searchWords(this.term, page).subscribe((searchResult: SearchResult) => {
      console.log('SearchResult:', searchResult);
      this.words = searchResult.results.data;
      this.page = searchResult.query.page;
    });
  }

}
