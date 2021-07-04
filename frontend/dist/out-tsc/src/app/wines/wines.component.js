var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
var WinesComponent = /** @class */ (function () {
    function WinesComponent(data) {
        this.data = data;
        this.searchTerms = new Subject();
    }
    // Push a search term into the observable stream.
    WinesComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
    };
    WinesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data.getWines().subscribe(function (data) { return _this.wines$ = data; });
        this.wines$ = this.searchTerms.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300), 
        // ignore new term if same as previous term
        distinctUntilChanged(), 
        // switch to new search observable each time the term changes
        switchMap(function (term) { return _this.data.searchWines(term); })).subscribe(function (data) { return _this.wines$ = data; });
    };
    WinesComponent = __decorate([
        Component({
            selector: 'app-wines',
            templateUrl: './wines.component.html',
            styleUrls: ['./wines.component.scss'],
            providers: [DataService]
        }),
        __metadata("design:paramtypes", [DataService])
    ], WinesComponent);
    return WinesComponent;
}());
export { WinesComponent };
//# sourceMappingURL=wines.component.js.map