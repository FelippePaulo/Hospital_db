import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Medico } from "./Medico";
import { Paciente } from "./Paciente";

@Entity()
export class Consulta{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    data: string

    @Column()
    tipo: string;

    @Column()
    observacoes: string;

    @Column()
    medicamentosPreescritos: string; 

    @Column()
    examesSolicitados: string;

    @ManyToOne(() => Medico, medico => medico.consultas)
    @JoinColumn()
    medico: Medico;

    @ManyToOne(() => Paciente, paciente => paciente.consultas)
    @JoinColumn()
paciente: Paciente;

}
