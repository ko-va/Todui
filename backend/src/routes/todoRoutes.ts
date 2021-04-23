import { Router, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import {Todo} from '../entities/Todo';
import validateJwtMiddleware from "../middlewares/validateJwtMiddleware";
import retrieveUserMiddleware, {TokenRequest} from "../middlewares/retrieveUserMiddleware";

const router = Router();

router.use(validateJwtMiddleware, retrieveUserMiddleware);

router.get('/:listId/todos', async (req: Request, res: Response) => {
    const todos = await getRepository(Todo).createQueryBuilder("todo").where("todo.listId = :listId", { listId: req.params.id }).getMany();
    res.json(todos);
});

// router.get('/:id', async (req: Request, res: Response) => {
//     const list = await getRepository(List).findOne(req.params.id)
//     res.json(list)
// });

router.post('/:listId/todos', async (req: TokenRequest, res: Response) => {
    if (!req.body.name && req.body.description) {
      // return status 422 and a message
    }

    try {
        const newTodo = await getRepository(Todo).create({
          ...req.body,
          userId: req.databaseUser?.id,
          listId: req.params.listId,
        })

        const result = await getRepository(Todo).save(newTodo)
        res.json(result)
    } catch (error) {
        res.status(500)
        res.json({ error: error.message })
    }
});


router.patch('/:listId/todos/:id', async (req: Request, res: Response) => {
     const todo = await getRepository(Todo).findOne(req.params.id);
     if(todo) {
         getRepository(Todo).merge(todo, req.body)
         const result = getRepository(Todo).save(todo)
         res.json(result)
     } else {
         res.json({message: 'No such list exists'})
     }
});

router.delete('/:listId/todos/:id', (req: Request, res: Response) => {
    getRepository(Todo).delete(req.params.id);
    res.json({message: 'List is deleted'});
});

export default router;
