import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CityService} from './../../services/city.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

export interface CityData {
  city: string;
  start_date: string;
  end_date: string;
  price: number;
  status: string;
  color: string;
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit, AfterViewInit{
  title = 'frontend';
  cityList: MatTableDataSource<CityData>;
  length: number;
  pageEvent: PageEvent;
  filter: any;

  displayedColumns: any = ['city', 'start_date', 'end_date', 'price', 'status', 'color', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  pageIndex: number;
  pageSize: number;


  constructor(private cityService: CityService, private snackBar: MatSnackBar,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getCityList(this.paginator);
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0;
      this.pageIndex = 0;
      this.getCityList(this.paginator);
    });
  }

  getCityList(event?: any, filter?: any) {
    const opts = {};
    if (event) {
      if (event.pageSize) {
        const pageSize = 'page_size';
        opts[pageSize] = event.pageSize;
      }
      if (event.pageIndex) {
        const pageNo = 'page_no';
        opts[pageNo] = event.pageIndex;
      }
    }

    if (this.sort && this.sort.active) {
      const sortBy = 'sort_by';
      opts[sortBy] = this.sort.active;
      const sortOrder = 'sort_order';
      opts[sortOrder] = (this.sort.direction && this.sort.direction === 'desc') ? -1 : 1;
    }

    if (filter) {
      if (typeof filter === 'object') {
        const filterKey = 'filter';
        opts[filterKey] = JSON.stringify(filter);
      }
    }
    this.cityService.getCityList(opts).subscribe((response) => {
      this.cityList = response.result.results;
      this.paginator.length = response.result.total_records;
      this.cityList.paginator = this.paginator;
      this.cityList.sort = this.sort;
      this.length = response.result.total_records;
      // this.pageIndex = response.result.current_page_number;
      // this.pageSize = response.result.results.length;
    }, error => {
      this.snackBar.open(error.message, 'OK', {
        duration: 2000,
      });
    });
    return event;
  }

  public pageChange(event: PageEvent) {
    this.getCityList(event);
    return event;
  }

  viewCity(city: any) {
    this.router.navigate(['/city-detail', city._id]);
  }

  deleteCity(city: any, event?: Event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cityService.deleteCity(city._id).subscribe((response) => {
          this.getCityList(this.paginator);
          this.snackBar.open(response.message, 'OK', {
            duration: 2000,
          });
        }, error => {
          this.snackBar.open(error.message, 'OK', {
            duration: 2000,
          });
        });
      }
    });
  }

  addCity() {
    this.router.navigate(['/city-detail']);
  }

  openFilter(event: Event) {
    const dialogRef = this.dialog.open(FilterDialogComponent, {data: this.filter});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let filter = {};
        if (result.start_date && result.end_date) {
          const startDate = 'start_date';
          const endDate = 'end_date';
          filter[startDate] = moment(result.start_date).format('YYYY-MM-DD');
          filter[endDate] = moment(result.end_date).format('YYYY-MM-DD');
          this.filter = filter;
        }
        this.getCityList(this.paginator, filter);
      }
    });
  }

  clear() {
    this.filter = undefined;
    this.getCityList(this.paginator);
  }
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialogComponent {}

@Component({
  selector: 'app-filter-dialog',
  templateUrl: 'filter-dialog.html',
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
