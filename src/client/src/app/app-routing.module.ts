import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { IndexedDocumentsComponent } from './components/tabs/indexed-documents/indexed-documents.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'stack', component: IndexedDocumentsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
