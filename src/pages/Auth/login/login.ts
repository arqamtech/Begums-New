import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  mail: string;
  pass: string;

  public user: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    private menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.menuCtrl.enable(false);
  }
  checkData() {
    if (this.mail) {
      if (this.pass) {
        this.login();
      } else {
        this.presentToast("Password Not Provided")
      }
    } else {
      this.presentToast("Email Not Provided")
    }
  }



  login() {
    let loading = this.loadingCtrl.create({
      content: 'Logging In...'
    });
    loading.present();

    firebase.auth().signInWithEmailAndPassword(this.mail, this.pass).catch((e) => {
      var err = e.message;
      this.presentToast(err);
      loading.dismiss();
    }).then(() => {
      firebase.database().ref("Admin Data/Admins").child(firebase.auth().currentUser.uid).child("Last Login").set(moment().format()).then(() => {
        this.navCtrl.setRoot("DashboardPage");
        loading.dismiss();
      })

    })
  }

  notAdmin() {
    firebase.auth().signOut().then(() => {
      this.presentToast("You are not an Admin");
      this.mail = null;
      this.pass = null;
    })
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }

}
