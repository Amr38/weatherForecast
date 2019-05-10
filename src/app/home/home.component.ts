import { Component, OnInit ,OnDestroy} from '@angular/core';
import { WeatherServiceService} from '../weather-service.service';
import { TrimpipePipe } from '../trimpipe.pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
	,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
	,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
	,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
	,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
	,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
	,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
	,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
	,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
	,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
	,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
	,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
	,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
	,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay"
  ,"Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  
  valueSelected="egypt";
  flag:boolean=false;
  sub1;
  x;
  weatherContainer =[];
  conditionContainer=[];
  forcastContainer=[];
  currentHours;
  weatherCondition;
  tempHours;
  currentMinutes;
  currentCity;
  currentForcast={};
  backgroungImage;
  sunsetHours;
  sunsetMinutes;
  sunriseHours;
  sunriseMinutes
  moonriseTime;
  moonsetTime;
  dummyState;
  dummyImageLastPart;
  dayArray=[];
  constructor( public _weatherService:WeatherServiceService) { 
    this.sub1= _weatherService.getWeather(this.valueSelected).subscribe(x => {
      this.weatherContainer=x.current;
      this.dummyImageLastPart=x.current.condition.text+'.png';
      this.conditionContainer=x.current.condition;
      this.currentCity=x.location.name;
      this.forcastContainer=x.forecast.forecastday;
      this.currentForcast=x.forecast.forecastday[0];
      this.forcastContainer.shift();
      this.sunriseHours=x.forecast.forecastday[0].astro.sunrise.substring(0, 2);
      this.sunriseMinutes=x.forecast.forecastday[0].astro.sunrise.substring(3, 5);
      this.sunsetHours=x.forecast.forecastday[0].astro.sunset.substring(0, 2);
      this.sunsetMinutes=x.forecast.forecastday[0].astro.sunset.substring(3, 5);
      this.currentHours=x.location.localtime.split(" ")[1];
      this.currentMinutes=x.location.localtime.split(" ")[1];
      this.changeState();
      this.flag=true;
      
    });
    
  }


  ngOnInit() {
  }
  ngOnDestroy() {
    this.sub1.unsubscribe();
  }
  search(){
    this.sub1= this._weatherService.getWeather(this.valueSelected).subscribe(x => {
      this.weatherContainer=x.current;
      this.dummyImageLastPart=x.current.condition.text+'.png';
      this.dummyImageLastPart=this.dummyImageLastPart.trimpipe.transform(this.dummyImageLastPart)
      console.log(this.dummyImageLastPart);
    
      this.conditionContainer=x.current.condition;
      this.currentCity=x.location.name;
      this.forcastContainer=x.forecast.forecastday;
      this.currentForcast=x.forecast.forecastday[0];
      this.forcastContainer.shift();
      this.sunriseHours=x.forecast.forecastday[0].astro.sunrise.substring(0, 2);
      this.sunriseMinutes=x.forecast.forecastday[0].astro.sunrise.substring(3, 5);
      this.sunsetHours=x.forecast.forecastday[0].astro.sunset.substring(0, 2);
      this.sunsetMinutes=x.forecast.forecastday[0].astro.sunset.substring(3, 5);
      this.currentHours=x.location.localtime.split(" ")[1];
      this.currentMinutes=x.location.localtime.split(" ")[1];
      this.changeState();
      this.flag=true;
      this.eraseSpaces();
    });
  }
  eraseSpaces(){
  for(let i=0;i<this.dummyImageLastPart.length;i++){
    if(this.dummyImageLastPart.charAt(i)==" "){
      this.dummyImageLastPart.charAt(i).replace(this.dummyImageLastPart.charAt(i),this.dummyImageLastPart.charAt(i+1));
    }

  }
  }
  weekdays(dates:Array<any>){
    let day:Array<string>
    for(let i =0;i<+6;i++){
    this.x=new Date(dates[i].date)
    if(this.x==0){
       day.push("SUN");
    }
    else if(this.x==1){
      day.push("MON");
    }
    else if(this.x==2){
      day.push("TUE");
    }
    else if(this.x==3){
      day.push("WED");
    }
    else if(this.x==4){
      day.push("THU");
    }
    else if(this.x==5){
      day.push("FRI");
    }
    else if(this.x==6){
      day.push("SAT");
    }
  }
  return day;
}
  changeState(){
    if(parseInt(this.currentHours.split(":")[0])-12<0){    //AM
      if(this.sunriseHours-parseInt(this.currentHours.split(":")[0])<0 && this.sunriseMinutes-this.currentMinutes.split(":")[1]){
        this.dummyState="day";
      }
      else{
        this.dummyState="night";
      }
    }
    else if (parseInt(this.currentHours.split(":")[0])-12>=0){  //PM
      this.tempHours=Math.abs(parseInt(this.currentHours.split(":")[0])-12);
      if(this.sunsetHours-this.tempHours<0 && this.sunsetMinutes-this.currentMinutes.split(":")[1]){
        this.dummyState="night";
      }
      else{
        this.dummyState="day";
      }
    }
  }

}
