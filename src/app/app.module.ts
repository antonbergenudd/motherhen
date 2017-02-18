import { NgModule }               from '@angular/core';
import { IonicApp, IonicModule }  from 'ionic-angular';
import { MyApp }                  from './app.component';
import { HttpModule }             from '@angular/http';
import { Storage }                from '@ionic/storage';

import { MapPage }               from '../pages/map/map';
import { HomePage }               from '../pages/home/home';
import { LoginPage }              from '../pages/login/login';

// Modals
import { UsersPage }              from '../pages/users/users';
import { RequestsPage }              from '../pages/requests/requests';

import { UserService }            from './services/users.service';
import { GroupService }            from './services/groups.service';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    UsersPage,
    HomePage,
    LoginPage,
    RequestsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  entryComponents: [
    MyApp,
    MapPage,
    UsersPage,
    HomePage,
    LoginPage,
    RequestsPage
  ],
  providers: [ UserService, GroupService, Storage ],
  bootstrap: [IonicApp]
})
export class AppModule {}
