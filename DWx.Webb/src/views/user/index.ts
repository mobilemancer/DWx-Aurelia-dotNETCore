import { ExpectedResponseType } from './../../enums/expectedResponseType';
import { autoinject } from 'aurelia-dependency-injection';
import { Network, NetworkResponse } from './../../utils/network';
import { TokenType } from "../../enums/tokenType";

const GRAPH_ME = "https://graph.microsoft.com/v1.0/me";
const GRAPH_ME_PHOTO_VALUE = "https://graph.microsoft.com/v1.0/me/photo/$value";

@autoinject()
export class Index {
    public destination: HTMLElement;
    public profilePicture: HTMLImageElement;

    constructor(private network: Network) { }

    async attached() {
        let response: NetworkResponse =
            await this.network.request(GRAPH_ME, { headers: {} }, TokenType.access_token);

        let picture: NetworkResponse =
            await this.network.request(GRAPH_ME_PHOTO_VALUE, { headers: {} }, TokenType.access_token, ExpectedResponseType[ExpectedResponseType.blob]);
        if (picture.ok && picture.hasData) {
            this.profilePicture.src = URL.createObjectURL(picture.data);
        }

    }

}