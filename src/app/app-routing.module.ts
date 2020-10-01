import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course/component/course-list/course-list.component';
import { CreateCourseComponent } from './course/component/create-course/create-course.component';


const routes: Routes = [
  {path: 'courses', component: CourseListComponent},
  {path: 'create-course', component: CreateCourseComponent},
  {path: '**', redirectTo: 'courses'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
