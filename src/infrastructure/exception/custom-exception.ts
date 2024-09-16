import { HttpStatus } from "@nestjs/common";
import { Response } from "express";

export function handleError(res: Response, error) {
    return res
      .status(error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message ?? 'Internal Server Error' });
  }