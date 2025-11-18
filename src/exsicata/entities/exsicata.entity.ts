import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Arvore } from 'src/arvore/entities/arvore.entity';

@Entity('exsicata')
export class Exsicata {
	@PrimaryGeneratedColumn({ name: 'COD_EXSICATA' })
	codExsicata: number;

	@Column({ name: 'DCR_EXSICATA', length: 50 })
	dcrExsicata: string;

	@Column({ name: 'DATA_EXSICATA', type: 'date' })
	dataExsicata: Date;

	@Column({ name: 'NOME_AUTOR', length: 50 })
	nomeAutor: string;

	@Column({ name: 'COD_HERBARIO', length: 50 })
	codHerbario: string;

	@ManyToOne(() => Arvore, (arvore) => arvore.exsicatas, { nullable: false })
	@JoinColumn({ name: 'COD_ARVORE' })
	arvore: Arvore;
}
