import { Request, Response } from 'express';
import crypto, { Cipher } from 'crypto';

import Controller from '../controller';

export default class EncryptController extends Controller {
  private readonly securityKey: string = '0f80e66as';
  private readonly encryptAlgorithm: string = 'aes-128-cbc';

  /**
   * This function is responsible for encrypting the request body using AES-128-CBC encryption algorithm.
   *
   * @param request - The Express request object containing the request body to be encrypted.
   * @param response - The Express response object to send the encrypted text.
   *
   * @returns The Express response object with the encrypted text or an error message.
   *
   * @throws Will throw an error if there is an issue with the encryption process.
   */
  public invoke(request: Request, response: Response): void {
    let requestQuery: any = request.query;
    let text: string = requestQuery.text;

    try {
      let mykey: Cipher = crypto.createCipher(this.encryptAlgorithm, this.securityKey);
      let encryptedText: string = mykey.update(text, "utf8", "hex")  + mykey.final('hex');

      response.send(encryptedText);
    } catch (error: any) {
      console.log(error);

      response.send({
        error: error.message,
        status: 500,
      });
    }
  }
}