import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, LoadingController, ModalController } from 'ionic-angular';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-add-users',
  templateUrl: 'add-users.html',
})
export class AddUsersPage {

  userLabel = "User's";

  name: string;
  dob: string = '';
  phone: string;


  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public modalController: ModalController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false);
  }


  checkData() {
    if (this.name) {
      if (this.phone) {
        if (this.phone.length == 10) {
          this.addUser();
        } else { this.presentToast("Enter a valid Phonenumber") }
      } else { this.presentToast("Enter" + this.userLabel + "Phonenumber") }
    } else { this.presentToast("Enter" + this.userLabel + "Name") }
  }



  addUser() {
    let loading = this.loadingCtrl.create({
      content: 'Adding Client...'
    });
    loading.present();

    firebase.database().ref("Users").push({
      Name: this.name,
      DOB: this.dob,
      Phone: this.phone,
      TimeStamp: moment().format()
    }).then((res) => {
      firebase.database().ref("Users").child(res.key).once("value", itemSnap => {
        this.presentToast(this.userLabel + " " + "Added")
        loading.dismiss();
        let tt = itemSnap.val();
        tt.key = itemSnap.key;
        tt.LastComment= "Not Available";
        tt.LastRating= "Not Available";
        tt.AverageRatings= "Not Available";
        tt.TotalRatings=0;
        this.navCtrl.pop().then(()=>{
          const modal = this.modalController.create("FeedbackPage", { user: tt })
          modal.present();
        });
      });
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
