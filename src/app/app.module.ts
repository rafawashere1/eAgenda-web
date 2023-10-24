import { APP_INITIALIZER, NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CoreModule } from './core/core.module';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { RegistroModule } from './views/registro/registro.module';
import { LoginModule } from './views/login/login.module';
import { AuthService } from './core/auth/services/auth.service';
import { httpTokenInterception } from './core/auth/services/http-token.interceptor';

function logarUsuarioSalvoFactory(authService: AuthService) {
  return () => authService.logarUsuarioSalvo();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),

    CoreModule,
    RegistroModule,
    LoginModule,
    DashboardModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: logarUsuarioSalvoFactory,
      deps: [AuthService],
      multi: true,
    },
    provideHttpClient(withInterceptors([httpTokenInterception]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
