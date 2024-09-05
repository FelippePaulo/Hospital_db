// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = "451254675509-4a9oous76a30b5ubu3vvtgvueredp3a6.apps.googleusercontent.com"; // Substitua pelo seu Client ID
const client = new OAuth2Client(CLIENT_ID);

export const verifyGoogleToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho Authorization
  console.log("bd ", token)
  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Verifica o CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(401).json({ message: "Token inválido." });
    }

    // Se o token for válido, você pode anexar os dados do usuário à requisição
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Falha na verificação do token." });
  }
};