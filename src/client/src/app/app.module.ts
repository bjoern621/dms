import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { HomeComponent } from './components/tabs/home/home.component';
import { IconSnackbarComponent } from './components/shared/icon-snackbar/icon-snackbar.component';
import { DocumentListComponent } from './components/tabs/document-list/document-list.component';
import { HeaderComponent } from './components/core/header/header.component';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from './components/core/sidenav/sidenav.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OverflownClassIfOverflownDirective } from './directives/overflown-class-if-overflown.directive/overflown-class-if-overflown-directive';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    IconSnackbarComponent,
    DocumentListComponent,
    HeaderComponent,
    SidenavComponent,
    OverflownClassIfOverflownDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSnackBarModule,
    MatButtonModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconRegistry: MatIconRegistry) {
    iconRegistry.setDefaultFontSetClass('material-symbols-rounded');
  }
}
