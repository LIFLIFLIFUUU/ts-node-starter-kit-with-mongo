import { Request, Response } from 'express';

export function userLogin(req: Request, res: Response) {
  try {
    res.status(200).json({ msg: "User Found!" });
  } catch (error) {
    res.status(500).json(error);
  }
}

