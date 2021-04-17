import { Table, Column, Model, PrimaryKey, HasMany } from 'sequelize-typescript'
import { DataTypes } from 'sequelize'
import { Step } from './step.model'
import { Fix } from './fix.decorator'

@Fix
@Table({ tableName: 'stretches', timestamps: true, paranoid: true })
export class Stretch extends Model {
    @PrimaryKey
    @Column(DataTypes.UUIDV4)
    public uuid!: string

    @Column(DataTypes.STRING)
    name!: string

    @HasMany(() => Step)
    steps?: Step[]

    toDto() {
        return {
            uuid: this.uuid,
            name: this.name,
            steps: this.steps?.map(
                step => step.toDto()
            )
        }
    }
}