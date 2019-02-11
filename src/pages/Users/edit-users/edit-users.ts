import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-edit-users',
  templateUrl: 'edit-users.html',
})
export class EditUsersPage {


  userLabel = "User's";

  user = this.navParams.get("user");

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
    this.menuCtrl.enable(true);
  }

  checkData() {
    if (this.user.Name) {
      if (this.user.Phone) {
        if (this.user.Phone.length == 10) {
          this.updateUser();
        } else { this.presentToast("Enter a valid Phonenumber") }
      } else { this.presentToast("Enter" + this.userLabel + "Phonenumber") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }





  updateUser() {
    let loading = this.loadingCtrl.create({
      content: 'Updating Client...'
    });
    loading.present();

    let ke = this.user.key;
    delete this.user.key;

    firebase.database().ref("Users").child(ke).set(this.user).then(() => {
      this.navCtrl.pop().then(() => {
        this.presentToast(this.userLabel + " " + "Updated")
        loading.dismiss();

      });

    })

  }

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
