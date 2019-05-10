import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {

  constructor(public _http:HttpClient) { }

  getWeather(country):Observable<any>{
    return this._http.get("https://api.apixu.com/v1/forecast.json?key=8640a16ad27c42c7b9e65800190905&q="+country+"&days=7");
  }
}
