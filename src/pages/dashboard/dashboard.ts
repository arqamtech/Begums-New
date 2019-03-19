import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';



@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false);
  }





  gtClients() { this.navCtrl.push("UsersPage"); }
  gtPromotions() { this.navCtrl.push("PromotionPage"); }
  gtPromotionsS() { this.navCtrl.push("SPromotionsPage"); }



  signOutConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Logout ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
    confirm.present();
  }


  signOut() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.setRoot("LoginPage");
      this.presentToast("Signed Out");
    }).catch((error) => {
      console.log(error.message);
    });


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
