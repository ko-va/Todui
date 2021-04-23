import { Router, Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateJwtMiddleware from "../middlewares/validateJwtMiddleware";
import retrieveUserMiddleware from "../middlewares/retrieveUserMiddleware";

const router = Router();

const authMiddlewares = [validateJwtMiddleware, retrieveUserMiddleware];

router.get('/', authMiddlewares, async (req: Request, res: Response) => {
    const users = await getRepository(User).find();
    res.json(users);
});

router.get('/:id', authMiddlewares, async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne(req.params.id);
    res.json(user);
});

router.post('/', async (req: Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await getRepository(User).create({
      ...req.body,
      password: hashedPassword,
    });
    const result: any = await getRepository(User).save(newUser);
    const user = await getRepository(User).findOne(result.id);
    res.json(user);
});

router.put('/:id', authMiddlewares, async (req: Request, res: Response) => {
    const user = await getRepository(User).findOne(req.params.id);
    if(user) {
        getRepository(User).merge(user, req.body)
        const result = getRepository(User).save(user)
        res.json(result)
    } else {
        res.json({message: 'No such user exists'})
    }
});

router.delete('/:id', authMiddlewares, (req: Request, res: Response) => {
    getRepository(User).delete(req.params.id);
    res.json({message: 'User is deleted'});
});

router.post('/auth', async (req: Request, res: Response) => {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username: req.body.username })
      .addSelect('user.password')
      .getOne();

    const error = () => res.json({
      error: 'Authentication error'
    });

    if (!user) {
        return error()
    }

    const success = await bcrypt.compare(req.body.password, user.password);

    if (!success) {
        return error()
    }

    //const secret = process.env.JWT_SECRET;
    const expiresIn = 60*60;

    return res.json({
        expiresIn,
        token: jwt.sign({ uid: user.id }, '0P5zbijpUmAIv5LP0aQhvKh4Uj6aNagyOtrsrFq42HAimbpgbxpUyRl5RcoZFkFR', { expiresIn }),
    });
});

export default router;
