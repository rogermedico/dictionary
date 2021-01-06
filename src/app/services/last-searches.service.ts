import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LastSearchesService {

  _searches: string[] = [];
  maxSearches: number = 10;

  constructor() { }

  load(): string[] {
    const lastSearches = JSON.parse(localStorage.getItem('encyclopediaLastSearches'));
    if (lastSearches == null) this._searches = [];
    else this._searches = lastSearches;
    return this._searches;
  }

  get searches() {
    return this._searches;
  }

  add(search: string) {
    if (!this.load().includes(search)) {
      this._searches.unshift(search)
      if (this._searches.length > this.maxSearches) this._searches.splice(-1, 1);
      localStorage.setItem('encyclopediaLastSearches', JSON.stringify(this._searches));
    }
  }
}
