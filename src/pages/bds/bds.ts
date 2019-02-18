import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-bds',
  templateUrl: 'bds.html',
})
export class BdsPage {

  Users: Array<any> = [];
  bdArr: Array<any> = [];

  td = moment().format("DDMM");


  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
    public navParams: NavParams
  ) {
    this.getUsers()
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


        
        temp.DOB = moment(temp.DOB).format("DDMM")
        if (temp.DOB == this.td) {
          this.bdArr.push(temp.Phone)
        }

        tempArray.push(temp);
        console.log(temp);

      })
      console.log(this.bdArr);

      loading.dismiss();
    })
  }


}
