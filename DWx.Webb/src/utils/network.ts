import { NetworkResponse } from './network';
import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class Network {

    constructor(private http: HttpClient) {
        http.configure(config => {
            config
                .useStandardConfiguration();
            // .withBaseUrl(baseUrl || 'http://localhost:5005/api/droids');
        });
    }

    public async request(endPoint: string, request?: RequestInit): Promise<NetworkResponse> {
        let response: NetworkResponse = {
            hasData: false,
            ok: false,
            status: "",
            statusCode: 0,
            data: undefined,
            url: undefined,
            type: undefined
        };

        let fetchResponse = await this.http.fetch(endPoint, request);
        response.ok = fetchResponse.ok;
        response.status = fetchResponse.statusText;
        response.statusCode = fetchResponse.status;
        response.url = fetchResponse.url;
        response.type = fetchResponse.type;
        
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