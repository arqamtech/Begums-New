import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Slides } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-s-promotions',
  templateUrl: 's-promotions.html',
})
export class SPromotionsPage {
  @ViewChild(Slides) slides: Slides;

  Users: Array<any> = [];
  UsersLoaded: Array<any> = [];

  searchBar: string = '';


  selArray: Array<any> = [];
  mess: string = '';


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public http: HttpClient,
    public modalController: ModalController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(false);
    this.getUsers();
  }

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }


  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Getting Users...'
    });
    loading.present();


    this.db.list("Users").snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;
        tempArray.push(temp);
      })
      this.Users = tempArray;
      this.UsersLoaded = tempArray;
      loading.dismiss();
    })
  }

  initializeItems(): void {
    this.Users = this.UsersLoaded;
  }
  getItems(searchbar) {
    this.initializeItems();
    let q = searchbar;
    if (!q) {
      return;
    }
    this.Users = this.Users.filter((v) => {
      if ((v.Name) && q) {
        if (v.Name.toLowerCase().indexOf(q.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }


  addToArr(a) {
    switch (a.Checked) {
      case true: this.selArray.push(a.Phone);
        break;
      case false: this.rmFrmArray(a.Phone);
        break;
    }
  }

  rmFrmArray(Phone) {
    var ind = this.selArray.indexOf(Phone);
    this.selArray.splice(ind, 1)
  }


  checkData() {
    if (this.mess) {
      this.sendConfirm();
    }
  }

  sendConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Send Message to selected Clients ?',
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

  gtNextCheck() {
    if (this.selArray.length) {
      this.gtNext();
      console.log(this.selArray);

    } else {
      this.presentToast("Select atleast 1 Client")
    }
  }


  sendSMS() {


    let loading = this.loadingCtrl.create({
      content: 'Sending Messages ...'
    });
    loading.present();


    for (let i = 0; i < this.selArray.length; i++) {
      let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
      let phone = this.selArray[i];
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
    this.mess = '';
    this.presentToast("Message Sent");
    this.navCtrl.pop();
    loading.dismiss();


  }



  addUser() { this.navCtrl.push("AddUsersPage"); }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 4000,
      position: "bottom",
      showCloseButton: false,
    });
    toast.present();
  }



  /*Slides */
  gtNext() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1, 500);
    this.slides.lockSwipes(true);
  }

  gtPrev() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 500);
    this.slides.lockSwipes(true);

  }
  /*Slides End */




}
