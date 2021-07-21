import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthLocalService } from 'src/app/services/auth-local.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { IUser } from 'src/app/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  @ViewChild('passwordEyeRegister', { read: ElementRef }) passwordEye: ElementRef;

  passwordTypeInput  =  'password';

  userName: string;
  password: string;
  name: string;
  dateRegister: String;

  disableFrom = false;

  constructor(
    private auth: AuthLocalService,
    private toastController: ToastController,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.data.getUser().subscribe( r => {
      const user = r.firstUser;
      console.log(user);
      if( user ){
        this.userName = user.login.username;
        this.password = user.login.password;
        this.name = `${ user.name.first } ${ user.name.last }`;
        this.dateRegister = new Date(user.registered.date).toISOString();
        this.disableFrom = false;
      }
      
    })
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

  submitForm(){
    this.disableFrom = true;
    let newUser: IUser;
    newUser = {
      userName: this.userName,
      password: this.password,
      fullName: this.name,
      dateRegister: this.dateRegister.toString()
    }
    this.auth.newRegister( newUser ).then( r => {
      this.viewMessage( r );
      this.router.navigate(['/login', { user: this.userName, pass: this.password }]);
    }).catch( r => {
      this.viewMessage( r , true );
      this.disableFrom = false;
    })
  }

  // código obtenido de: https://stalinmaza97.hashnode.dev/ionic-4-input-password-con-boton-para-mostrarocultar-texto
  togglePasswordMode() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    const nativeEl = this.passwordEye.nativeElement.querySelector('input');
    const inputSelection = nativeEl.selectionStart;
    nativeEl.focus();
    setTimeout(() => {
       nativeEl.setSelectionRange(inputSelection, inputSelection);
    }, 1);
  }
}
