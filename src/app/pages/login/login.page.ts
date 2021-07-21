import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthLocalService } from 'src/app/services/auth-local.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName: string;
  password: string;

  constructor(
    private auth: AuthLocalService,
    private route: ActivatedRoute,
    private toastController: ToastController,
    private router: Router
  ) { 
    this.route.params.subscribe(params => {
      this.userName = params['user'] ? params['user'] : '';
      this.password = params['pass'] ? params['pass'] : '';
    });
  }

  ngOnInit(){

  }

  async viewMessage(message, err = false ){
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: err ? 'danger' : 'dark'
    });
    toast.present();
    await toast.onWillDismiss();
  }

  login(){
    this.auth.login( this.userName, this.password ).then( r => {
      this.viewMessage( r )
      this.router.navigate(['/home']);
    }).catch( er => {
      this.viewMessage( er, true );
    })
  }

}
