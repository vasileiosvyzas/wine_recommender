import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WinesComponent } from './wines/wines.component';
import { DetailsComponent } from './details/details.component'
import { TagsComponent } from './tags/tags.component'

const routes: Routes = [
	{
		path: '',
		component: WinesComponent
	},
	{
		path: 'wines/:id',
		component: DetailsComponent
	},
	{
		path: 'tags',
		component: TagsComponent
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
