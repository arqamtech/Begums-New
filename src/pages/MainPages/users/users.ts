import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { AddUsersPage } from '../../Users/add-users/add-users';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditUsersPage } from '../../Users/edit-users/edit-users';
import { FeedbackPage } from '../../Feedback/feedback/feedback';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  Users: Array<any> = [];
  UsersLoaded: Array<any> = [];

  searchBar: string = '';

  td = moment().format("DDMM");

  bdArr: Array<any> = [];


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public http: HttpClient,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(false);
    this.getUsers();
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

        temp.nDOB = moment(temp.DOB).format("DDMM")
        if (temp.nDOB == this.td) {
          this.bdArr.push(temp.Phone)
        }


        tempArray.push(temp);
      })
      this.Users = tempArray;
      this.UsersLoaded = tempArray;
      loading.dismiss();
    })
    // this.sendBirthDayWishes();
  }


  feedback(u) {
    const modal = this.modalController.create(FeedbackPage, { user: u })
    modal.present();
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

  sendBirthDayWishes() {

    let loading = this.loadingCtrl.create({
      content: 'Sending Wishes ...'
    });
    loading.present();


    // firebase.database().ref("Promotions").child("To All").push({
    //   Message: this.mess,
    //   TimeStamp: moment().format(),
    // }).then(() => {
    //   this.mess = '';
    //   this.presentToast("SMS Sent");
    // }) 

    console.log("sending wishes");
    

    for (let i = 0; i < this.bdArr.length; i++) {
      let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
      let phone = this.bdArr[i];
      let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=";
      let urr3 = "Happy Birthday";
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
    loading.dismiss();

  }






  editUser(u) { this.navCtrl.push(EditUsersPage, { user: u }); }
  addUser() { this.navCtrl.push(AddUsersPage); }

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
