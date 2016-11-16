import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class Detail {
    public id: number;
    public droid: any;

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://localhost:5005/api/droids/');
        });
    }


    activate(params, routeConfig, $navigationInstruction) {
        this.id = params.id;

        return this.http.fetch(this.id.toString())
            .then(response => response.json())
            .then(droid => this.droid = droid);

    }
}