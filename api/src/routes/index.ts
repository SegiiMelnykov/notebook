import Router from 'express';
const router = Router();

import userRouter from './userRouter';
import profileRouter from './profileRouter';
import languageRouter from './geo/languageRouter';
import countryRouter from './geo/countryRouter';
import notesRouter from './notesRouter';
import todoRouter from './todoRouter';
import homeRouter from './homeRouter';

router.use('/user', userRouter);
router.use('/profiles', profileRouter);
router.use('/geo', languageRouter);
router.use('/geo', countryRouter);
router.use('/notes', notesRouter);
router.use('/todos', todoRouter);
router.use('/home', homeRouter);

export default router;
