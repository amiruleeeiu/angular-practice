import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Course } from '../model/course';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnChanges {
  regForm: FormGroup;
  @Input() courseId!: number | null;

  @Output() dataEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.regForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      iconUrl: [''],
      category: [''],
      lessonsCount: ['',[Validators.required]],
      longDescription: [''],
    });
  }

  ngOnChanges() {
    console.log(this.courseId);
    if (this.courseId) {
      this.fetchCourse(this.courseId);
    }
  }

  fetchCourse(courseId: number) {
    this.http
      .get<Course>(`http://localhost:9000/products/${courseId}`)
      .subscribe({
        next: (course: Course) => {
          console.log(course);
          this.regForm.patchValue({
            id: course.id,
            description: course.description,
            iconUrl: course.iconUrl,
            category: course.category,
            lessonsCount: course.lessonsCount,
            longDescription: course.longDescription,
          });
        },
        error: (error) => {
          console.error('Failed to fetch course:', error);
        },
      });
  }

  signUp() {
    this.regForm.markAllAsTouched();
    console.log(this.regForm.value);

    if (this.courseId) {
      this.http
        .put<any>(
          `http://localhost:9000/products/${this.courseId}`,
          this.regForm.value
        )
        .subscribe(
          (response) => {
            console.log('API Response:', response);
            // Handle response here
            // this.regForm.reset();
            this.dataEvent.emit(null);
          },
          (error) => {
            console.error('API Error:', error);
            // Handle error here
          }
        );
    } else {
      this.http
        .post<any>('http://localhost:9000/products', this.regForm.value)
        .subscribe(
          (response) => {
            console.log('API Response:', response);
            // Handle response here
            // this.regForm.reset();
          },
          (error) => {
            console.error('API Error:', error);
            // Handle error here
          }
        );
    }
  }
}
