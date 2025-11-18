import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Entity('dendrometria')
export class Dendrometria {
	@PrimaryGeneratedColumn({ name: 'COD_DENDROMETRIA' })
	codDendrometria: number;

	@Column({ name: 'DATA_DENDROMETRIA', type: 'date' })
	dataDendrometria: Date;

	@Column({ name: 'VLR_ALTURA', type: 'decimal', precision: 10, scale: 2 })
	vlrAltura: string;

	@Column({ name: 'VLR_DAP', type: 'decimal', precision: 10, scale: 2 })
	vlrDap: string;

	@Column({ name: 'VLR_DIAMETRO_COPA', type: 'decimal', precision: 10, scale: 2 })
	vlrDiametroCopa: string;

	@ManyToOne(() => Arvore, (arvore) => arvore.dendrometrias, { nullable: false })
	@JoinColumn({ name: 'COD_ARVORE' })
	arvore: Arvore;
}

