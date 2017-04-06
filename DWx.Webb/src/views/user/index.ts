import { autoinject } from 'aurelia-dependency-injection';
import { Network, NetworkResponse } from './../../utils/network';
import { TokenType } from "../../enums/tokenType";

@autoinject()
export class Index {
    public destination: HTMLElement;
    public profilePicture: HTMLElement;

    constructor(private network: Network) { }

    async attached() {
        // GET https://graph.microsoft.com/v1.0/me
        let response: NetworkResponse = await this.network.request("https://graph.microsoft.com/v1.0/me", { headers: {} }, TokenType.access_token);
        // if (response.ok && response.hasData) {
        //     this.destination.innerText = response.data;
        // }

        // /me/photo/$value
        let picture: NetworkResponse = await this.network.request("https://graph.microsoft.com/v1.0/me/photo/$value", { headers: {} }, TokenType.access_token);
        // if (picture.ok && picture.hasData) {
        //     this.profilePicture = picture.data;
        // }

    }

}