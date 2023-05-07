import { Router, Request, Response, NextFunction } from "express";
import { ItemModelRepository } from "../repository/item.repository";
import { ItemEntity } from "../entity/item.entity";
import { logRequest } from '../middleware/logger.middleware';

const itemController = Router();

itemController.get("/", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await ItemModelRepository.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
});

itemController.get("/:id", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = await ItemModelRepository.getById(id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});

itemController.post("/", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item: ItemEntity = req.body;
    const newItem = await ItemModelRepository.create(item);
    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

itemController.put("/:id", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item: ItemEntity = req.body;
    const updatedItem = await ItemModelRepository.update(id, item);
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
});

itemController.delete("/:id", logRequest, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    await ItemModelRepository.delete(id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default itemController;
