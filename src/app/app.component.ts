import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Day, WeatherData } from './models/weather.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  weatherData: WeatherData = <WeatherData>{};
  cityName: string = 'Manila';
  finishedLoading: boolean = false;
  day: Day[] = [];

  constructor(private weatherService: WeatherService){}

  ngOnInit(): void {
    this.getWeatherForecast('Manila');
    this.cityName = '';
  }

  onSubmit(){
    this.finishedLoading = false;
    this.getWeatherForecast(this.cityName);
    this.cityName = '';
  }

  private getWeatherForecast(cityName: string){
    this.weatherService.getCurrentWeatherData(cityName).subscribe(
      response => {
        this.weatherData = response;
        console.log(this.weatherData);
      }
    )
  }
}
