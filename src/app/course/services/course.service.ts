import { Injectable } from '@angular/core';
import { CourseStore, CourseState } from '../store/course.store';
import { EntityStore, EntityState } from '@datorama/akita';
import { Course } from '../model/course.model';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()

export class CourseService {
  serverUrl: string = 'http://localhost:3000'

  constructor( private http: HttpClient, private store: CourseStore) { 
  }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.serverUrl}/api/courses`).pipe(
      tap(courses => {
        this.store.loadCourses(courses, true);
      })
    );
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete('/api/courses/' + courseId).pipe(
      tap(result => {
        this.store.remove(courseId);
      })
    );
  }

  createCourse(course: Course): Observable<Course>{
    return this.http.post<Course>(`${this.serverUrl}/api/courses`, course).pipe(
      tap(value => {
        this.store.add([value]);
      })
    )
  }

  updateCourse(courseId: number, course: Course): Observable<any> {
    return this.http.put(`${this.serverUrl}/api/courses/${courseId}`, course).pipe(
      tap(result =>{
        this.store.update(courseId,course);
      })
    );
  }
}
