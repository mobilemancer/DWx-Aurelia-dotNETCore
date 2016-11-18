import { Router } from 'aurelia-router';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class Delete {
    public droid: any;

    constructor(private http: HttpClient, private router: Router) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:5005/api/droids/');
        });
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.http.fetch(params.id)
            .then(response => response.json())
            .then(droid => this.droid = droid);
    }

    public deleteDroid(): void {
        let request = {
            method: "delete"
        };

        this.http.fetch(this.droid.id.toString(), request).
            then(response => {
                alert("Droid deleted!");
                this.router.navigateToRoute('droids');
            });
    }
}