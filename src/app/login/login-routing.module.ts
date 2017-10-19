import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';

import { HomeComponent } from '../home/home.component';
import { HomeModule } from '../home/home.module';

import { AuthService } from '../shared/auth.service';
import { AuthGuard } from '../shared/auth-guard.service';

const loginRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  }
];

@NgModule({
  imports: [

    CommonModule,
    RouterModule.forChild(loginRoutes)
  ],
  declarations: [
  ],
  providers: [ AuthService, AuthGuard ],
  exports: [
    RouterModule
  ]
})

export class LoginRoutingModule {}
