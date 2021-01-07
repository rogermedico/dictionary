import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs/operators';
import { Pagination } from 'src/app/models/pagination.interface';
import { SearchResult } from 'src/app/models/searchResult.interface';
import { LastSearchesService } from 'src/app/services/last-searches.service';
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
  pagination: Pagination = {
    page: -1,
    nPages: -1,
    startPage: -1,
    pages: [],
    endPage: -1
  };
  searchTermSubscription: Subscription;
  goToPageSubscription: Subscription;
  randomWordSubscription: Subscription;

  lastSearches: string[];

  constructor(private ws: WordsService, private ls: LastSearchesService) { }

  ngOnInit(): void {
    this.searchTermSubscription = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => {
        if (term.length >= 2) return this.ws.searchWords(term);
        else return of(undefined);
      })
    ).subscribe((searchResult: SearchResult) => {
      if (searchResult) {
        this.words = searchResult.results.data;
        this.nWords = searchResult.results.total;
        this.doPagination(searchResult);
      }
      else {
        this.words = [];
        this.nWords = 0;
      }
    });
    this.lastSearches = this.ls.load();
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
    if (this.searchTermSubscription) this.searchTermSubscription.unsubscribe();
    if (this.randomWordSubscription) this.randomWordSubscription.unsubscribe();
  }

  search(term: string) {
    this.term = term;
    this.searchTerm.next(term);
  }

  goToPage(page: number) {
    this.goToPageSubscription = this.ws.searchWords(this.term, page).subscribe((searchResult: SearchResult) => {
      this.words = searchResult.results.data;
      this.doPagination(searchResult);
    });
  }

  doPagination(searchResult: SearchResult) {
    const maxPages = 5;
    const pagesToBorder = Math.floor(maxPages / 2);

    this.pagination.page = parseInt(searchResult.query.page);
    if (searchResult.results.total > 100) this.pagination.nPages = Math.ceil(searchResult.results.total / 100);
    else this.pagination.nPages = 0;

    /* less pages than the max pages that we want to show */
    if (this.pagination.nPages <= maxPages) {
      this.pagination.startPage = 1;
      this.pagination.pages = [...Array(this.pagination.nPages + 1).keys()].slice(1);
      this.pagination.endPage = this.pagination.nPages;
    }
    /* more pages than the max pages that we want to show */
    else {
      /* actual page near to start */
      if (this.pagination.page <= pagesToBorder) {
        this.pagination.startPage = 1;
        this.pagination.endPage = maxPages;
      }
      /* actual page near to end */
      else if (this.pagination.page + pagesToBorder >= this.pagination.nPages) {
        this.pagination.startPage = this.pagination.nPages - maxPages + 1;
        this.pagination.endPage = this.pagination.nPages;
      }
      /* actual page in the middle */
      else {
        this.pagination.startPage = this.pagination.page - pagesToBorder;
        this.pagination.endPage = this.pagination.page + pagesToBorder;
      }
      this.pagination.pages = [...Array(maxPages).keys()].map(i => this.pagination.startPage + i)
    }
  }

}
