import { Network, NetworkResponse } from './../../utils/network';
import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject
export class List {
  public header = 'Droids';
  public droids: any;

  // constructor(private http: HttpClient, private router: Router) {
  //   http.configure(config => {
  //     config
  //       .useStandardConfiguration()
  //       .withBaseUrl('http://localhost:5005/api/droids');
  //   });
  // }

  constructor(private network: Network, private router: Router) {

  }

  async activate() {
    // return this.http.fetch("")
    //   .then(response => response.json())
    //   .then(droids => this.droids = droids);

    let res: NetworkResponse = await this.network.request("http://localhost:5005/api/droids");
    if (res.status === "OK") {
      this.droids = res.data;
    }
  }

  // click handlers
  tileClick(droid: any): void {
    this.router.navigateToRoute('droidInfo', { id: droid.id });
  }
}