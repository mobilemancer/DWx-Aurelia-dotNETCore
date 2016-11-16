import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class Delete {
    public id: number;

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:5005/api/droids/');
        });
    }

    activate(params, routeConfig, $navigationInstruction) {
        this.id = params.id;
    }

    public deleteDroid(): void {

        let request = {
            method: "delete"
        };

        this.http.fetch(this.id.toString(), request).
            then(response => {
                alert(response);
            });

        // .then(response => response.json())
        // .then(droid => this.droid = droid);

    }
}