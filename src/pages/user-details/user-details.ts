import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = this.navParams.get("user")


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,

  ) {
    if (!this.user.LastRating) { this.user.LastRating = "Not Available" }
    if (!this.user.LastComment) { this.user.LastComment = "Not Available" }
    if (!this.user.AverageRatings) { this.user.AverageRatings = "Not Available" }
    console.log(this.user);

  }


  editClient() { this.navCtrl.push("EditUsersPage", { user: this.user }) }
  delConfirmUser() {
    let confirm = this.alertCtrl.create({
      title: 'Are you sure you want to Delete Client ?',
      message: 'This data cannot be recovered again.',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.delUser();
          }
        }
      ]
    });
    confirm.present();
  }
  delUser() {
    let loading = this.loadingCtrl.create({
      content: 'Deleting Client...'
    });
    loading.present();

    firebase.database().ref("Users").child(this.user.key).remove().then(() => {
      this.navCtrl.pop();
      loading.dismiss();
      this.presentToast(this.user.Name + " " + "deleted");
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
