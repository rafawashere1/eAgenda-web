import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { LineLoadingComponent } from './line-loading/line-loading.component';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    NavbarComponent,
    LineLoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    AuthModule
  ],
  exports: [
    NavbarComponent,
    LineLoadingComponent,
    AuthModule
  ]
})
export class CoreModule { }
