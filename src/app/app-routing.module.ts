import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WordComponent } from './components/word/word.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'word/:word', component: WordComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
