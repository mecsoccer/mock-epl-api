/* eslint-disable object-property-newline */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

let adminToken;
let userToken;

describe('Teams', () => {
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'mecsoccerguy@gmail.com', password: 'password' })
      .end((err, res) => {
        adminToken = res.body.user.token;
        done();
      });
  });
  before((done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({ email: 'mecsoccerguy.oj@gmail.com', password: 'password' })
      .end((err, res) => {
        userToken = res.body.user.token;
        done();
      });
  });

  describe('Tests for team creation', () => {
    it('Should create and return team data', (done) => {
      chai.request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({ name: 'leicester f.c.' })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.newTeam).to.have.property('name');
          expect(res.body.newTeam).to.have.property('wins').that.equals(0);
          expect(res.body.newTeam).to.have.property('losses').that.equals(0);
          expect(res.body.newTeam).to.have.property('draws').that.equals(0);
          expect(res.body.newTeam).to.have.property('position').that.equals(0);
          expect(res.body.newTeam).to.have.property('goal_for').that.equals(0);
          expect(res.body.newTeam).to.have.property('goal_against').that.equals(0);
          expect(res.body.newTeam).to.have.property('position').that.equals(0);
          done();
        });
    });
    it('Should return error for invalid team name', (done) => {
      chai.request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({ name: 'liverpo$ol f.c.' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('name');
          done();
        });
    });
    it('Should not allow non-admins add team', (done) => {
      chai.request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .send({ name: 'everton f.c.' })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should not allow duplicate teams', (done) => {
      chai.request(app)
        .post('/api/v1/teams')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({ name: 'liverpool f.c.' })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('View teams', () => {
    it('Should return array of teams', (done) => {
      chai.request(app)
        .get('/api/v1/teams')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.teams[0]).to.have.property('name').that.is.a('string');
          expect(res.body.teams[0]).to.have.property('wins').that.equals(0);
          expect(res.body.teams[0]).to.have.property('losses').that.equals(0);
          expect(res.body.teams[0]).to.have.property('draws').that.equals(0);
          expect(res.body.teams[0]).to.have.property('position').that.equals(0);
          expect(res.body.teams[0]).to.have.property('goal_for').that.equals(0);
          expect(res.body.teams[0]).to.have.property('goal_against').that.equals(0);
          expect(res.body.teams[0]).to.have.property('position').that.equals(0);
          done();
        });
    });
    it('Should return a single team', (done) => {
      chai.request(app)
        .get('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.team).to.have.property('name').that.is.a('string');
          expect(res.body.team).to.have.property('wins').that.equals(0);
          expect(res.body.team).to.have.property('losses').that.equals(0);
          expect(res.body.team).to.have.property('draws').that.equals(0);
          expect(res.body.team).to.have.property('position').that.equals(0);
          expect(res.body.team).to.have.property('goal_for').that.equals(0);
          expect(res.body.team).to.have.property('goal_against').that.equals(0);
          expect(res.body.team).to.have.property('position').that.equals(0);
          done();
        });
    });
    it('Should not allow unknown users access to view teams', (done) => {
      chai.request(app)
        .get('/api/v1/teams')
        .set('Authorization', 'Bearer bearer dfkadafklieio83dldsiei')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should not allow unknown users access to view single team', (done) => {
      chai.request(app)
        .get('/api/v1/teams/1')
        .set('Authorization', 'Bearer bearer dfkadafklieio83dldsiei')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('Update teams', () => {
    it('Should update a single team', (done) => {
      chai.request(app)
        .put('/api/v1/teams/4')
        .send({
          name: 'queens park rangers', wins: 3, losses: 10, draws: 1, points: 10,
          goal_for: 10, goal_against: 30, position: 19,
        })
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.updatedTeam).to.have.property('name').that.is.a('string');
          expect(res.body.updatedTeam).to.have.property('wins').that.equals(3);
          expect(res.body.updatedTeam).to.have.property('losses').that.equals(10);
          expect(res.body.updatedTeam).to.have.property('draws').that.equals(1);
          expect(res.body.updatedTeam).to.have.property('points').that.equals(10);
          expect(res.body.updatedTeam).to.have.property('goal_for').that.equals(10);
          expect(res.body.updatedTeam).to.have.property('goal_against').that.equals(30);
          expect(res.body.updatedTeam).to.have.property('position').that.equals(19);
          done();
        });
    });
    it('Should return error for empty request body', (done) => {
      chai.request(app)
        .put('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should return error for invalid data', (done) => {
      chai.request(app)
        .put('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({
          name: 'liverpo$ol f.c.', wins: 22, losses: 0, draws: 1, points: 67,
          goal_for: 100, goal_against: 0, position: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('name');
          done();
        });
    });
    it('Should not allow users write access', (done) => {
      chai.request(app)
        .put('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .send({
          name: 'liverpool f.c.', wins: 22, losses: 0, draws: 1, points: 67,
          goal_for: 100, goal_against: 0, position: 1,
        })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('Patch team data', () => {
    it('Should update a single field in team record', (done) => {
      chai.request(app)
        .patch('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({ wins: 23 })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.updatedTeam).to.have.property('name').that.is.a('string');
          expect(res.body.updatedTeam).to.have.property('wins').that.equals(23);
          done();
        });
    });
    it('Should return error for empty request body', (done) => {
      chai.request(app)
        .patch('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should return error for invalid data', (done) => {
      chai.request(app)
        .patch('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .send({ name: 'liverpo$ol f.c.' })
        .end((err, res) => {
          expect(res.status).to.equal(422);
          expect(res.body).to.have.property('error').that.is.a('string');
          expect(res.body).to.have.property('field').that.equals('name');
          done();
        });
    });
    it('Should not allow users write access', (done) => {
      chai.request(app)
        .patch('/api/v1/teams/1')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .send({ wins: 23 })
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
  });

  describe('Delete team data', () => {
    it('Should not delete team record if not admin', (done) => {
      chai.request(app)
        .delete('/api/v1/teams/4')
        .set('Authorization', `Bearer bearer ${userToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should return 404 if id does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/teams/30')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('error').that.is.a('string');
          done();
        });
    });
    it('Should delete team record', (done) => {
      chai.request(app)
        .delete('/api/v1/teams/4')
        .set('Authorization', `Bearer bearer ${adminToken}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.deletedTeam).to.have.property('name');
          expect(res.body.deletedTeam).to.have.property('wins');
          expect(res.body.deletedTeam).to.have.property('losses');
          expect(res.body.deletedTeam).to.have.property('draws');
          expect(res.body.deletedTeam).to.have.property('points');
          expect(res.body.deletedTeam).to.have.property('goal_for');
          expect(res.body.deletedTeam).to.have.property('goal_against');
          expect(res.body.deletedTeam).to.have.property('position');
          done();
        });
    });
  });
});
