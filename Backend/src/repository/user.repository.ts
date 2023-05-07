import { db } from "../database/db";
import { UserEntity } from "../entity/user.entity"

export class UserModelRepository {
    private static readonly tableName = "users";

    public static async create(user: any): Promise<UserEntity> {
        await db.query(`INSERT INTO ${this.tableName} SET ?`, user);
        const insertedUser: UserEntity = {
            ...user,
        };
    return insertedUser;
    }

    public static async findOne({ where: { username: string } }): Promise<UserEntity[]> {
        const result = await db.query(
            `SELECT * FROM ${this.tableName} WHERE username = ?`,
            [username]
        );
        return result[0];
    }
}
