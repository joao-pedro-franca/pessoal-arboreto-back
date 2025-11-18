import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('bioma')
export class Bioma {
  @PrimaryGeneratedColumn({ name: 'COD_BIOMA' })
  codBioma: number;

  @Column({ name: 'DCR_BIOMA', length: 50 })
  descricaoBioma: string;
}
