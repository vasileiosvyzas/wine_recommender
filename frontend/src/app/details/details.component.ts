import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {

	wine$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) { 
  	this.route.params.subscribe( params => this.wine$ = params.id)
  }

  ngOnInit() {
  	this.data.getWine(this.wine$).subscribe(
  		data => this.wine$ = data
  	)
  }

}
