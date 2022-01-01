import { v4 as uuid } from 'uuid'
import { Entity, Column, PrimaryColumn, CreateDateColumn, ManyToMany, JoinTable } from "typeorm";
import Permission from './Permision';

@Entity('roles')
class Role {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  @ManyToMany(() => Permission)
  @JoinTable({
    name: 'permissions_roles',
    joinColumns: [{ name: 'role_id' }],
    inverseJoinColumns: [{ name: 'permission_id' }]
  })
  permission: Permission[]

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default Role