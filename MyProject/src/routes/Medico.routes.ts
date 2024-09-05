import { Router } from "express";
import { MedicoRepository } from "../repositories/MedicoRepo";

const router = Router();
console.log("bbb")
router.get("/medicos", MedicoRepository.getAllMedicos);
router.post("/medicos", MedicoRepository.createMedico);
router.put("/medicos/:id", MedicoRepository.updateMedico);
router.delete("/medicos/:id", MedicoRepository.deleteMedico);

export default router;
