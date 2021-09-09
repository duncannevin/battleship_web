export class User {
  id: string | null
  email: string | null
  createdAt: Date | null
  token: string | null

  constructor({ id, email, createdAt, token }: User) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.token = token;
  }
}
