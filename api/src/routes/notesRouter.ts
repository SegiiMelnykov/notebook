import Router from 'express';
import authMiddleware from '../middleware/authMiddleware';
import NotesController from '../controllers/notes/notesController';

const router = Router();
router.post('/reorder/', authMiddleware, NotesController.reorderNotes);
router.post('/move-note/', authMiddleware, NotesController.moveNote);
router.post('/hide/:id', authMiddleware, NotesController.hide);
router.post('/add-to-todo/:id', authMiddleware, NotesController.hide);
router.get('/', authMiddleware, NotesController.getAllByParentId);
router.get('/top-menu', authMiddleware, NotesController.getTopMenu);
router.get('/:id', authMiddleware, NotesController.getOne);
router.get(
  '/:id/breadcrumbs',
  authMiddleware,
  NotesController.getNoteBreadcrumbs,
);

router.post('/', authMiddleware, NotesController.create);
router.put('/:id', authMiddleware, NotesController.update);
router.delete('/:id', authMiddleware, NotesController.delete);
router.post('/complite/:id', authMiddleware, NotesController.complete);

export default router;
