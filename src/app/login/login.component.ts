import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TotalService } from '../total.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  cUser = "user";
  cPwd = "user";
  @Output() enviarSesionData = new EventEmitter<any>();

  alertUser!: string;
  constructor(private router: Router, private serviceData: TotalService) { }

  user = new FormControl('',[Validators.required, Validators.minLength(2)]);
  pwd = new FormControl('',[Validators.required, Validators.minLength(2)]);
  
  

  ngOnInit(): void {
  }

  validar(){
    if(this.user.value == "" || this.pwd.value == ""){
      this.alertUser = "Debe completar los campos";

    }else if(this.user.value == this.cUser && this.pwd.value == this.cPwd){
      this.serviceData.userSesion = this.user.value
      this.router.navigate(['productos']);
    }else{
      this.alertUser = "Usuario o password incorrecto"
    }
  }
}
