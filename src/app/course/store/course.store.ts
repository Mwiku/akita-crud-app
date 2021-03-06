import { Injectable } from '@angular/core';
import { Course } from '../model/course.model';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';

export interface CourseState extends EntityState<Course, number> {
    areCoursesLoaded: boolean;
}

export function CreateInitialState(): CourseState {
    return {
        areCoursesLoaded: false
    };
}

@Injectable({
    providedIn: 'root'
})

@StoreConfig({name: 'courses'})
export class CourseStore extends EntityStore<CourseState> {
    constructor() {
        super(CreateInitialState());
    }

    public loadCourses(courses: Course[], areCourseLoaded: boolean) {
        this.set(courses);
        this.update(state => ({
            ...state,
            areCourseLoaded
        }));
    }
}