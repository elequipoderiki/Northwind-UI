import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

//decorator to indentify the class AppComponent as component class
@Component({
  //tells angular to create and insert an instance of appComponent in
  //html tag whose name match it
  selector: 'app-root',
  //module-relative address of the component's html (component's html template)
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'northwindweb';
  _displayLogin = false;

  constructor(private authService: AuthService){  
  }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      authStatus => {
        const jwt = this.authService.getToken();
        setTimeout(() => (this._displayLogin = !(jwt == null || jwt === ''),0));
      }
    );
  }

  get displayMenu(){
    return this._displayLogin;
  }
}
