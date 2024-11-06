import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CityService } from './city.service';
import { CommonModule } from '@angular/common';

interface City {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CityService],
})
export class AppComponent implements OnInit {
  cities: City[] = [];
  newCityName = '';
  filterText = '';
  errorMessage = '';

  constructor(private cityService: CityService) {}

  ngOnInit(): void {
    this.loadCities();
  }

  loadCities(): void {
    this.cityService.getCities().subscribe((cities) => {
      this.cities = cities;
    });
  }

  addCity(): void {
    if (this.newCityName.trim()) {
      this.cityService.addCity(this.newCityName).subscribe((response) => {
        if (response.success) {
          this.errorMessage = '';
          this.loadCities();
          this.newCityName = '';
        } else {
          this.errorMessage = response.message;
        }
      });
    }
  }

  deleteCity(cityName: string): void {
    this.cityService.deleteCity(cityName).subscribe((response) => {
      if (response.success) {
        this.loadCities();
      } else {
        this.errorMessage = response.message;
      }
    });
  }

  filterCities(): void {
    this.cityService
      .filterCities(this.filterText)
      .subscribe((filteredCities) => {
        this.cities = filteredCities;
      });
  }
}
