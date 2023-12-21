import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';
const BEFORE_ALL_TIMEOUT = 5000; // 5 sec

var chai = require('chai');
chai.use(require('chai-json-schema'));


describe('Get user by id', () => {
  let response;
  let body;

  beforeAll(async () => {
    response = await fetch(
      'https://jsonplaceholder.typicode.com/users/1',
    );
    body = await response.json();
  }, BEFORE_ALL_TIMEOUT);

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });

  test('Should have content-type', () => {
    expect(response.headers.get('Content-Type')).toBe("application/json; charset=utf-8");
  });

  test('Should have object in the body', () => {
    expectTypeOf(body).toBeObject();
  });

  test('Check username in response', () => {
    expect(body.username).toBe('Bret');
  });

  test('Check schema of JSON response', () => {
    expect(body).to.be.jsonSchema({
      "type": "object",
      "properties": {
        "id": { "type": "number" },
        "name": { "type": "string" },
        "username": { "type": "string" },
        "email": { "type": "string" },
        "address": {
          "type": "object",
          "properties": {
            "street": { "type": "string" },
            "suite": { "type": "string" },
            "city": { "type": "string" },
            "zipcode": { "type": "string" },
            "geo": {
              "type": "object",
              "properties": {
                "lat": { "type": "string" },
                "lng": { "type": "string" }
              },
              "required": ["lat", "lng"]
            }
          },
          "required": ["street", "suite", "city", "zipcode", "geo"]
        },
        "phone": { "type": "string" },
        "website": { "type": "string" },
        "company": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "catchPhrase": { "type": "string" },
            "bs": { "type": "string" }
          },
          "required": ["name", "catchPhrase", "bs"]
        }
      },
      "required": ["id", "name", "username", "email", "address", "phone", "website", "company"]
    });
  })
});