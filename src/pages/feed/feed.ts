import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmesDetalhesPage } from '../filmes-detalhes/filmes-detalhes';

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

  public loader;

  public refresher;
  public isRefresher : boolean = false;
  public page = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private movieProvider : MoovieProvider,
    public loadingCtrl: LoadingController
    ) {
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando Filmes...",      
    });
    this.loader.present();
  }

  closeLoading(){
    this.loader.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresher = true;

    this.carregandoFilmes();
  }

  
  ionViewDidEnter() {  
    if (this.page == 1) {
      this.carregandoFilmes(); 
    }    
  }

  abrirDetalhes(filmes){
    this.navCtrl.push(FilmesDetalhesPage,{id: filmes.id});
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infiniteScroll = infiniteScroll;
    this.carregandoFilmes(true);        
  }


  carregandoFilmes(newpage :boolean = false){
    this.presentLoading();
    this.movieProvider.getPopularMovies(this.page).subscribe(
      data=>{        
        const response = (data as any);
        
        if (newpage) {
          this.lista_filmes = this.lista_filmes.concat(response.results);
          this.infiniteScroll.complete();
        } else {
          this.lista_filmes = response.results;           
        }        

        this.closeLoading();
        if (this.isRefresher) {
          this.refresher.complete();          
          this.isRefresher = false;
        }
      }, error=>{
        console.log(error);
        this.closeLoading();
        if (this.isRefresher) {
          this.refresher.complete();          
          this.isRefresher = false;
        }
      }
    )
  }

}
