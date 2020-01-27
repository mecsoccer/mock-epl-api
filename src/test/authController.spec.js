import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Authentication', () => {
  describe('Tests for user signup', () => {
    it('Should return user data for valid signup data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'dsda@gma.com', password: 'password', first_name: 'dada', last_name: 'sdsd', role: 'admin' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.newUser).to.have.property('email').that.is.a('string');
          expect(res.body.newUser).to.have.property('first_name').that.is.a('string');
          expect(res.body.newUser).to.have.property('last_name').that.is.a('string');
          expect(res.body.newUser).to.have.property('role').that.is.a('string');
          expect(res.body.newUser).to.not.have.property('password');
          done();
        });
    });
    it('Should return error for invalid email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'dsda@gmacom', password: 'password', first_name: 'dada', last_name: 'sdsd', role: 'admin' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('email');
          done();
        });
    });
    it('Should return error for a short password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'dsda@gma.com', password: '', first_name: 'dada', last_name: 'sdsd', role: 'admin' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('password');
          done();
        });
    });
    it('Should return error for invalid role', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({ email: 'dsda@gma.com', password: 'adsdasewsds', first_name: 'dada', last_name: 'sdsd', role: 'student' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('role');
          done();
        });
    });
  });

  describe('Tests for user signin', () => {
    it('Should return user data and token for correct signin data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'dsda@gma.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.user).to.have.property('email').that.is.a('string');
          expect(res.body.user).to.have.property('token').that.is.a('string');
          expect(res.body.user).to.not.have.property('password');
          done();
        });
    });
    it('Should return error for incorrect signin data', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signin')
        .send({ email: 'dsdad@gma.com', password: 'password' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });
});
