import { BeforeInsert, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Column } from "typeorm";
import { Especie } from 'src/especie/entities/especie.entity';
import { Exsicata } from 'src/exsicata/entities/exsicata.entity';
import { Dendrometria } from 'src/dendrometria/entities/dendrometria.entity';
import { Procedencia } from 'src/procedencia/entities/procedencia.entity';

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

  @Column({ name: 'DATA_PLANTIO', type: 'date' })
  dataPlantio: Date;


  // relacionamento com ESPECIE
  @ManyToOne(() => Especie, (especie) => especie.arvores)
  @JoinColumn({ name: 'COD_ESPECIE' })
  especie: Especie;

  // uma árvore pode ter várias exsicatas
  @OneToMany(() => Exsicata, (exsicata) => exsicata.arvore)
  exsicatas: Exsicata[];

  // uma árvore pode ter várias medições dendrométricas
  @OneToMany(() => Dendrometria, (d) => d.arvore)
  dendrometrias: Dendrometria[];

  // uma árvore pode ter várias procedências associadas
  @OneToMany(() => Procedencia, (procedencia) => procedencia.arvore)
  procedencias: Procedencia[];
}