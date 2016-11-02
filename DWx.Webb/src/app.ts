import { HttpClient } from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';

@autoinject
export class App {
    public message = 'More to come!';
    public header = 'Droids!';
    public droids = [];

    constructor(private http: HttpClient) {
        console.log("Init App.ts");
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:5005/api/droids');
        });
    }

    activate() {
        console.log("Fetching droids");
        return this.http.fetch("")
            .then(response => response.json())
            .then(droids => this.droids = droids);
    }
}