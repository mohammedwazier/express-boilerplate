import * as express from 'express';
import { createValidator } from 'express-joi-validation';

const validator = createValidator()

import User from '../controller/User';

const Router = () => {
        const router = express.Router();
        router.get('/', (req: express.Request, res: express.Response) => {
            return res.send({
                message: 'Hello World',
                status: 200
            }).status(200);
        });

        router.get('/user', User.index);
        router.post('/user/store', validator.body(User.querySchema), User.store);
        router.get('/user/:id', validator.query(User.idRequestSchema), User.show);
        router.post('/user/:id/update', validator.body(User.editSchema), User.update);
        router.post('/user/:id/destroy', validator.body(User.idRequestSchema), User.destroy);

        return router;
}
export default Router;