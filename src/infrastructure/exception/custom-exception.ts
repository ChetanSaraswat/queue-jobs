import { Response } from "express";
import { HttpException, HttpStatus } from '@nestjs/common';
export class InsufficientBalanceException extends HttpException {
  constructor(
    message: string = 'Insufficient balance',
    status: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message, status);
  }
}

export class InvalidBalanaceFormat extends HttpException {
  constructor(
    message: string = 'Balance exceeds the allowed precision of 12 digits',
    status: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message, status);
  }
}

export function handleError(res: Response, error) {
    return res
      .status(error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: error.message ?? 'Internal Server Error' });
  }