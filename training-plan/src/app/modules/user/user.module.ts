import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserContainerComponent } from './user-container.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule } from '@abacritt/angularx-social-login';
@NgModule({
  declarations: [
    UserContainerComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    SocialLoginModule
  ],
  providers: [
    
  ]
})
export class UserModule {
  constructor() {
    
  }
}
