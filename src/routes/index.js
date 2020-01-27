import express from 'express';
import { signIn, signUp } from '../controllers/authController';
import Validation from '../middlewares/userValidation';

const { validateUser } = Validation;

const router = express.Router();

router.post('/auth/signup', validateUser, signUp);
router.post('/auth/signin', signIn);

export default router;
