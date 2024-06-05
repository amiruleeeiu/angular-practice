import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { DataService } from '../data.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private service: DataService,
    private ref: MatDialogRef<PopupComponent>,
    private _snackBar: MatSnackBar
  ) {}

  title: string = 'Add';
  editData: any = 0;
  isLoading: boolean = false;
  isLoadingGetById: boolean = false;

  userForm = this.formBuilder.group({
    name: ['', Validators.required],
    weight: [''],
    symbol: [''],
    id: [''],
  });

  onClose(value: boolean) {
    this.ref.close(value);
  }

  onSubmit() {
    console.log(this.userForm);

    if (this.userForm.valid) {
      this.isLoading = true;
    }

    if (this.editData.id > 0) {
      this.editUser(this.userForm.value);
    } else {
      this.saveUser(this.userForm.value);
    }
  }

  saveUser(value: any) {
    this.service.saveService(value).subscribe((res) => {
      this.isLoading = false;
      this.onClose(true);
      this._snackBar.open('Successfully Created', 'Close', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['custom-snackbar'],
      });
    });
  }

  editUser(value: any) {
    this.service.editService(value).subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.onClose(true);
      this._snackBar.open('Successfully Updated', 'Close', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['custom-snackbar'],
      });
    });
  }

  setPopUpData(id: number) {
    this.isLoadingGetById = true;
    this.service.getDataById(id).subscribe((res) => {
      this.editData = res;
      this.userForm.setValue(res);
      this.isLoadingGetById = false;
    });
  }

  ngOnInit(): void {
    // this.title = this.data?.title;

    if (this.data?.id > 0) {
      this.setPopUpData(this.data.id);
      this.title = 'Update';
    }

    console.log(this.userForm.get('name')?.hasError('required'));
  }
}
