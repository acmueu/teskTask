import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm"
import { Wallet } from "./Wallet"

@Entity("user")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique:true
    })
    login: string

    @Column()
    password: string

    @OneToMany(
        ()=> Wallet,
        wallet=>wallet.user
    )
    wallets: Wallet[]


}
