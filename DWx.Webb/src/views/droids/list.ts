import { Router } from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class List {
  public header = 'Droids';
  public droids: any;

  constructor(private http: HttpClient, private router: Router) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('http://localhost:5005/api/droids');
    });
  }

  activate() {
    return this.http.fetch("")
      .then(response => response.json())
      .then(droids => this.droids = droids);
  }

  // click handlers
  tileClick(droid: any): void {
    // this.router.navigateToRoute('droidInfo', { id: droid.id }, {absolute:true});
    this.router.navigateToRoute('droidInfo', { id: droid.id });
  }
}