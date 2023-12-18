import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Day, WeatherData } from './models/weather.model';
import { HttpClient } from '@angular/common/http';
import { GeolocationService } from './services/geolocation.service';
import { LocationData } from './models/location.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private weatherService: WeatherService, private locationService: GeolocationService, private changeDetector: ChangeDetectorRef){}

  weatherData: WeatherData = <WeatherData>{};
  locationData: LocationData = <LocationData>{};
  cityName: string = 'Manila';
  finishedLoading: boolean = false;
  day: Day[] = [];
  imgUrl = '../assets/loading.gif';
  showMoreDetails: boolean = true;

  ngOnInit(): void {

    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => 
        this.getLocationInformation(position.coords.latitude, position.coords.longitude)
      );
    }

    this.getWeatherForecast('Manila');
    this.cityName = '';
  }

  getLocationData(position:any){
    console.log(position);
    this.getLocationInformation(position.coords.latitude, position.coords.longitude)
  }

  onSubmit(){
    this.finishedLoading = false;
    this.getWeatherForecast(this.cityName);
    this.cityName = '';
  }

  triggerMoreDetails(){
    this.showMoreDetails = !this.showMoreDetails;
  }

  private getWeatherForecast(cityName: string){
    this.weatherService.getCurrentWeatherData(cityName).subscribe(
      response => {
        this.weatherData = response;
        this.showMoreDetails = false;
        console.log(this.weatherData);
        if(this.weatherData.days[0]?.temp > 25){
            this.imgUrl = '../assets/hotWeatherIcon.png';
        }else{
          this.imgUrl = '../assets/coldWeatherIcon.png';
        }
      }
    )
  }

  private getLocationInformation(latitude: number, longitude: number){
    this.weatherService.getCurrentWeatherDataUsingCoordinates(latitude, longitude).subscribe(
      response => {
        this.weatherData = response;
        this.showMoreDetails = false;
        console.log(response);
      }
    )
  }
}
