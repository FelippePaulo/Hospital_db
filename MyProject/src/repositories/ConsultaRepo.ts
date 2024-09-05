import { Request, Response } from "express";
import * as cache from "memory-cache";
import { AppDataSource } from "../data-source";
import { Consulta } from "../entity/Consulta";
import { Medico } from "../entity/Medico";
import { Paciente } from "../entity/Paciente";

export class ConsultaRepository {
    static async getAllConsultas(req: Request, res: Response) {
        const data = cache.get("consultas");
        if (data) {
            console.log("serving from cache");
            return res.status(200).json({ consultas: data });
        } else {
            console.log("serving from db");
            const consultaRepository = AppDataSource.getRepository(Consulta);
            const consultas = await consultaRepository.find({
                relations: ["medico", "paciente"], 
            });
            cache.put("consultas", consultas, 10000);
            return res.status(200).json({ consultas: consultas });
        }
    }

    static async createConsulta(req: Request, res: Response) {
        const { data, tipo, observacoes, medicamentosPreescritos, examesSolicitados, medicoId, pacienteId } = req.body;
        
        const medicoRepository = AppDataSource.getRepository(Medico);
        const pacienteRepository = AppDataSource.getRepository(Paciente);
        const medico = await medicoRepository.findOne({ where: { id: medicoId } });
        const paciente = await pacienteRepository.findOne({ where: { id: pacienteId } });

        if (!medico || !paciente) {
            return res.status(404).json({ message: "Médico ou Paciente não encontrados." });
        }

        const consulta = new Consulta();
        consulta.data = data;
        consulta.tipo = tipo;
        consulta.observacoes = observacoes;
        consulta.medicamentosPreescritos = medicamentosPreescritos;
        consulta.examesSolicitados = examesSolicitados;

        consulta.medico = medico; 
        consulta.paciente = paciente; 

        const consultaRepository = AppDataSource.getRepository(Consulta);
        await consultaRepository.save(consulta);
        return res.status(201).json({ message: "Consulta criada.", consulta });
    }

    static async updateConsulta(req: Request, res: Response) {
        const { id } = req.params;
        const { data, tipo, observacoes, medicamentosPreescritos, examesSolicitados, medicoId, pacienteId } = req.body;
        
        const consultaRepository = AppDataSource.getRepository(Consulta);
        const medicoRepository = AppDataSource.getRepository(Medico);
        const pacienteRepository = AppDataSource.getRepository(Paciente);

        const consulta = await consultaRepository.findOne({ where: { id }, relations: ["medico", "paciente"] });
        if (!consulta) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }

        const medico = await medicoRepository.findOne({ where: { id: medicoId } });
        const paciente = await pacienteRepository.findOne({ where: { id: pacienteId } });

        if (!medico || !paciente) {
            return res.status(404).json({ message: "Médico ou Paciente não encontrados." });
        }

        consulta.data = data;
        consulta.tipo = tipo;
        consulta.observacoes = observacoes;
        consulta.medicamentosPreescritos = medicamentosPreescritos;
        consulta.examesSolicitados = examesSolicitados;
        consulta.medico = medico; 
        consulta.paciente = paciente; 

        await consultaRepository.save(consulta);
        return res.status(200).json({ message: "Consulta atualizada.", consulta });
    }

    static async deleteConsulta(req: Request, res: Response) {
        const { id } = req.params;
        const consultaRepository = AppDataSource.getRepository(Consulta);
        const consulta = await consultaRepository.findOne({ where: { id } });

        if (!consulta) {
            return res.status(404).json({ message: "Consulta não encontrada." });
        }

        await consultaRepository.remove(consulta);
        return res.status(200).json({ message: "Consulta deletada.", consulta });
    }
}
