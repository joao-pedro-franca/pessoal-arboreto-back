import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Procedencia } from '../../procedencia/entities/procedencia.entity';

@Entity('microbioma')
export class Microbioma {
    @PrimaryGeneratedColumn({ name: 'cod_microbioma' })
    codMicrobioma: number;

    @Column({
        name: 'dcr_microbioma',
        length: 50, 
        nullable: false
    })
    dcrMicrobioma: string;

    @OneToMany(() => Procedencia, (procedencia) => procedencia.microbioma)
    procedencias: Procedencia[];
}