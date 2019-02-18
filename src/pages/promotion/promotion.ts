import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {
  mess: string = '';

  phones: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public alertCtrl: AlertController,
    public navParams: NavParams
  ) {
    this.getUsers();
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

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Getting Users...'
    });
    loading.present();


    this.db.list(`Users`).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;

        tempArray.push(temp.Phone);
      })
      this.phones = tempArray;
      loading.dismiss();
    })
  }



  sendSMS() {


    let loading = this.loadingCtrl.create({
      content: 'Sending Messages ...'
    });
    loading.present();


    firebase.database().ref("Promotions").child("To All").push({
      Message: this.mess,
      TimeStamp: moment().format(),
    }).then(() => {
      this.mess = '';
      this.presentToast("SMS Sent");
    }).then(()=>{



    for (let i = 0; i < this.phones.length; i++) {
      let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
      let phone = this.phones[i];
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

  })

    loading.dismiss();


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

