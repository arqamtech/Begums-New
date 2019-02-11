import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { AddUsersPage } from '../../Users/add-users/add-users';
import { AngularFireDatabase } from 'angularfire2/database';
import { EditUsersPage } from '../../Users/edit-users/edit-users';
import { FeedbackPage } from '../../Feedback/feedback/feedback';


@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  Users: Array<any> = [];
  UsersLoaded: Array<any> = [];

  searchBar: string = '';

  // defRef = this.db.list(`Users`, ref => ref.orderByChild("Name").limitToFirst(1));
  // searchRef = this.db.list(`Users`, ref => ref.orderByChild("Name").startAt(this.searchBar).endAt(this.searchBar + "\uf8ff").limitToFirst(1));
  // mainRef;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public modalController: ModalController,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase,
  ) {
    this.menuCtrl.enable(true);
    this.getUsers();
    // this.mainRef = this.defRef;
  }

  getUsers() {

    let loading = this.loadingCtrl.create({
      content: 'Getting Users...'
    });
    loading.present();

    // if (this.searchBar) {
    //   this.mainRef = this.searchRef;
    // } else {
    //   this.mainRef = this.defRef;
    // }





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




  page = 0;
  maximumPages = 3;



  // loadUsers(infiniteScroll?) {
  //   this.httpClient.get(`https://randomuser.me/api/?results=20&page=${this.page}`)
  //   .subscribe(res => {
  //     this.users = this.users.concat(res['results']);
  //     if (infiniteScroll) {
  //       infiniteScroll.complete();
  //     }
  //   })
  // }

  // loadMore(infiniteScroll) {
  //   this.page++;
  //   this.loadUsers(infiniteScroll);

  //   if (this.page === this.maximumPages) {
  //     infiniteScroll.enable(false);
  //   }
  // }



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
