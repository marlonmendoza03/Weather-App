import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Day, WeatherData } from './models/weather.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private weatherService: WeatherService, private changeDetector: ChangeDetectorRef){}

  weatherData: WeatherData = <WeatherData>{};
  cityName: string = 'Manila';
  finishedLoading: boolean = false;
  day: Day[] = [];
  imgUrl = '../assets/loading.gif';
 

  getData$ = this.weatherService.getData(this.cityName);

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
        if(this.weatherData.days[0]?.temp > 25){
            this.imgUrl = '../assets/hotWeatherIcon.png';
        }else{
          this.imgUrl = '../assets/coldWeatherIcon.png';
        }
      }
    )
  }
}
