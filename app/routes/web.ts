import * as express from 'express';

const Router = () => {
        const router = express.Router();
        router.get('/', (req: express.Request, res: express.Response) => {
            return res.send(`Hello World`)
        });
        return router;
}
export default Router;