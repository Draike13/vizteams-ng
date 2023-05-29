import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Component } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeamlistComponent } from './teamlist/teamlist.component';
import { MatCardModule } from '@angular/material/card';
import { InfoContainerComponent } from './info-container/info-container.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatDialogModule } from '@angular/material/dialog';
import { SignUpInDialogComponent } from './Dialog/sign-up-in-dialog/sign-up-in-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { AddMemberDialogComponent } from './Dialog/add-member-dialog/add-member-dialog.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AddTeamDialogComponent } from './Dialog/add-team-dialog/add-team-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthInterceptor } from './auth.interceptor';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditTeamDialogComponent } from './Dialog/edit-team-dialog/edit-team-dialog.component';
import { EditMemberDialogComponent } from './Dialog/edit-member-dialog/edit-member-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamlistComponent,
    SignUpInDialogComponent,
    InfoContainerComponent,
    SignInFormComponent,
    AddMemberDialogComponent,
    AddTeamDialogComponent,
    EditTeamDialogComponent,
    EditMemberDialogComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    CdkAccordionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTooltipModule,
    HttpClientModule,
    MatSelectModule,
    MatProgressBarModule,
    DragDropModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
