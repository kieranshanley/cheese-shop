process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

const db = require("../models");
const Cheese = db.cheese;

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Cheese', () => {
  describe('/GET cheese', () => {
      it('it should GET all the cheese', (done) => {
            chai.request('localhost:8080')
            .get('/api/cheeseApi')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST cheese', () => {
      it('Test creating a cheese without price', (done) => {
          let cheese = {
              name: "no price",
              colour: "white",
              description: "horrible"
          }
          chai.request('localhost:8080')
            .post('/api/cheeseApi')
            .send(cheese)
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql("Price is a required parameter!");
              done();
            });
      });
      it('Test creating cheese will all mandatory attributes', (done) => {
            let cheese = {
                name: "yucky",
                description: "horrible",
                pricePerKg: "0.99",
                colour: "white"
            }
            chai.request('localhost:8080')
            .post('/api/cheeseApi')
            .send(cheese)
            .end((err, res) => {
                  console.log("response: " + res);
                  res.should.have.status(200);
                  res.body.should.have.property("name").eql("yucky");
                  res.body.should.have.property("colour").eql("white");
                  res.body.should.have.property("description").eql("horrible");
                  res.body.should.have.property("pricePerKg").eql(0.99);
              done();
            });
      });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id cheese', () => {
      it('it should GET a cheese by the given id', (done) => {
          const cheese = new Cheese({ 
                name: "gooda", 
                description : "hard",
                pricePerKg: 2.50, 
                colour: "yellow"
            });

          cheese.save((err, cheese) => {
            chai.request('localhost:8080')
            .get('/api/cheeseApi/'+ cheese.id)
            .send(cheese)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('description');
                  res.body.should.have.property('colour');
                  res.body.should.have.property('pricePerKg');
                  res.body.should.have.property('id').eql(cheese.id);
              done();
            });
          });

      });
  });
});