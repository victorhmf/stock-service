import UserRepository from "../../../../domain/repositories/userRepository.js";
import db from "../index.js"

class PrismaUserRepository extends UserRepository {
  async create(user) {

    const {email, password, role, createdAt, updatedAt} = user

    const result = await db.user.create({
      data: {
        email,
        password,
        role,
        createdAt,
        updatedAt
      }
    })

    return result
  }
}

export default PrismaUserRepository;
