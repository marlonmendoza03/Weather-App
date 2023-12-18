import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationData } from '../models/location.model';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  locationData: LocationData = <LocationData>{};
  geolocationApiUrl: string = 'http://api.openweathermap.org/geo/1.0/reverse';
  apiKey: string = 'JYLM2SE2XH26WBHJKJUTX78XQ';
  constructor(private http: HttpClient) { }

  getLocation(latitude: number, longitude: number):Observable<LocationData>{
    return this.http.get<LocationData>(this.geolocationApiUrl, {
      params: new HttpParams()
      .set('lat', latitude.toString())
      .set('lon', longitude.toString())
      .set('limit','1')
      .set('appid',this.apiKey)
    })
  }
}
