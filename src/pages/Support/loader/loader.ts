import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-loader',
  templateUrl: 'loader.html',
})
export class LoaderPage {

  authState: boolean = false;
  dbStat: boolean = false;


  // loading = this.loadingCtrl.create({
  //   spinner: 'crescent',
  //   showBackdrop: false,
  // });

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false);

  }
  ionViewDidEnter(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // this.navCtrl.setRoot(DashboardPage);
      }
      else {
        this.navCtrl.setRoot("LoginPage");
      }
    });

  }

}
