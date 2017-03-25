import { StorageService } from './storageService';
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
        var response: any;
        if (!request) {
            request = { headers: {} };
        }
        if (StorageService.GetValue("access_token")) {
            request.headers['Authorization'] = 'Bearer ' + StorageService.GetValue("access_token");
        }

        try {
            var fetchResponse = await this.http.fetch(endPoint, request);
        } catch (error) {
            if (!!error.status) {
                fetchResponse = error;
            } else {
                response = {
                    hasData: undefined,
                    ok: false,
                    statusText: error.message,
                    status: undefined,
                    data: undefined,
                    url: undefined,
                    type: undefined
                };
                return response;
            }
        }

        response = this.copyBase(fetchResponse);

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
            statusText: fetchResponse.statusText.toLowerCase(),
            status: fetchResponse.status,
            data: undefined,
            url: fetchResponse.url,
            type: fetchResponse.type
        };

        return response;
    }

    public __test = {
        copyBase: this.copyBase
    }
}

export interface NetworkResponse {
    hasData: boolean;
    data: any;
    ok: boolean;
    statusText: string;
    status: number;
    url: string;
    type: string;
}