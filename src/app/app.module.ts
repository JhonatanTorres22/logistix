// angular import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/@theme/helpers/error.interceptor';
import { BasicAuthInterceptor } from 'src/app/@theme/helpers/basic-auth.interceptor';

// project import
import { SharedModule } from './demo/shared/shared.module';
import { GuestModule } from './demo/layout/front';
import { ProvidersModule } from './core/Providers/provider.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [AppRoutingModule, SharedModule, BrowserAnimationsModule, BrowserModule, GuestModule, HttpClientModule, ProvidersModule],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ]
})
export class AppModule {}
