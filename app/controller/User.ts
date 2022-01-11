import { Request, Response } from 'express';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import Joi from 'joi';

interface StoreRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        username: string,
        name: string,
        email: string
    }
}

interface EditRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string,
        username: string,
        name: string,
        email: string
    }
}

interface IdRequestSchema extends ValidatedRequestSchema {
    [ContainerTypes.Query]: {
        id: string
    }
}

const querySchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
})

const editSchema = Joi.object({
    id: Joi.number().required(),
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required()
})

const idRequestSchema = Joi.object({
    id: Joi.number().required()
});


let UserList: any = [];


class User {
    public querySchema: Joi.ObjectSchema<any>;
    public editSchema: Joi.ObjectSchema<any>;
    public idRequestSchema : Joi.ObjectSchema<any>;

    constructor(){
        this.querySchema = querySchema;
        this.editSchema = editSchema;
        this.idRequestSchema = idRequestSchema;
    }
    
    public index(req: Request, res: Response): any{
        return res.send({
            state: true,
            message: 'User List',
            data: UserList
        })
    }

    public create(req: Request, res: Response): any {
    }

    public store(req: ValidatedRequest<StoreRequestSchema>, res: Response): any {
        UserList = UserList.filter((f: any) => f.username !== req.body.username).concat([req.body])
        UserList[UserList.length - 1].id = UserList[UserList.length - 1].id || UserList.length;

        return res.send({
            state: true,
            message: 'Success Adding User List',
            data: UserList
        })

    }

    public show(req: ValidatedRequest<IdRequestSchema>, res: Response): any {
        let objIndex = UserList.findIndex((obj: any) => obj.id == req.query.id);
        if(objIndex !== -1){
            return res.send({
                state: true,
                message: 'Success Get Single User List',
                data: UserList[objIndex]
            })
        }else{
            return res.send({
                state: false,
                message: 'Failed Get Single User List',
                data: null
            })
        }
    }

    public edit(req: Request, res: Response): any {
    }

    public update(req: ValidatedRequest<EditRequestSchema>, res: Response): any {
        let objIndex = UserList.findIndex((obj: any) => obj.id == req.query.id);
        if(objIndex !== -1){
            UserList[objIndex] = {
                ...req.body,
                id: req.query.id,
            };
            return res.send({
                state: true,
                message: 'Success Update User List',
                data: UserList[objIndex]
            })
        }else{
            return res.send({
                state: false,
                message: 'Failed Update User List',
                data: null
            })
        }

    }

    public destroy(req: ValidatedRequest<IdRequestSchema>, res: Response): any {
        let objIndex = UserList.findIndex((obj: any) => obj.id == req.query.id);
        if(objIndex !== -1){
            UserList.splice(objIndex, 1);
            return res.send({
                state: true,
                message: 'Success Delete User List',
            })
        }else{
            return res.send({
                state: false,
                message: 'Failed Delete User List',
                data: null
            })
        }
    }

}

export default new User();