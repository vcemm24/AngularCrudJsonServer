import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform!:FormGroup;

  constructor(private formBuilder:FormBuilder,private router:Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  login(){
    this.http.get<any>("http://localhost:3000/signup")
    .subscribe(
      res=>{
        const user = res.find((a:any)=>{
          return a.email === this.loginform.value.email && a.password === this.loginform.value.password
        })
        if(user){
          alert("login success");
          this.loginform.reset();
          this.router.navigate(['student']);
        }
        else{
          alert("user not found!")
        }
      },
      err=>{
        alert("something went wrong");
      }

    )
  }

}
