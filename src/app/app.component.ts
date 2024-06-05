import { Component, OnChanges, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'angular-practice';

  courses: any;

  error: any;

  courseId: number | null = null;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchData();

    console.log(this.courseId);
  }

  ngOnChanges(): void {
    this.fetchData();

    console.log(this.courseId);
  }
  onDataReceived(id: number | null): void {
    this.courseId = id;
    console.log(id);

    console.log(this.courseId);
  }

  fetchData(): void {
    this.dataService.getData(``).subscribe({
      next: (res) => (this.courses = res),
      error: (err) => (this.error = err),
    });
  }

  // courses = COURSES;
}
