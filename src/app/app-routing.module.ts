import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { CreateComponent } from './layout/create/create.component';
import { UpdateComponent } from './layout/update/update.component';
import { DisableComponent } from './layout/disable/disable.component';

const routes: Routes = [
  { path: '' , component: HomeComponent},
  { path: 'create' , component: CreateComponent},
  { path: 'update/:id', component: UpdateComponent},
  { path: 'disable/:id', component: DisableComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
