import jwt from 'express-jwt';

const validateJwtMiddleware = jwt({
  secret: '0P5zbijpUmAIv5LP0aQhvKh4Uj6aNagyOtrsrFq42HAimbpgbxpUyRl5RcoZFkFR',
  algorithms: ['HS256'],
  requestProperty: 'token',
})

export default validateJwtMiddleware;
