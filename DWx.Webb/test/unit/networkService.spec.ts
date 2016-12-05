import { HttpClient } from 'aurelia-fetch-client';
import { Network, NetworkResponse } from "./../../src/utils/network";

var response;

describe('the service', () => {
  // beforeEach(function (done) {
  //   // console.log("beforeEach");
  //   // getStuff(done);
  // });

  it('handles http 200', (done) => {
    let url = 
    // "http://localhost:5005/api/droids";
    "http://httpstat.us/200";
    
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



});
