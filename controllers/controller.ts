import { Request, Response } from 'express';

export default abstract class Controller {
  public abstract invoke(request: Request, response: Response): Promise<void> | void;
}