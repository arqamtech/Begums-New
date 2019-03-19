import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';



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


    this.db.list("Users", ref => ref.orderByChild("Name")).snapshotChanges().subscribe(snap => {
      let tempArray: Array<any> = [];
      snap.forEach(snip => {
        let temp: any = snip.payload.val();
        temp.key = snip.key;

        temp.nDOB = moment(temp.DOB).format("DDMM")
        if (temp.nDOB == this.td) {



          firebase.database().ref("BDs").child(moment().format("YYYYMMDD")).child(temp.Phone).once("value", snapSHot => {
            if (snapSHot.exists()) {
              console.log("Done for Today");

            } else {



              let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
              let phone = temp.Phone;
              let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=";
              let urr3 = "Dear" + " " + temp.Name + ",\nYour special day is fast approaching and we at Begum's, would love to make it memorable!\n  Avail a 25% discount across our range of services and let the celebration be all about you!";
              let fU = urr1 + phone + urr2 + urr3;
              this.http.get(fU, {
                headers: {
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
                },
              }).subscribe(snip => {
                console.log("messageSent");

                console.log(snip)
              })

              firebase.database().ref("BDs").child(moment().format("YYYYMMDD")).child(temp.Phone).set(true);







            }

          })




        }


        tempArray.push(temp);
      })
      this.Users = tempArray;
      this.UsersLoaded = tempArray;
      loading.dismiss();

    })
    this.sendBirthDayWishes();
  }


  feedback(u) {
    const modal = this.modalController.create("FeedbackPage", { user: u })
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





    // let loading = this.loadingCtrl.create({
    //   content: 'Sending Wishes ...'
    // });
    // loading.present();
    // console.log(this.bdArr.length);

    // for (let i = 0; i < this.bdArr.length; i++) {
    //   console.log(this.bdArr[i]);

    // }
    // loading.dismiss();



    // firebase.database().ref("BDs").child(moment().format("YYYYMMDD")).once("value", snapSHot => {
    //   if (snapSHot.exists()) {
    //     console.log("Done for Today");

    //   } else {






    //     firebase.database().ref("BDs").child(moment().format("YYYYMMDD")).set(true);
    //   }

    // })



    // let loading = this.loadingCtrl.create({
    //   content: 'Sending Wishes ...'
    // });
    // loading.present();


    // firebase.database().ref("Promotions").child("To All").push({
    //   Message: this.mess,
    //   TimeStamp: moment().format(),
    // }).then(() => {
    //   this.mess = '';
    //   this.presentToast("SMS Sent");
    // }) 

    // console.log(this.bdArr);
    // console.log(this.bdArr);
    // if (this.bdArr.length) {

    // this.bdArr.forEach(itemSnap => {
    //   console.log(itemSnap.Name);

    // });
    //   console.log("in if loop");

    //   for(let i=0;i<5;i++){
    //     console.log(this.bdArr);

    //   }
    // }

    // for (let i = 0; i < this.bdArr.length; i++) {
    //   console.log("sending wishes");

    //   console.log(this.bdArr[i]);

    // let urr1 = "http://api.msg91.com/api/sendhttp.php?country=91&sender=BEGUMS&route=4&mobiles="
    // let phone = this.bdArr[i];
    // let urr2 = "&authkey=248515ASS3bXdTM6iH5bf6582b&message=";
    // let urr3 = "Dear" + /*Name*/

    // ",\nYour special day is fast approaching and we at Begum's, would love to make it memorable!\nAvail a 25% discount across our range of services and let the celebration be all about you!";
    // let fU = urr1 + phone + urr2 + urr3;
    // this.http.get(fU, {
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    //   },
    // }).subscribe(snip => {
    //   console.log("messageSent");

    //   console.log(snip)
    // })
    // }
    // loading.dismiss();

  }






  userDetails(u) { this.navCtrl.push("UserDetailsPage", { user: u }); }
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
}
