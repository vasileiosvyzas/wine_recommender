import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { DataService } from '../data.service';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material';

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  providers: [DataService]
})

export class TagsComponent implements OnInit {
  private searchTerms = new Subject<string>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  visible = true;
  selectable = true;
  removable = true;
  searchable = true;
  addOnBlur = true;
  fruits: Fruit[] = [];
  flavors$: Object
  availableColors: String[] = ['cherry','berry','plum','apple','blackberry','citrus','vanilla','pepper',
  'peach','raspberry','chocolate','currant','lemon','pear','orange','licorice','lime','tart',
  'grapefruit','coffee','melon','strawberry','honey','pineapple','apricot','jam','almond',
  'cranberry','herbs','blueberry','cinnamon','mocha','mint','grape','tea','cherries','pie',
  'prune','sage','raisin','tomato','mango','nectarine','sour','berries','coconut','pomegranate',
  'butter','olive','bacon','mushroom','fig','thyme','butterscotch','mousse','ginger','lychee',
  'bread','rhubarb','jasmine','liqueur','truffle','yeast','nut','balsamic','hazelnut','quince',
  'fennel','watermelon','dill','beer','custard','guava','marmalade','pork','cardamom'
  ];

  constructor(private data: DataService) { }

  search(term: string): void {
    console.log('values:', this.fruits.map(a => a.name).join())
    
    this.searchTerms.next(this.fruits.map(a => a.name).join());
  }

  ngOnInit() {
    this.flavors$ = this.searchTerms.pipe(
		// wait 300ms after each keystroke before considering the term
		debounceTime(100),

		// ignore new term if same as previous term
		distinctUntilChanged(),

		// switch to new search observable each time the term changes
		switchMap((term: string) => this.data.searchFlavors(term)),
		).subscribe(data => this.flavors$ = data[0]);
  }

  getSelectedValues(){
    console.log(this.fruits.map(a => a.name).join())
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  public selectMe(event: any){
    console.log(event)

    // Add our fruit
    if ((event || '').trim()) {
      this.fruits.push({name: event.trim()});
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
}
