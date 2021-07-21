import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthLocalService {

  users: IUser[];
  KEY_STORAGE = "USERS-LOCAL";

  constructor() { 
    const data = localStorage.getItem(this.KEY_STORAGE);
    if( data ){
      this.users = JSON.parse(data);
    } else {
      this.users = [];
    }
  }

  newRegister( user: IUser ){
    return new Promise((resolve, reject) => {
      const existUser = this.users.find( x => x.userName === user.userName );
      if( existUser ){
        reject("El usuario ya existe.");
      }
      this.users.push({
        id: new Date().getTime(),
        ...user
      })
      localStorage.setItem(this.KEY_STORAGE, JSON.stringify(this.users))
      resolve("El usuario se creo con exito.")
    });
  }

  login(userName: string, password: string ){
    return new Promise((resolve, reject) => {
      const user = this.users.find( x => x.userName === userName );
      if( !user ){
        reject("El usuario no existe. Favor de registrarse");
      } 
      if ( user.password !== password ){
        reject("La contraseña no fue valida. Favor de contactar a soporte");
      }
      resolve("El usuario inicio sesión con éxito.");
    });
  }

}
