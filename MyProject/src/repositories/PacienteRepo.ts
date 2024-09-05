import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Paciente } from "../entity/Paciente";

export class pacienteRepository {
    static async getAllPacientes(req: Request, res: Response) {
      console.log("getpacientes")
      const data = cache.get("pacientes");
      if (data) {
        console.log("serving from cache");
        return res.status(200).json({
          pacientes:data,
        });
      } else {
        console.log("serving from db");
        const pacienteRepository = AppDataSource.getRepository(Paciente);
        const pacientes = await pacienteRepository.find();
        cache.put("pacientes", pacientes, 10000);
        console.log(cache)
        return res.status(200).json({
          pacientes: pacientes,
        });
      }
    }
    static async createPaciente(req: Request, res: Response) {
        console.log("aaaa")
      const { nome, logradouro, numero, complemento, bairro, cep, cidade, documentoNumero, documentoTipo } =
        req.body;
      const paciente = new Paciente();
      paciente.nome = nome;
      //endereço
      paciente.logradouro = logradouro;
      paciente.numero = numero;
      paciente.complemento = complemento;
      paciente.bairro = bairro;
      paciente.cep = cep;
      paciente.cidade = cidade;
      //documento
      paciente.documentoNumero = documentoNumero;
      paciente.documentoTipo = documentoTipo;
  
      console.log(paciente)
  
      //await AppDataSource.manager.save(paciente)
  
      const pacienteRepository = AppDataSource.getRepository(Paciente);
      await pacienteRepository.save(paciente);
      return res
        .status(201)
        .json({ message: "paciente criado .", paciente });
    }
  
    static async updatePaciente(req: Request, res: Response) {
      const { id } = req.params;
      const { nome, logradouro, numero, complemento, bairro, cep, cidade, documentoNumero, documentoTipo } =
        req.body;
      const pacienteRepository = AppDataSource.getRepository(Paciente);
      const paciente = await pacienteRepository.findOne({
        where: { id },
      });
      paciente.nome = nome;
      //endereço
      paciente.logradouro = logradouro;
      paciente.numero = numero;
      paciente.complemento = complemento;
      paciente.bairro = bairro;
      paciente.cep = cep;
      paciente.cidade = cidade;
      //documento
      paciente.documentoNumero = documentoNumero;
      paciente.documentoTipo = documentoTipo;
      await pacienteRepository.save(paciente);
      return res
        .status(200)
        .json({ message: "paciente atualizado", paciente });
    }
  
    static async deletePaciente(req: Request, res: Response) {
      console.log("delete")
      const { id } = req.params;
      const pacienteRepository = AppDataSource.getRepository(Paciente);
      const paciente = await pacienteRepository.findOne({
        where: { id },
      });
      await pacienteRepository.remove(paciente);
      return res
        .status(200)
        .json({ message: "paciente deletado .", paciente });
    }
  }