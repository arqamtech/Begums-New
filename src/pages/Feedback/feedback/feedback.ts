import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController, Events } from 'ionic-angular';
import * as firebase from 'firebase';
import { HttpClient } from '@angular/common/http';



@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {

  user = this.navParams.get("user");

  comment: string = '';

  rating: number = 0;


  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public events: Events,
    public viewCtrl: ViewController,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public navParams: NavParams
  ) {
    console.log(this.user);

    events.subscribe('star-rating:changed', (starRating) => {
      this.rating = starRating
    });

  }


  submitRating() {

    let loading = this.loadingCtrl.create({
      content: 'Uploading Feedback...'
    });
    loading.present();
    let avgRating = 0;
    let totR: number = 1;
    if (this.user.TotalRatings) {
      totR = +this.user.TotalRatings + 1;
    }
    if (this.user.AverageRatings) {
      avgRating = ((this.user.AverageRatings * this.user.TotalRatings) + this.rating) / totR;
    } else {
      avgRating = this.rating;
    }

    firebase.database().ref("Users").child(this.user.key).child("LastRating").set(this.rating).then(() => {
      firebase.database().ref("Users").child(this.user.key).child("LastComment").set(this.comment).then(() => {
        firebase.database().ref("Users").child(this.user.key).child("TotalRatings").set(totR).then(() => {
          firebase.database().ref("Users").child(this.user.key).child("AverageRatings").set(avgRating.toString()).then(() => {
            this.sendSMS();
          }).then(() => {
            this.close();
            loading.dismiss();
            this.presentToast("Thank you for your Feedback")
          });
        });
      });
    });
  }

  async sendSMS() {
    let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
    let phone = this.user.Phone;
    let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=";
    let urr3 = "Thank you for your valuable feedback! \n We always look forward to enhancing your experience at Begum's.";
    let fU = urr1 + phone + urr2 + urr3;
    this.http.get(fU, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
      },
    }).subscribe(snip => {
      console.log(snip)
    })
  }

  close() {
    this.viewCtrl.onDidDismiss(() => {
      this.navCtrl.popTo("UsersPage");
    });
    this.viewCtrl.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "middle",
      showCloseButton: false,
    });
    toast.present();
  }
}
