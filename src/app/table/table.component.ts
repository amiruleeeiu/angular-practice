import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from '../data.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'action',
  ];
  dataSource = [];
  error = null;

  _page = 1;
  _limit = 5;
  length = 30;

  constructor(
    public dialog: MatDialog,
    private dataService: DataService,
    private _snackBar: MatSnackBar
  ) {}

  addUser() {
    this.openDialog(0, 'Add User');
  }

  editUser(id: number) {
    this.openDialog(id, 'Edit User');
  }
  deleteUser(id: number) {
    this.dataService.deleteService(id).subscribe((res) => {
      this._snackBar.open('Successfully Deleted', 'Close', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['custom-snackbar'],
      });
      this.fetchData(`?_page=${this._page}&_limit=${this._limit}`);
    });
  }

  openDialog(id: number, title: string) {
    const dialogRef = this.dialog.open(PopupComponent, {
      disableClose: true,
      width: '50%',
      data: {
        title,
        id,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);

      if (res) {
        this.fetchData(`?_page=${this._page}&_limit=${this._limit}`);
      }
    });
  }

  ngOnInit(): void {
    this.fetchData(`?_page=${this._page}&_limit=${this._limit}`);
  }

  fetchData(url: string): void {
    this.dataService.getData(url).subscribe({
      next: (res) => (this.dataSource = res),
      error: (err) => (this.error = err),
    });
  }
  pageEvent(event: any) {
    this._limit = event.pageSize;
    this._page = event.pageIndex;
    this.fetchData(`?_page=${this._page}&_limit=${this._limit}`);
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
];
