import { autoinject } from 'aurelia-dependency-injection';
import { Network, NetworkResponse } from './../../utils/network';

@autoinject()
export class Index {
    public destination: HTMLElement;

    constructor(private network: Network) { }

    async attached() {
        // GET https://graph.microsoft.com/v1.0/me
        let response: NetworkResponse = await this.network.request("https://graph.microsoft.com/v1.0/me", { headers: {} });
        if (response.ok && response.hasData) {
            this.destination = response.data;
        }
    }

}