import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }
  apiKey: string = 'JYLM2SE2XH26WBHJKJUTX78XQ';
  url: string = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
  unitGroup: string = 'us';
  period: string = 'today';
  weatherData: WeatherData = <WeatherData>{};

   getCurrentWeatherData(cityName: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(this.url+cityName+"/"+this.period,{
        params: new HttpParams()
        .set('unitGroup', this.unitGroup)
        .set('key',this.apiKey)
      });
  }
}
