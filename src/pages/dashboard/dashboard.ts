import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { UsersPage } from '../MainPages/users/users';
import { PromotionPage } from '../promotion/promotion';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public navParams: NavParams
  ) {
    this.menuCtrl.enable(false);
  }





  gtClients() { this.navCtrl.push(UsersPage); }
  gtPromotions() { this.navCtrl.push(PromotionPage); }

}
