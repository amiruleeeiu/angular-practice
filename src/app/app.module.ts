import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCourseComponent } from './add-course/add-course.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { PopupComponent } from './popup/popup.component';
import { TableComponent } from './table/table.component';
import { TestAngularComponent } from './test-angular/test-angular.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    CourseCardComponent,
    AddCourseComponent,
    CartComponent,
    TestAngularComponent,
    PopupComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
