import express from 'express';
import AuthMiddleware from '../middlewares/authMiddleware';
import EquipmentController from '../controllers/equipmentController';

const router = express.Router();

router.post('/', AuthMiddleware.authenticateJWT, EquipmentController.createEquipment);
router.get('/', AuthMiddleware.authenticateJWT, EquipmentController.getEquipment);
router.put('/:id', AuthMiddleware.authenticateJWT, EquipmentController.updateEquipment);
router.delete('/:id', AuthMiddleware.authenticateJWT, EquipmentController.deleteEquipment);

export default router;
