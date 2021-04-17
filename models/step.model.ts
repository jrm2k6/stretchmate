import { Table, Column, Model, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { DataTypes } from 'sequelize';
import { Stretch } from './stretch.model';
import { Fix } from './fix.decorator';

@Fix
@Table({ tableName: 'steps', timestamps: true, paranoid: true })
export class Step extends Model {
    @PrimaryKey
    @Column(DataTypes.UUIDV4)
    uuid!: string

    @Column(DataTypes.INTEGER)
    order!: number

    @Column(DataTypes.STRING(512))
    description?: string

    @Column(DataTypes.INTEGER)
    duration?: number

    @Column(DataTypes.STRING)
    assetUrl?: string

    @Column(DataTypes.STRING)
    assetType?: string

    @ForeignKey(() => Stretch)
    @Column(DataTypes.UUIDV4)
    stretchUuid?: number

    @BelongsTo(() => Stretch)
    stretch?: Stretch

    toDto() {
        return {
            uuid: this.uuid,
            order: this.order,
            description: this.description,
            duration: this.duration,
            assetUrl: this.assetUrl,
            assetType: this.assetType,
            stretchUuid: this.stretchUuid,
        }
    }
}