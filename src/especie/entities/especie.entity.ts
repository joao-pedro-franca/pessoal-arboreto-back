import { BeforeInsert, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Column } from "typeorm";
import { Familia } from "src/familia/entities/familia.entity";
import { Arvore } from "src/arvore/entities/arvore.entity";

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

    // Adicione a coluna da chave estrangeira
    @Column({ name: 'COD_FAMILIA', nullable: true })
    codFamilia: number;

    // Configure a relação corretamente
    @ManyToOne(() => Familia, (familia) => familia.especies, { nullable: false })
    @JoinColumn({ name: 'COD_FAMILIA' })
    familia: Familia;

    @OneToMany(() => Arvore, (arvore) => arvore.especie)
    @JoinColumn({ name: 'COD_ARVORE' })
    arvores: Arvore[];
}