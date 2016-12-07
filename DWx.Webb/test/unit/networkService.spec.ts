import { HttpClient } from 'aurelia-fetch-client';
import { Network, NetworkResponse } from "./../../src/utils/network";

var response;

describe('the service', () => {
  // beforeEach(function (done) {
  //   // console.log("beforeEach");
  //   // getStuff(done);
  // });

  it('handles http 200', (done) => {
    let url = "http://httpstat.us/200";

    let expected: NetworkResponse = {
      hasData: false,
      ok: true,
      status: "OK",
      statusCode: 200,
      data: undefined,
      url: undefined,
      type: undefined
    };

    new Network(new HttpClient()).request(url).then((response) => {
      // expect(response).toBe(expected);
      expect(response).toBeDefined();
      done();
    });
  });


  it('handles http 200-2', (done) => {
    let url =
      "http://localhost:5005/api/droids";
    // "http://httpstat.us/200";

    let expected: NetworkResponse = {
      hasData: false,
      ok: true,
      status: "OK",
      statusCode: 200,
      data: undefined,
      url: undefined,
      type: undefined
    };

    new Network(new HttpClient()).request(url).then((response) => {
      // expect(response).toBe(expected);
      expect(response).toBeDefined();
      done();
    });
  });


  it('copies base properties', () => {
    let expectedResponse: NetworkResponse = {
      hasData: false,
      ok: true,
      status: "OK",
      statusCode: 200,
      data: undefined,
      url: "http://test.com",
      type: "basic"
    };


    let mockResponse = { //: Response = new Response();
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

    dump(mockResponse);

    let nw = new Network(undefined);
    let res = nw.testObject.copyBase(mockResponse as Response);

    expect(expectedResponse).toEqual(res);
  });


});
