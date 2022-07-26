import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User"


@Entity("token")
export class Token extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
    @OneToOne(
        () => User,
        user => user.id
    )
    @JoinColumn({
        name: 'user_id'
    })
    user: User 
    @Column({ name: 'user_id' })
    user_id: number;

    @Column({
        unique: true
    })
    refreshToken: string






}
