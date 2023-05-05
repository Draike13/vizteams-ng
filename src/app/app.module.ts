import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamlistComponent } from './teamlist/teamlist.component';
import { MatCardModule } from '@angular/material/card';
import { InfoContainerComponent } from './info-container/info-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamlistComponent,
    InfoContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    CdkAccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
