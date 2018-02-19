import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";


/**
 * Generated class for the LocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  currentLocation: Array<number>;

  @ViewChild('map') mapRef: ElementRef;
  map:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geo: Geolocation, private platform: Platform, private launchNavigator: LaunchNavigator) {
    this.platform.ready().then(()=>{
      this.geo.getCurrentPosition().then(res=>{
        console.log(res);
        console.log(res.coords.latitude);
        console.log(res.coords.longitude);

        this.currentLocation[0] = res.coords.latitude;
        this.currentLocation[1] = res.coords.longitude;
      }).catch(()=>{
        console.log("Error getting current position!");
      });

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
    console.log(this.mapRef);
    
    //
    this.showMap();
  }

  showMap(){
    //location
    const location = new google.maps.LatLng(-22.898313, -47.015860);

    //map options
    const options = {
      center: location,
      zoom: 15
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarker(location, this.map);
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    })
  }

  navMe(){
    const destination = [-22.898313, -47.015860];

    let options = {
      start: this.currentLocation,
    }
    this.launchNavigator.navigate(destination, options)
  .then(
    success => console.log('Launched navigator'),
    error => console.log('Error launching navigator', error)
  );

  }

}
