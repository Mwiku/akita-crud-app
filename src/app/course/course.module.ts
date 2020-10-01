import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { CourseService } from './services/course.service';
import { CourseListComponent } from './component/course-list/course-list.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';

@NgModule({
  declarations: [CourseListComponent, CreateCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  
  providers: [CourseService],
  exports: [CourseListComponent, CreateCourseComponent]
})
export class CourseModule { }
