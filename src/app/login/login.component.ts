import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { WhiteSpaceValidator } from '../shared/validators/whiteSpaceValidator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  loginError = '';
  loginForm = new FormGroup ({}); //difiere a lo dispuesto en 7 - 33 - 22:49

  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router) { }
  
  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }

  buildLoginForm():void{
    //set loginForm to a form model containing email and password 
    //fields. to overcome this use group method from formbuilder
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.email, WhiteSpaceValidator.cannotContainSpace]],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50), WhiteSpaceValidator.cannotContainSpace]]
    });
  }
  //function that is called on submit of the form
  //defined in login.component.html when 
  login(submittedForm: FormGroup){
    //calling to login of authservice class to process the input
    //from user through submittedForm (note that it returns an observable then it is a must to suscribe to accomplish the process)
    this.authService.login(submittedForm.value.email, submittedForm.value.password)
    .subscribe(authResponse=>{
      //callback for next handler (the first one)
      //note that coming data (authResponse) from observable is 
      //ignored 
      this.router.navigate(['/home']);
    },/* handler for error notification*/
     error => this.loginError = error);
  }

}
