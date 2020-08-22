import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: 'filter-dialog.component.html',
})
export class FilterDialogComponent implements OnInit, AfterViewInit{
  public filterForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.filterForm = new FormGroup({
      start_date: new FormControl(new Date(), [Validators.required]),
      end_date: new FormControl(new Date(), [Validators.required])
    });
  }

  ngAfterViewInit() {
    if(this.data) {
      this.filterForm.setValue(this.data);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.filterForm.controls[controlName].hasError(errorName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
