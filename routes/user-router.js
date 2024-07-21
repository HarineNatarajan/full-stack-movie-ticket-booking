// user-router.js
import express from 'express';
import { 
  getAllUsers, 
  singup, 
  updateUser, 
  deleteUser, 
  login, 
  getBookingsOfUser, 
  getUserById 
} from "../controller/user-controller.js"; 

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/signup', singup);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', login);
router.get('/:id/bookings', getBookingsOfUser);
router.get('/:id', getUserById);

export default router;