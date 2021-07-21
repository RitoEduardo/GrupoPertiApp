import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IMovieDetail, IMovieInfo } from 'src/app/interfaces/movies';
import { TvmazeService } from 'src/app/services/tvmaze.service';

@Component({
  selector: 'app-detail-movie',
  templateUrl: './detail-movie.component.html',
  styleUrls: ['./detail-movie.component.scss'],
})
export class DetailMovieComponent implements OnInit {

  @Input() id: number;
  @Input() name: string;
  @Input() image: any;
  @Input() language: string;
  @Input() summary: string = '';
  @Input() url: string;

  movie: IMovieDetail;

  constructor(
    private modalController: ModalController,
    private tvmaze: TvmazeService
  ) { }

  ngOnInit() {
    // La busqueda por id no funciona
    // this.tvmaze.getById( Number( this.id ) ).subscribe( movie => {
    //   console.log(movie);
    //   this.movie = movie;
    // })
  }

  closedModal(){
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
