import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers:[
    MoovieProvider
  ],
})
export class FeedPage {

  public obj = {
    title:"Bruno Queiroz",
    data:"November 5, 1955",
    descricao: "Estou criando meu primeiro app em Ionic.",
    qtd_Likes: 12,
    qtd_Comments: 4,
    time_Comments: "11h ago",
    img_post:""
  }
  public lista_filmes = new Array<any>();

  public nome_usuario:string = "Bruno G. Queiroz"

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider : MoovieProvider
    ) {
  }

  ionViewDidLoad() {  
    this.movieProvider.getPopularMovies().subscribe(
      data=>{        
        const response = (data as any);
        this.lista_filmes = response.results;                                                      
      }, error=>{
        console.log(error);
      }
    )
  }

}
