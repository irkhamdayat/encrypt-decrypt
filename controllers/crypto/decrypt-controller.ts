import { Request, Response } from 'express';
import crypto, { Decipher } from 'crypto';

import Controller from '../controller';

export default class DecryptController extends Controller {
  private readonly securityKey: string = '0f80e66as';
  private readonly encryptAlgorithm: string = 'aes-128-cbc';

  /**
   * Decrypts the input data using AES-128-CBC decryption algorithm.
   *
   * @param request - The Express request object containing the encrypted data to be decrypted.
   * @param response - The Express response object to send the decrypted data.
   *
   * @remarks
   * The function takes the encrypted data from the request query parameters,
   * decrypts it using AES-128-CBC decryption algorithm with a predefined secret key,
   * and then sends the decrypted data as a response.
   *
   * If an error occurs during the decryption process, the error message and status code 500
   * are sent as a response.
   *
   * @returns {import('express').Response} - The Express response object containing the decrypted data or error information.
   */
  public invoke(request: Request, response: Response): void {
    let requestQuery: any = request.query;
    let text: string = requestQuery.text;

    try {
      let mykey: Decipher = crypto.createDecipher(this.encryptAlgorithm, this.securityKey);
      let decryptedText: string = mykey.update(text, "hex", "utf8") + mykey.final("utf8");

      response.send(decryptedText);
    } catch (error: any) {
      console.log(error);

      response.send({
        error: error.message,
        status: 500,
      });
    }
  }
}