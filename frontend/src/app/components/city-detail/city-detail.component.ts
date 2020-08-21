import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../../services/city.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as moment from 'moment';
import {ActivatedRoute, Router} from '@angular/router';

export interface CityData {
  city: string;
  start_date: string;
  end_date: string;
  price: number;
  status: string;
  color: string;
}

@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.scss']
})
export class CityDetailComponent implements OnInit {

  city: CityData;
  public cityForm: FormGroup;
  isEdit = false;
  cityId: string;
  color: string;

  constructor(private cityService: CityService, private snackbar: MatSnackBar,
              private activatedRoute: ActivatedRoute, private router: Router) {
    this.city = {
      start_date: '',
      end_date: '',
      price: 10,
      city: '',
      color: '',
      status: ''
    };
  }

  ngOnInit(): void {
    this.cityForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      start_date: new FormControl(new Date(), [Validators.required]),
      end_date: new FormControl(new Date(), [Validators.required]),
      price: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required, Validators.pattern(new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$'))])
    });

    if (this.activatedRoute.snapshot.paramMap.get('cityId')) {
      this.isEdit = true;
      this.cityId = this.activatedRoute.snapshot.paramMap.get('cityId');
      this.getCity(this.cityId);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.cityForm.controls[controlName].hasError(errorName);
  }

  public createCity = (cityFormValue) => {
    if (this.cityForm.valid) {
      this.executeCityCreation(cityFormValue);
    }
  }

  private executeCityCreation = (cityFormValue) => {
    const city: CityData = {
      city: cityFormValue.city,
      start_date: moment(cityFormValue.start_date).parseZone().format('YYYY-MM-DD'),
      end_date: moment(cityFormValue.end_date).parseZone().format('YYYY-MM-DD'),
      price: cityFormValue.price,
      status: cityFormValue.status,
      color: cityFormValue.color
    };

    if (this.isEdit) {
      this.cityService.updateCity(city, this.cityId).subscribe((response) => {
        // this.location.back();
        this.snackbar.open(response.message, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/city']);
      }, error => {
        this.snackbar.open(error.message, 'OK', {
          duration: 2000,
        });
      });
    } else {
      this.cityService.createCity(city).subscribe((response) => {
        // this.location.back();
        this.snackbar.open(response.message, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/city']);
      }, error => {
        this.snackbar.open(error.message, 'OK', {
          duration: 2000,
        });
      });
    }
  }

  public getCity(cityId: string) {
    this.cityService.getCityById(cityId).subscribe((response) => {
      this.city = response.result;
      let cityDetails = JSON.parse(JSON.stringify(response.result));
      delete cityDetails._id;
      delete cityDetails.created_at;
      delete cityDetails.updated_at;
      delete cityDetails.__v;
      this.cityForm.setValue(cityDetails);
      this.color = cityDetails.color;
      this.snackbar.open(response.message, 'OK', {
        duration: 2000,
      });
    }, error => {
      this.snackbar.open(error.message, 'OK', {
        duration: 2000,
      });
    });
  }

  changeColor(event: Event) {
    this.cityForm.patchValue({color: this.color});
  }

  checkIfColorBlack(color: any) {
    if (color) {
      const c = color.substring(1);
      const rgb = parseInt(c, 16);
      // tslint:disable-next-line:no-bitwise
      const r = (rgb >> 16) & 0xff;
      // tslint:disable-next-line:no-bitwise
      const g = (rgb >>  8) & 0xff;
      // tslint:disable-next-line:no-bitwise
      const b = (rgb >>  0) & 0xff;

      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

      if (luma < 60) {
        return true;
      }
    }
    return false;
  }
}

