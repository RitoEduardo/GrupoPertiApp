import { Component } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { IMovieInfo } from '../interfaces/movies';
import { DetailMovieComponent } from '../modals/detail-movie/detail-movie.component';
import { TvmazeService } from '../services/tvmaze.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  timeOut: any;
  loader: any;
  listMovies: IMovieInfo[];
  listAllMovies: IMovieInfo[];

  constructor(
    private tvmaze: TvmazeService,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) {
  }

  async ionViewWillEnter() {
    await this.simpleLoader()
    this.tvmaze.getAll().subscribe( (response) => {
      this.listAllMovies = response.map( r => r );
      this.listMovies = response; // .filter( r => r.image !== null );
      // this.listMovies = response.filter( r => r.image !== null );
      this.dismissLoader();
    })
  }

  onChange( event: any ){
    const val = event.target.value;
    clearInterval(this.timeOut)
    this.timeOut = setTimeout( async ()=>{
      console.log("Ready search");
      await this.simpleLoader()
      if (val && val.trim() !== '' ) {
        this.tvmaze.getByName( val ).subscribe( (response) => {
          console.log(response)
          this.listMovies = response.map( r => r.show );
          this.dismissLoader();
        })
      } else {
        this.dismissLoader();
        this.emptyList();
      }
    }, 1000 );
  }

  async simpleLoader() {
    this.loader = await this.loadingController.create({
        message: 'Cargando...'
    });
    await this.loader.present();
  }

  async dismissLoader() {
    if( this.loader ){
      await this.loader.dismiss();
      this.loader = null;
    }
  }

  emptyList(){
    console.log("Clear");
    this.listMovies = this.listAllMovies.map( r=> r);
  }

  async showDetail( movie: IMovieInfo ){
    console.log("#open modal", movie );
    const modal = await this.modalController.create({
      component: DetailMovieComponent,
      componentProps: {
        id: movie.id,
        name: movie.name,
        image: movie.image,
        language: movie.language,
        summary: movie.summary,
        url: movie.url
      }
    });
    await modal.present();
  }

}
