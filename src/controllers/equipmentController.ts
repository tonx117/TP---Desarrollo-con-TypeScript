import { Request, Response } from 'express';
import Equipment from '../models/equipment';

class EquipmentController {
  private static instance: EquipmentController;

  private constructor() {}

  public static getInstance(): EquipmentController {
    if (!EquipmentController.instance) {
      EquipmentController.instance = new EquipmentController();
    }
    return EquipmentController.instance;
  }

  public async createEquipment(req: Request, res: Response) {
    const { name, type, status, location, acquisitionDate } = req.body;

    try {
      const newEquipment = new Equipment({ name, type, status, location, acquisitionDate });
      await newEquipment.save();
      res.status(201).json({ success: true, data: newEquipment });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear el equipo' });
    }
  }

  public async getEquipment(req: Request, res: Response) {
    try {
      const equipment = await Equipment.find();
      res.status(200).json({ success: true, data: equipment });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener el equipo' });
    }
  }

  public async updateEquipment(req: Request, res: Response) {
    const { id } = req.params;
    const { name, type, status, location, acquisitionDate } = req.body;

    try {
      const updatedEquipment = await Equipment.findByIdAndUpdate(id, { name, type, status, location, acquisitionDate }, { new: true });
      if (!updatedEquipment) return res.status(404).json({ success: false, message: 'Equipo no encontrado' });
      res.status(200).json({ success: true, data: updatedEquipment });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar el equipo' });
    }
  }

  public async deleteEquipment(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const deletedEquipment = await Equipment.findByIdAndDelete(id);
      if (!deletedEquipment) return res.status(404).json({ success: false, message: 'Equipo no encontrado' });
      res.status(200).json({ success: true, message: 'Equipo eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar el equipo' });
    }
  }
}

export default EquipmentController.getInstance();
