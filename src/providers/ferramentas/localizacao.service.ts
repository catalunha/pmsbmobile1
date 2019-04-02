import { Injectable, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

@Injectable()
export class LocalizacaoService {

  private watch: any;

  constructor(private geolocation: Geolocation,
    public zone: NgZone) { }

  startGPS(coordenadas: any) {
    let options = {
      frequency: 2000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      this.zone.run(() => {
        coordenadas.latitude = position.coords.latitude;
        coordenadas.longitude = position.coords.longitude;
      });
    });
  }

  stopGPS(){
    this.watch.unsubscribe();
  }

  getLocalizacao(latitude, longitude): string{
    return "Latitude: " + latitude + "\n" + "Longitude: " + longitude;
  }
}
