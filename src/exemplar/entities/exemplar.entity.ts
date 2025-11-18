import { BeforeInsert, Entity, PrimaryColumn } from "typeorm";
import { Column } from "typeorm";

const {nanoid} = require('nanoid');

@Entity('exemplares')
export class Exemplar {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    sizeHeight: number;

    @Column()
    sizeWidth: number;

    @Column()
    dateOfplanted: string;

    @BeforeInsert()
    generateId() {
        this.id = `uescArboreto_${nanoid()}`;
    }
}
