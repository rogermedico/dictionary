import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LastSearchesService {

  _searches: string[] = [];
  maxSearches: number = 10;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  load(): string[] {

    if (isPlatformBrowser(this.platformId)) {
      const savedSearches = localStorage.getItem('encyclopediaLastSearches');

      if (savedSearches !== null) {
        const lastSearches = JSON.parse(localStorage.getItem('encyclopediaLastSearches') ?? '');
        this._searches = lastSearches
      } else {
        this._searches = [];
      }
    }

    return this._searches;
  }

  get searches() {
    return this._searches;
  }

  add(search: string) {
    if (!this.load().includes(search)) {
      this._searches.unshift(search)
      if (this._searches.length > this.maxSearches) this._searches.splice(-1, 1);
      if (isPlatformBrowser(this.platformId)) localStorage.setItem('encyclopediaLastSearches', JSON.stringify(this._searches));
    }
  }
}
