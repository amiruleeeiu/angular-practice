import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../model/course';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.css'],
})
export class CourseCardComponent {
  @Input() course!: Course;

  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  handleEdit(id: number): void {
    this.dataEvent.emit(id);
  }
}
