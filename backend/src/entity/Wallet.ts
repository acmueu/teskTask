import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm"
import { Expense } from "./Expense"
import { Income } from "./Income"
import { User } from "./User"

@Entity("wallet")
export class Wallet extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    amount: number

    @ManyToOne(
        () => User,
        user => user.wallets
    )
    @JoinColumn({
        name: 'user_id'
    })
    user: User
    @Column({ name: 'user_id' })
    user_id: number;
    @OneToMany(
        ()=>Income,
        income=>income.wallet
    )
    incomes: Income[]
    @OneToMany(
        ()=>Expense,
        expense=>expense.wallet
    )
    expenses: Expense[]






}
