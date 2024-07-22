import { Request, Response } from 'express';

import { EncryptController, DecryptController } from '../controllers/crypto';
import RouterBuilder from '../helpers/router';

const routerBuilder = new RouterBuilder();

routerBuilder
    .get('/encrypt', new EncryptController())
    .get('/decrypt', new DecryptController());

export default routerBuilder.build();