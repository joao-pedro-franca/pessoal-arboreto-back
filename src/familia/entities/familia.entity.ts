import { Especie } from "src/especie/entities/especie.entity";
import { BeforeInsert, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";

const { nanoid } = require('nanoid');

@Entity('familia')
export class Familia {
    @PrimaryGeneratedColumn({ name: 'COD_FAMILIA' })
    codFamilia: number;

    @Column({ name: 'DCR_FAMILIA', length: 50 })
    descricaoFamilia: string;

    @OneToMany(() => Especie, (especie) => especie.familia)
    especies: Especie[];
}
