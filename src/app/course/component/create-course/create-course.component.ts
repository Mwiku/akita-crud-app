import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CourseStore } from '../../store/course.store';
import { CourseService } from '../../services/course.service';
import { Course } from '../../model/course.model';

import * as uuid from 'uuid'

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {

  createCourseSubscription;

  constructor(private store: CourseStore, private courseService: CourseService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(submittedForm){
    console.log(`${submittedForm.value}`)

    if(submittedForm.invalid){
      return;
    }
    const course: Course = {id: uuid.v4(), name: submittedForm.value.name, description: submittedForm.value.description};
    this.createCourseSubscription = this.courseService.createCourse(course).subscribe(result => {
      this.router.navigateByUrl('/courses');
    });
  }

}
