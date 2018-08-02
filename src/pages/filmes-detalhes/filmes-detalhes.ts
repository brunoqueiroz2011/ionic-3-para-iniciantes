import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmesDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filmes-detalhes',
  templateUrl: 'filmes-detalhes.html',
  providers:[
    MoovieProvider
  ]
})

export class FilmesDetalhesPage {

  public filmes;
  public filmesId;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider : MoovieProvider
    ) 
  {
  }

  ionViewDidEnter() {
    this.filmesId = this.navParams.get("id");
    this.movieProvider.getMoviesDeteils(this.filmesId).subscribe(data=>{
      let retorno = (data as any);      
      console.log(retorno);
      
      this.filmes = retorno;
    },error =>{
      console.log(error);
      
    })
  }

}
