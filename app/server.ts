import { app } from './index';
import * as VAR from './variables/environment';

const PORT: number = VAR.default.PORT;

if(process.env.NODE_ENV !== 'test'){
    try{
        app.listen(PORT, () => {
            console.log(`Server was running on PORT : ${PORT}`);
        })
    }catch(error: any){
        process.exit();
    }
}