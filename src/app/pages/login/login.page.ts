import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', {static: true}) slides: IonSlides;

  loginUser = {
    email: 'test1@test.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: 'test2@test.com',
    password: '123456',
    nombre: 'Test 2',
    avatar: 'av-1.png'
  };


  constructor( private usuarioSerice: UsuarioService,
               private navCtrl: NavController,
               private uiService: UiServiceService ) { }

  ngOnInit() {
    this.slides.lockSwipes( true );
  }

  async login( fLogin: NgForm ){

    if ( fLogin.invalid ) { return; }

    const valido = await this.usuarioSerice.login( this.loginUser.email, this.loginUser.password );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no son correctos
      this.uiService.alertaInformativa('Usuario y contraseña no son correctos.')
    }

    console.log( this.loginUser );

  }

  async registro( fRegistro: NgForm ){

    if ( fRegistro.invalid ) { return; }

    const valido = await this.usuarioSerice.registro( this.registerUser );

    if ( valido ) {
      // navegar al tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
    } else {
      // mostrar alerta de usuario y contraseña no son correctos
      this.uiService.alertaInformativa('El correo electrónico ya existe')
    }

  }

  mostrarRegistro(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(0);
    this.slides.lockSwipes( true );

  }

  mostrarLogin(){
    this.slides.lockSwipes( false );
    this.slides.slideTo(1);
    this.slides.lockSwipes( true );
  }
}
