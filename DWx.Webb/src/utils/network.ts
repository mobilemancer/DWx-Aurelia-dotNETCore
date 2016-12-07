import { NetworkResponse } from './network';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class Network {

    constructor(private http: HttpClient) {
        if (http) {
            http.configure(config => {
                config
                    .useStandardConfiguration();
                // .withBaseUrl(baseUrl);
            });
        }
    }

    public async request(endPoint: string, request?: RequestInit): Promise<NetworkResponse> {
        let fetchResponse = await this.http.fetch(endPoint, request);
        let response = this.copyBase(fetchResponse);

        if (fetchResponse.status >= 200 && fetchResponse.status < 300
            && fetchResponse.status !== 204 && fetchResponse.status !== 205) {
            try {
                response.data = await fetchResponse.json();
                response.hasData = true;
            } catch (error) {
                response.hasData = false;
            }
        }

        return response;
    }

    private copyBase(fetchResponse: Response): NetworkResponse {
        let response: NetworkResponse = {
            hasData: false,
            ok: fetchResponse.ok,
            status: fetchResponse.statusText,
            statusCode: fetchResponse.status,
            data: undefined,
            url: fetchResponse.url,
            type: fetchResponse.type
        };

        return response;
    }

    public testObject = {
        copyBase: this.copyBase
    }
}

export interface NetworkResponse {
    hasData: boolean;
    data: any;
    ok: boolean;
    status: string;
    statusCode: number;
    url: string;
    type: string;
}