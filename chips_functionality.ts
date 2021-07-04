import {Component} from '@angular/core';
import {MatChipInputEvent} from '@angular/material';
/**
 * @title Stacked chips
 */
export interface Fruit {
  name: string;
}

@Component({
  selector: 'chips-stacked-example',
  templateUrl: 'chips-stacked-example.html',
  styleUrls: ['chips-stacked-example.css'],
})



export class ChipsStackedExample {
  color: string;

  availableColors = [
    { name: 'none', color: '' },
    { name: 'Primary', color: 'primary' },
    { name: 'Accent', color: 'accent' },
    { name: 'Warn', color: 'warn' }
  ];

  fruits: Fruit[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    console.log(value)

    // Add our fruit
    if ((value || '').trim()) {
      this.fruits.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  public selectMe(event: any) {
    event.selected = true;
    console.log(event.name);

    // Add our fruit
    if ((event.name || '').trim()) {
      this.fruits.push({name: event.name.trim()});
    }
  }
}


/**  Copyright 2017 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */