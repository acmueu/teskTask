import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BaseEntity } from "typeorm"
import { Wallet } from "./Wallet"

@Entity("expense")
export class Expense extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    amount: number
    
    @ManyToOne(
        ()=>Wallet,
        wallet=>wallet.expenses
    )
    @JoinColumn({
        name:'wallet_id'
    })
    wallet:Wallet
    @Column({ name: 'wallet_id' })
    wallet_id: number;
}
