import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { MainDeskComponent } from './main-desk/main-desk.component';

import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
// import {MatDialogModule} from '@angular/material';

import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import {MyserviceService} from './myservice.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { CookieService } from 'ngx-cookie-service';
//import { NavbarModule, WavesModule } from 'angular-bootstrap-md'
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HomeComponent } from './home/home.component';
import { GalleryContentsComponent } from './gallery-contents/gallery-contents.component';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { GalleryserviceService } from './gallery-contents/galleryservice.service';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { ImagedetailsService } from './image-details/imagedetails.service';
import { AddPostComponent } from './add-post/add-post.component';
import { FileUploadModule } from 'ng2-file-upload';
import { BlogComponent } from './blog/blog.component';
import { UploadpostService } from './add-post/uploadpost.service';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactService } from './contactus/contact.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    MainDeskComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    GalleryContentsComponent,
    ImageDetailsComponent,
    AddPostComponent,
    BlogComponent,
    ForgetpasswordComponent,
    ResetpasswordComponent,
    ContactusComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    FileUploadModule
  
  //  FlexLayoutModule
  //  MDBBootstrapModule.forRoot()
  ],
  providers: [ MyserviceService,
    CookieService,GalleryserviceService,ImagedetailsService,UploadpostService,ContactService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
