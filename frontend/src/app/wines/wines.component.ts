import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss'],
  providers: [DataService]
})
export class WinesComponent implements OnInit {

  wines$: Object;
  private searchTerms = new Subject<string>();

  constructor(private data: DataService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }


  ngOnInit() { 
  	this.data.getWines().subscribe(
  		data => this.wines$ = data
  	)

  	this.wines$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.data.searchWines(term)),
    ).subscribe(data => this.wines$ = data);

  }
}
