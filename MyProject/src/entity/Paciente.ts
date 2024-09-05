import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Consulta } from "./Consulta";

@Entity()
export class Paciente{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    //endereço
    @Column()
    logradouro: string

    @Column()
    numero: string

    @Column()
    complemento: string

    @Column()
    bairro: string

    @Column()
    cep: string

    @Column()
    cidade: string

    //documento
    @Column()
    documentoNumero: string

    @Column()
    documentoTipo: string

    @OneToMany(() => Consulta, consulta => consulta.paciente)
    consultas: Consulta[];
}