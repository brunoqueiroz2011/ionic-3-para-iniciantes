import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MoovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MoovieProvider {

  private baseApiPath = "https://api.themoviedb.org/3";
  private apiKey = "?api_key=0da7710767120bfcdb988618c134d897"
  public basePathImg = "https://image.tmdb.org/t/p/w300/";


  constructor(public http: HttpClient) {
    console.log('Hello MoovieProvider Provider');
  }

  getLatestMovies(){
    return this.http.get(this.baseApiPath + "/movie/latest"+this.apiKey);
  }

  getPopularMovies(){
    return this.http.get(this.baseApiPath + "/movie/popular"+this.apiKey);
  }

}
