import { Procedencia } from "src/procedencia/entities/procedencia.entity";
import { BeforeInsert, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

const { nanoid } = require('nanoid');

@Entity('microbioma')
export class Microbioma {
    @PrimaryGeneratedColumn({ name: 'COD_MICROBIOMA' })
    codMicrobioma: number;

    @Column({ name: 'DCR_MICROBIOMA', length: 50 })
    descricaoMicrobioma: string;

    @OneToMany(() => Procedencia, (procedencia) => procedencia.microbioma)
    procedencia: Procedencia[];
}
