import { HttpClient } from 'aurelia-fetch-client';
import { Network, NetworkResponse } from "./../../src/utils/network";

var response;

describe('the service', () => {

  it('handles http 200 - ok (without data)', (done) => {
    let url = "http://httpbin.org/status/200";

    let expected: NetworkResponse = {
      hasData: false,
      ok: true,
      statusText: "ok",
      status: 200,
      data: undefined,
      url: url,
      type: "cors"
    };

    new Network(new HttpClient()).request(url).then((response) => {
      expect(response).toEqual(jasmine.objectContaining(expected));
      done();
    });
  });


  it('handles http 200 - ok (with data)', (done) => {
    let url = "http://localhost:5005/api/droids";

    let expected = {
      hasData: true,
      ok: true,
      statusText: "ok",
      status: 200,
      url: url,
      type: "cors"
    };

    new Network(new HttpClient()).request(url).then((response) => {
      expect(response).toEqual(jasmine.objectContaining(expected));
      done();
    });
  });


  // it('handles http 404 - not found', (done) => {
  //   let url = "http://httpbin.org/status/404";

  //   let expected: NetworkResponse = {
  //     hasData: false,
  //     ok: false,
  //     statusText: "not found",
  //     status: 404,
  //     data: undefined,
  //     url: url,
  //     type: "cors"
  //   };

  //   new Network(new HttpClient()).request(url).then((response) => {
  //     expect(response).toEqual(jasmine.objectContaining(expected));
  //     done();
  //   });
  // });


  it('copies base properties', () => {
    let expectedResponse: NetworkResponse = {
      hasData: false,
      ok: true,
      statusText: "ok",
      status: 200,
      data: undefined,
      url: "http://test.com",
      type: "basic"
    };

    let mockResponse = {
      hasData: false,
      ok: true,
      status: 200,
      statusCode: 200,
      statusText: "OK",
      data: undefined,
      url: "http://test.com",
      type: "basic" as ResponseType,
      redirected: false,
      headers: undefined,
      body: undefined,
      trailer: undefined,
      clone: undefined,
      bodyUsed: undefined,
      arrayBuffer: undefined,
      blob: undefined,
      formData: undefined,
      json: undefined,
      text: undefined
    }

    let network = new Network(undefined);
    let result = network.__privateTestMethods.copyBase(mockResponse as Response);

    expect(expectedResponse).toEqual(result);
  });

});