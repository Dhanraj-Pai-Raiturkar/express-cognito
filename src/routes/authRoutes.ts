import express from 'express';
import type { Request, Response } from 'express';
import { CognitoController } from '../controllers/cognitoController';
import { authenticateJwt } from '../middlewares/authenticateMiddleware';
import { authorizeJwt } from '../middlewares/authorizeMiddleware';

const authRoutes = express.Router();
const cognitoController = new CognitoController();

authRoutes.post('/sign-up', async (req: Request, res: Response) => {
  await cognitoController.signUp(req, res);
});

authRoutes.post('/confirm-sign-up', async (req: Request, res: Response) => {
  await cognitoController.confirmSignUp(req, res);
});

authRoutes.post('/sign-in', async (req: Request, res: Response) => {
  await cognitoController.signIn(req, res);
});

authRoutes.get('/resend-confirm', async (req: Request, res: Response) => {
  await cognitoController.resendConfirmationCode(req, res);
});

authRoutes.post('/forgot-password', async (req: Request, res: Response) => {
  await cognitoController.forgotPassword(req, res);
});

authRoutes.post('/confirm-password', async (req: Request, res: Response) => {
  await cognitoController.confirmPassword(req, res);
});

authRoutes.post(
  '/change-password',
  authenticateJwt,
  authorizeJwt,
  async (req: Request, res: Response) => {
    await cognitoController.changePassword(req, res);
  }
);

authRoutes.post('/validate-jwt', async (req: Request, res: Response) => {
  await cognitoController.changePassword(req, res);
});

export default authRoutes;
