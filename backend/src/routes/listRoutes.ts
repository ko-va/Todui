import { Router, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import {List} from '../entities/List';
import {Todo} from '../entities/Todo';
import validateJwtMiddleware from "../middlewares/validateJwtMiddleware";
import retrieveUserMiddleware, {TokenRequest} from "../middlewares/retrieveUserMiddleware";

const router = Router();

router.use(validateJwtMiddleware, retrieveUserMiddleware);

router.get('/', async (req: Request, res: Response) => {
    const lists = await getRepository(List).find();
    res.json(lists);
});

router.get('/:id', async (req: Request, res: Response) => {
    const list = await getRepository(List).findOne(req.params.id);
    res.json(list);
});

router.post('/', async (req: TokenRequest, res: Response) => {
    const newList = await getRepository(List).create({
      ...req.body,
      userId: req.databaseUser?.id,
    });
    const result = await getRepository(List).save(newList);
    res.json(result);
});

router.put('/:id', async (req: Request, res: Response) => {
    const list = await getRepository(List).findOne(req.params.id);
    if(list) {
        getRepository(List).merge(list, req.body)
        const result = getRepository(List).save(list)
        res.json(result)
    } else {
        res.json({message: 'No such list exists'})
    }
});

router.delete('/:id', (req: Request, res: Response) => {
    getRepository(Todo).createQueryBuilder("todo").where("todo.listId = :listId", { listId: req.params.id }).delete().execute();
    getRepository(List).delete(req.params.id);
    res.json({message: 'List is deleted'});
});

export default router;
