import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {
  mess: string = '';
  
  mobile = "7799000591";

  constructor(
    public navCtrl: NavController,
    public http : HttpClient,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
  }









  checkData() {
    if (this.mess) {
      this.sendConfirm();
    }
  }

  sendConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Send Message to all Clients ?',
      buttons: [
        {
          text: 'No, Its a mistake',
          handler: () => {

          }
        },
        {
          text: "Yes, I'm sure",
          handler: () => {
            this.sendSMS();
          }
        }
      ]
    });
    confirm.present();
  }




  sendSMS() {
    firebase.database().ref("Promotions").child("To All").push({
      Message: this.mess,
      TimeStamp: moment().format(),
    }).then(() => {
      this.mess = '';
      this.presentToast("SMS Sent");
    })
    let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=Dad&route=4&mobiles="
    let phone = this.mobile;
    let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=";
    let urr3 = this.mess;
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

