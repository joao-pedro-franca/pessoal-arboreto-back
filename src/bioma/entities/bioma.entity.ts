import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Procedencia } from 'src/procedencia/entities/procedencia.entity';

@Entity('bioma')
export class Bioma {
  @PrimaryGeneratedColumn({ name: 'COD_BIOMA' })
  codBioma: number;

  @Column({ name: 'DCR_BIOMA', length: 50 })
  descricaoBioma: string;

  @OneToMany(() => Procedencia, (procedencia) => procedencia.bioma)
  procedencias: Procedencia[];
}
