import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url: string = 'http://localhost:5000/findmywine/api/v1/search?q='

  constructor(private http: HttpClient) {
  }

  
  getWines(){
    return this.http.get('http://localhost:5000/findmywine/api/v1/wines')
  }

  searchWines(term: String){
  	return this.http.get( this.url + term);
  }

  getWine(wineId){
  	return this.http.get('http://localhost:5000/findmywine/api/v1/wines/' + wineId);
  }

  searchFlavors(term: String){
    return this.http.get('http://localhost:5000/findmywine/api/v1/tag_search?q=' + term);
  }

  
}
