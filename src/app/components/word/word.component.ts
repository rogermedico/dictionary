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

  constructor(private ws: WordsService, private ar: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const word = this.ar.snapshot.paramMap.get('word');

    this.ws.getWord(word).subscribe(word => {
      if (!word) return this.router.navigateByUrl('/');
      else this.word = word;
      console.log(word);
    })
  }

}
