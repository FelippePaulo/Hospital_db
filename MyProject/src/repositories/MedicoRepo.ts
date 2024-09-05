import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Medico } from "../entity/Medico";

export class MedicoRepository {
  static async getAllMedicos(req: Request, res: Response) {
    console.log("getmedicos")
    const data = cache.get("medicos");
    if (data) {
      console.log("serving from cache");
      return res.status(200).json({
        medicos:data,
      });
    } else {
      console.log("serving from db");
      const medicoRepository = AppDataSource.getRepository(Medico);
      const Medicos = await medicoRepository.find();
      
      cache.put("medicos", Medicos, 10000);
      console.log(cache)
      return res.status(200).json({
        medicos: Medicos,
      });
    }
  }
  static async createMedico(req: Request, res: Response) {
    const { nome, numeroCrm, diasAtendimento, especialidade } =
      req.body;
    const medico = new Medico();
    medico.nome = nome;
    medico.numeroCrm = numeroCrm;
    medico.diasAtendimento = diasAtendimento;
    medico.especialidade = especialidade;

    console.log(medico)

    //await AppDataSource.manager.save(medico)

    const medicoRepository = AppDataSource.getRepository(Medico);
    await medicoRepository.save(medico);
    return res
      .status(200)
      .json({ message: "Medico criado .", medico });
  }

  static async updateMedico(req: Request, res: Response) {
    const { id } = req.params;
    const { nome, numeroCrm, diasAtendimento, especialidade } =
      req.body;
    const medicoRepository = AppDataSource.getRepository(Medico);
    const medico = await medicoRepository.findOne({
      where: { id },
    });
    medico.nome = nome;
    medico.numeroCrm = numeroCrm;
    medico.diasAtendimento = diasAtendimento;
    medico.especialidade = especialidade;
    await medicoRepository.save(medico);
    return res
      .status(200)
      .json({ message: "Medico atualizado", medico });
  }

  static async deleteMedico(req: Request, res: Response) {
    console.log("delete")
    const { id } = req.params;
    const medicoRepository = AppDataSource.getRepository(Medico);
    const medico = await medicoRepository.findOne({
      where: { id },
    });
    await medicoRepository.remove(medico);
    return res
      .status(200)
      .json({ message: "medico deletado .", medico });
  }
}