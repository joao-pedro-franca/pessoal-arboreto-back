import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bioma } from '../../bioma/entities/bioma.entity';
import { Microbioma } from '../../microbioma/entities/microbioma.entity';
// import { ClasseProcedencia } from '../../classe-procedencia/entities/classe-procedencia.entity';
// import { ClasseAmeaca } from '../../classe-ameaca/entities/classe-ameaca.entity';
// import { Pais } from '../../pais/entities/pais.entity';
import { Especie } from '../../especie/entities/especie.entity';
import { Arvore } from '../../arvore/entities/arvore.entity';

@Entity('procedencia')
export class Procedencia {
    // primary key
    @PrimaryGeneratedColumn({ name: 'cod_procedencia' })
    codProcedencia: number;

    // foreign keys normais (nao compoem a pk)
    @Column({ name: 'cod_pais', nullable: true })
    codPais?: number;

    @Column({ name: 'cod_bioma', nullable: true })
    codBioma?: number;

    @Column({ name: 'cod_microbioma', nullable: true })
    codMicrobioma?: number;

    @Column({ name: 'cod_classe_procedencia', nullable: true })
    codClasseProcedencia?: number;

    @Column({ name: 'cod_classe_ameaca', nullable: true })
    codClasseAmeaca?: number;

    @Column({ name: 'cod_arvore', nullable: true })
    codArvore?: number;

    @Column({ name: 'cod_especie', nullable: true })
    codEspecie?: number;

    // relacionamentos 1:n
    /*
    @ManyToOne(() => Pais, (pais) => Pais.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_pais' })
    pais?: Pais;

    @ManyToOne(() => ClasseProcedencia, (classeProcedencia) => ClasseProcedencia.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_classe_procedencia' })
    classeProcedencia?: ClasseProcedencia;

    @ManyToOne(() => ClasseAmeaca, (classeAmeaca) => ClasseAmeaca.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_classe_ameaca' })
    classeAmeaca?: ClasseAmeaca;
    */

    @ManyToOne(() => Bioma, (bioma) => bioma.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_bioma' })
    bioma?: Bioma;

    @ManyToOne(() => Microbioma, (microbioma) => microbioma.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_microbioma' })
    microbioma?: Microbioma;

    @ManyToOne(() => Especie, (especie) => especie.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_especie' })
    especie?: Especie;
    
    @ManyToOne(() => Arvore, (arvore) => arvore.procedencias, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn({ name: 'cod_arvore' })
    arvore?: Arvore;
}
