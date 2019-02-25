import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditUsersPage } from '../Users/edit-users/edit-users';


@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {

  user = this.navParams.get("user")


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    if (!this.user.LastRating) { this.user.LastRating = "Not Available" }
    if (!this.user.LastComment) { this.user.LastComment = "Not Available" }
    if (!this.user.AverageRatings) { this.user.AverageRatings = "Not Available" }
    console.log(this.user);

  }


  editClient() { this.navCtrl.push(EditUsersPage, { user: this.user }) }
}
