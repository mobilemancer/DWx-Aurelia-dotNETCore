import { HttpClient } from 'aurelia-fetch-client';
import { bindable, autoinject } from 'aurelia-framework';

@autoinject
export class DroidsList {
  public header = 'Droids';
  public droids:any;

  constructor(private http: HttpClient) {
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
}