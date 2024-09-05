import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";

@Entity()
export class Medico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;
    
    @Column()
    numeroCrm: string; 

    @Column()
    diasAtendimento: string;

    @Column()
    especialidade: string;

    @OneToMany(() => Consulta, consulta => consulta.medico)
    consultas: Consulta[];
    
}