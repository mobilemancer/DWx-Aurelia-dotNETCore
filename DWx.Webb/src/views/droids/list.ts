import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Network, NetworkResponse } from './../../utils/network';
import { Router } from 'aurelia-router';

@autoinject
export class List {
  public header = 'Droids';
  public droids: any;


  constructor(private network: Network, private router: Router) { }

  async activate() {
    let response: NetworkResponse = await this.network.request("https://localhost:5044/api/droids");
    if (response.ok && response.hasData) {
      this.droids = response.data;
    }
  }

  // click handlers
  tileClick(droid: any): void {
    this.router.navigateToRoute('droidInfo', { id: droid.id });
  }
}