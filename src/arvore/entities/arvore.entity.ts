import { BeforeInsert, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { Familia } from "src/familia/entities/familia.entity";
import { Especie } from "src/especie/entities/especie.entity";
import { Exsicata } from "src/exsicata/entities/exsicata.entity";
import { Dendrometria } from "src/dendrometria/entities/dendrometria.entity";

const { nanoid } = require('nanoid');

@Entity('arvore')
export class Arvore {
    @PrimaryGeneratedColumn({ name: 'COD_ARVORE' })
    codArvore: number;

    @Column({ name: 'NUM_IDENTIFICACAO', length: 45 })
    numIdentificacao: string;

    @Column({ name: 'DCR_LOCAL', length: 45 })
    local: string;

    @Column({ name: 'DCR_PROJETO', length: 45 })
    projeto: string;

    @Column({ name: 'DCR_QUADRA_PARCELA', length: 45 })
    quadraParcela: string;

    @ManyToOne(() => Especie, (especie) => especie.arvores)
    @JoinColumn({ name: 'COD_ESPECIE' })
    especie: Especie;

    @OneToMany(() => Exsicata, (exsicata) => exsicata.arvore)
    exsicatas: Exsicata[];

    @OneToMany(() => Dendrometria, (d) => d.arvore)
    dendrometrias: Dendrometria[];

}

