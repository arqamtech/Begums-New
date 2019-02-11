import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseCred } from './firebaseCred';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { LoginPage } from '../pages/Auth/login/login';
import { UsersPage } from '../pages/MainPages/users/users';
import { AddUsersPage } from '../pages/Users/add-users/add-users';
import { EditUsersPage } from '../pages/Users/edit-users/edit-users';
import { LoaderPage } from '../pages/Support/loader/loader';
import { FeedbackPage } from '../pages/Feedback/feedback/feedback';
import { StarRatingModule } from 'ionic3-star-rating';
import { HttpClientModule } from '@angular/common/http';
import { PromotionPage } from '../pages/promotion/promotion';
import { SPromotionsPage } from '../pages/s-promotions/s-promotions';


firebase.initializeApp(firebaseCred);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    FeedbackPage,
    LoaderPage,
    PromotionPage,
    SPromotionsPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    StarRatingModule,
    AngularFireModule.initializeApp(firebaseCred),
    AngularFireDatabaseModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UsersPage,
    AddUsersPage,
    EditUsersPage,
    FeedbackPage,
    LoaderPage,
    PromotionPage,
    SPromotionsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
