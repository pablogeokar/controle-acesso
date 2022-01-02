import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm'
import { v4 as uuid } from 'uuid'
import Role from './Role';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  created_at: Date

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }]
  })
  roles: Role[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default User