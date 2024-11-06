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

  private loadCities(): void {
    const storedCities = localStorage.getItem('cities');
    if (storedCities) {
      this.cities = JSON.parse(storedCities);
    } else {
      this.http.get<City[]>(this.citiesUrl).subscribe((data) => {
        this.cities = data;
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
    this.saveToLocalStorage();
    return of({ success: true, message: 'City added successfully' });
  }

}
