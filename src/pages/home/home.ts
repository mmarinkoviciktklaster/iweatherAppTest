import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather:any;
  location:{
    city:string,
    state:string
  }

  constructor(public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage: Storage) {

  }

  ionViewWillEnter(){
       
    this.storage.get('location').then(val => {
      if(val != null){
        this.location = JSON.parse(val);
      } else {

        this.location = {
          city: 'Kragujevac',
          state: 'RS'
        }
      }
    

      this.weatherProvider.getWeather(this.location.state,this.location.city)
      .subscribe(weather => {
        this.weather = weather.current_observation;
      });

    });


  }



}
