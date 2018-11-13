import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Topnavbar } from "./components/topnavbar/topnavbar.component";
import { Navigation } from "./components/navigation/navigation.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./app.routes";
import { HomeComponent } from "./pages/home/home.component";
import { CheckSalaryComponent } from './pages/check-salary/check-salary.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './service/service.service';

@NgModule({
  declarations: [
    AppComponent,
    Navigation,
    Topnavbar,
    HomeComponent,
    CheckSalaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
