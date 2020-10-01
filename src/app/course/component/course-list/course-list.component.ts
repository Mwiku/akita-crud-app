import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseQuery } from '../../store/course.query';
import { CourseService } from '../../services/course.service'
import { CourseState } from '../../store/course.store';
import { Course } from '../../model/course.model';
import { Observable, Subscription } from 'rxjs';
import { switchMap, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {
  courseToBeUpdated: Course;
  isUpdateActivated = false;
  listCoursesSubscription: Subscription;
  deleteCourseSubscription: Subscription;
  updateCourseSubscription: Subscription;
  courseState: CourseState;
  
  constructor(private courseService: CourseService, private courseQuery: CourseQuery) { }


  courses$: Observable<Course[]> = this.courseQuery.selectAll();

  ngOnInit(): void {

    this.listCoursesSubscription = this.courseQuery.selectAreCoursesLoaded$.pipe(
      filter(areCoursesLoaded => !areCoursesLoaded),
      switchMap(areCoursesLoaded => {
        if(!areCoursesLoaded) {
          return this.courseService.getAllCourses();
        }
      })
    ).subscribe( result => {});

  }

  deleteCourse(courseId: number) {
    this.deleteCourseSubscription = this.courseService.deleteCourse(courseId).subscribe(result => {
      console.log(result);
    });
  }

  showUpdateForm(course: Course) {
    this.courseToBeUpdated = {...course};
    this.isUpdateActivated = true;
  }

  updateCourse(updateForm) {
    this.updateCourseSubscription = this.courseService.updateCourse(
      this.courseToBeUpdated.id, updateForm.value).subscribe(result => console.log(result)
    );
    this.isUpdateActivated = false;
    this.courseToBeUpdated = null;
  }

  ngOnDestroy() {
    if (this.listCoursesSubscription) {
      this.listCoursesSubscription.unsubscribe();
    }

    if (this.deleteCourseSubscription) {
      this.deleteCourseSubscription.unsubscribe();
    }

    if (this.updateCourseSubscription) {
      this.updateCourseSubscription.unsubscribe();
    }
    
  }

}
