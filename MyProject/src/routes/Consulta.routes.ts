// routes/consultaRoutes.ts
import { Router } from "express";
import { ConsultaRepository } from "../repositories/ConsultaRepo";

const router = Router();

// Rotas protegidas
router.get("/consultas", ConsultaRepository.getAllConsultas);
router.post("/consultas",  ConsultaRepository.createConsulta);
router.put("/consultas/:id",  ConsultaRepository.updateConsulta);
router.delete("/consultas/:id",  ConsultaRepository.deleteConsulta);

export default router;
