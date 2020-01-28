import express from 'express';
import { signIn, signUp } from '../controllers/authController';
import { addTeam, viewAllTeams, viewSingleTeam, updateTeam, patchTeam, removeTeam } from '../controllers/teamController';
import userValidation from '../middlewares/userValidation';
import teamValidation from '../middlewares/teamValidation';
import Verification from '../middlewares/authVerification';

const { validateUser } = userValidation;
const { validateTeamPatch, validateTeamUpdate } = teamValidation;
const { verifyLogin, verifyAdmin } = Verification;

const router = express.Router();

router.post('/auth/signup', validateUser, signUp);
router.post('/auth/signin', signIn);

router.post('/teams', verifyLogin, verifyAdmin, addTeam);
router.get('/teams', verifyLogin, viewAllTeams);
router.get('/teams/:id', verifyLogin, viewSingleTeam);
router.put('/teams/:id', verifyLogin, verifyAdmin, validateTeamUpdate, updateTeam);
router.patch('/teams/:id', verifyLogin, verifyAdmin, validateTeamPatch, patchTeam);
router.delete('/teams/:id', verifyLogin, verifyAdmin, removeTeam);

export default router;
