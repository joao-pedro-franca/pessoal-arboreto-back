import { BeforeInsert, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Column } from "typeorm";
import { Familia } from "src/familia/entities/familia.entity";
import { Arvore } from "src/arvore/entities/arvore.entity";
import { Procedencia } from 'src/procedencia/entities/procedencia.entity';

@Entity('especie')
export class Especie {
  @PrimaryGeneratedColumn({ name: 'COD_ESPECIE' })
  codEspecie: number;

  @Column({ name: 'DCR_NOME_CIENTIFICO', length: 50 })
  nomeCientifico: string;

  @Column({ name: 'DCR_SINONIMIA_CIENTIFICA', length: 50, nullable: true })
  sinonimiaCientifica: string;

  @Column({ name: 'DCR_NOME_COMUM', length: 50 })
  nomePopular: string;

  @Column({ name: 'DCR_SINONIMIA_COMUM', length: 50, nullable: true })
  sinonimiaComum: string;

  // coluna FK família
  @Column({ name: 'COD_FAMILIA', nullable: true })
  codFamilia: number;

  // relacionamento com FAMILIA
  @ManyToOne(() => Familia, (familia) => familia.especies, { nullable: false })
  @JoinColumn({ name: 'COD_FAMILIA' })
  familia: Familia;

  // uma espécie pode ter várias árvores
  @OneToMany(() => Arvore, (arvore) => arvore.especie)
  arvores: Arvore[];

  // uma espécie pode ter várias procedências
  @OneToMany(() => Procedencia, (procedencia) => procedencia.especie)
  procedencias: Procedencia[];
}