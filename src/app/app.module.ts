import { NgModule }               from '@angular/core';
import { IonicApp, IonicModule }  from 'ionic-angular';
import { MyApp }                  from './app.component';
import { HttpModule }             from '@angular/http';

import { MapPage }               from '../pages/map/map';
import { HomePage }               from '../pages/home/home';
import { UsersPage }              from '../pages/users/users';

import { UserService }            from './services/users.service';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    UsersPage,
    HomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  entryComponents: [
    MyApp,
    MapPage,
    UsersPage,
    HomePage
  ],
  providers: [ UserService ],
  bootstrap: [IonicApp]
})
export class AppModule {}
