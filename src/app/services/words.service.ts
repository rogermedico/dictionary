import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RAPID_API } from '../constants/rapid-api.constant';
import { SearchResult } from '../models/searchResult.interface';
import { Word } from '../models/word.interface';

@Injectable({
  providedIn: 'root'
})
export class WordsService {
  constructor(private http: HttpClient) { }

  searchWords(term: string, page: number = 1): Observable<SearchResult | undefined> {
    return this.http.get<SearchResult>(RAPID_API.endpoint + '?letterPattern=%5E' + term + '.*%24&page=' + page).pipe(
      catchError(() => of(undefined))
    );
  }

  getWord(word: string): Observable<Word | undefined> {
    return this.http.get<Word>(RAPID_API.endpoint + word).pipe(
      catchError(() => of(undefined))
    );
  }

  getRandomWord(): Observable<Word | undefined> {
    return this.http.get<Word>(RAPID_API.endpoint + '?frequencymin=6&hasDetails=definitions,examples&random=true').pipe(
      catchError(() => of(undefined))
    );
  }
}
