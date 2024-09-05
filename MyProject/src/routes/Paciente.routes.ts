import { Router } from "express";
import { pacienteRepository } from "../repositories/PacienteRepo";

const router = Router();
console.log("aapp")
router.get("/pacientes", pacienteRepository.getAllPacientes);
router.post("/pacientes", pacienteRepository.createPaciente);
router.put("/pacientes/:id", pacienteRepository.updatePaciente);
router.delete("/pacientes/:id", pacienteRepository.deletePaciente);

export default router;