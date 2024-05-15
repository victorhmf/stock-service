import UserRepository from "../../../../domain/repositories/userRepository.js";
import db from "../index.js"

class PrismaUserRepository extends UserRepository {
  async create(user) {

    const { email, password, role, createdAt, updatedAt } = user

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

  async findByEmail(email) {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user
  }
}

export default PrismaUserRepository;
