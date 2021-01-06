import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Word } from 'src/app/models/word.interface';
import { WordsService } from 'src/app/services/words.service';

@Component({
  selector: 'app-word',
  templateUrl: './word.component.html',
  styleUrls: ['./word.component.scss']
})
export class WordComponent implements OnInit {

  word: Word;
  pronunciation: string;

  constructor(private ws: WordsService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ar.params.subscribe(params => {
      this.ws.getWord(params.word).subscribe(word => {
        console.log('word', word);
        if (!word) return this.router.navigateByUrl('/');
        else this.word = word;
        if (typeof word.pronunciation === 'string') this.pronunciation = 'string';
        else this.pronunciation = 'object';
      })
    })
  }
}
