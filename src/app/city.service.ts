import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface City {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private cities: City[] = [];
  private citiesUrl = 'assets/cities.json';

  constructor(private http: HttpClient) {
    this.loadCities();
  }

  private sortCities(): void {
    this.cities.sort((a, b) => a.name.localeCompare(b.name));
  }

  private loadCities(): void {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      this.cities = JSON.parse(storedCities);
      this.sortCities();
    } else {
      this.http.get<City[]>(this.citiesUrl).subscribe((data) => {
        this.cities = data;
        this.sortCities();
        this.saveToLocalStorage();
      });
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cities', JSON.stringify(this.cities));
  }

  getCities(): Observable<City[]> {
    return of(this.cities);
  }

  addCity(cityName: string): Observable<{ success: boolean; message: string }> {
    const cityExists = this.cities.some(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
    if (cityExists) {
      return of({ success: false, message: 'City already exists' });
    }

    const newCity = { name: cityName };
    this.cities.push(newCity);
    this.sortCities();
    this.saveToLocalStorage();
    return of({ success: true, message: 'City added successfully' });
  }

  deleteCity(
    cityName: string
  ): Observable<{ success: boolean; message: string }> {
    const index = this.cities.findIndex(
      (city) => city.name.toLowerCase() === cityName.toLowerCase()
    );
    if (index > -1) {
      this.cities.splice(index, 1);
      this.sortCities();
      this.saveToLocalStorage();
      return of({ success: true, message: 'City deleted successfully' });
    }
    return of({ success: false, message: 'City not found' });
  }

  filterCities(filter: string): Observable<City[]> {
    const filteredCities = this.cities.filter((city) =>
      city.name.toLowerCase().includes(filter.toLowerCase())
    );
    return of(filteredCities);
  }
}
