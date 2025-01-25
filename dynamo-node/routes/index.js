import express from 'express';
import { createBookmark, listBookmarks, deleteBookmark, getBookmarksByUserId } from '../controllers/bookmarkController.js';
import { createUser, listUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Bookmark routes
router.post('/bookmarks', createBookmark);
router.get('/bookmarks', listBookmarks);
router.delete('/bookmarks', deleteBookmark);
router.get('/bookmarks/user/:userId', getBookmarksByUserId);

// User routes
router.post('/users', createUser);
router.get('/users', listUsers);
router.delete('/users', deleteUser);

export default router;
