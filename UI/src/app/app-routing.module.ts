import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainDeskComponent } from './main-desk/main-desk.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { HomeComponent } from './home/home.component';
import { GalleryContentsComponent } from './gallery-contents/gallery-contents.component';
import { ImageDetailsComponent } from './image-details/image-details.component';
import { BlogComponent } from './blog/blog.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgetpass', component: ForgetpasswordComponent },
  { path: 'gallery', component: GalleryContentsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'addpost', component: AddPostComponent },
  { path: 'dash', component: UserDashboardComponent },
  { path: 'image/:id', component: ImageDetailsComponent },
  { path: 'resetp', component: ResetpasswordComponent },
  { path: 'contactus', component: ContactusComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
