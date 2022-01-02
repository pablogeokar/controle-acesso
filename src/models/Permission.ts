import { v4 as uuid } from 'uuid'
import { Entity, Column, PrimaryColumn, CreateDateColumn } from "typeorm";

@Entity('permissions')
class Permission {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export default Permission