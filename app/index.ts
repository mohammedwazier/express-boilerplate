import 'dotenv/config';

import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import * as VAR from './variables/environment';

import Route from './routes/web';

const PORT: number = VAR.default.PORT;

const app: Application = express();
app.use(compression());
app.use(cors());
app.use(bodyParser.json());

// Routing on Files Folder
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        next();
    } catch (error: any) {
        return res.status(500).send({
            state: false,
            message: error.message,
            code: error.code
        });
    }
}, Route());

try{
    app.listen(PORT, () => {
        console.log(`Server was running on PORT : ${PORT}`);
    })

}catch(error: any){
    console.log(`Error Occured: ${error.message}`);
    process.exit();
}
export { app as app }