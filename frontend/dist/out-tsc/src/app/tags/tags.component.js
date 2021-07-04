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
var TagsComponent = /** @class */ (function () {
    function TagsComponent() {
        this.availableColors = ['cherry', 'berry', 'plum', 'apple', 'blackberry', 'citrus', 'vanilla', 'pepper',
            'peach', 'raspberry', 'chocolate', 'currant', 'lemon', 'pear', 'orange', 'licorice', 'lime', 'tart',
            'grapefruit', 'coffee', 'melon', 'strawberry', 'honey', 'pineapple', 'apricot', 'jam', 'almond',
            'cranberry', 'herbs', 'blueberry', 'cinnamon', 'mocha', 'mint', 'grape', 'tea', 'cherries', 'pie',
            'prune', 'sage', 'raisin', 'tomato', 'mango', 'nectarine', 'sour', 'berries', 'coconut', 'pomegranate',
            'butter', 'olive', 'bacon', 'mushroom', 'fig', 'thyme', 'butterscotch', 'mousse', 'ginger', 'lychee',
            'bread', 'rhubarb', 'jasmine', 'liqueur', 'truffle', 'yeast', 'nut', 'balsamic', 'hazelnut', 'quince',
            'fennel', 'watermelon', 'dill', 'beer', 'custard', 'guava', 'marmalade', 'pork', 'cardamom'
        ];
    }
    TagsComponent.prototype.ngOnInit = function () {
    };
    TagsComponent = __decorate([
        Component({
            selector: 'app-tags',
            templateUrl: './tags.component.html',
            styleUrls: ['./tags.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TagsComponent);
    return TagsComponent;
}());
export { TagsComponent };
//# sourceMappingURL=tags.component.js.map