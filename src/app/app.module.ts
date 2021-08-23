import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthHttpInterceptor } from './auth/AuthHttpInterceptor';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    //components (and the stuff) that belong to this module
    AppComponent, LoginComponent, LogoutComponent
  ],
  imports: [
    //other modules whose exported classes are needed by components
    //of this module
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  //creators of services contributed by this module
  providers: [AuthService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true
    }], 
  //the root component or main app view, it hosts all other views
  bootstrap: [AppComponent]
})
export class AppModule { } //subset of declarations that should be visible and usable in components of other modules
