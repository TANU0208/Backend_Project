import { db } from "../database/db";
import { ItemEntity } from "../entity/item.entity";

export class ItemModelRepository {
  private static readonly tableName = "items";

  public static async create(item: ItemEntity): Promise<ItemEntity> {
    await db.query(`INSERT INTO ${this.tableName} SET ?`, item);
    const insertedItem: ItemEntity = {
      ...item,
    };
    return insertedItem;
  }

  public static async getAll() {
    const result = await db.query(`SELECT * FROM ${this.tableName}`);
    return result;
  }

  public static async getById(id: number) {
    const result = await db.query(
      `SELECT * FROM ${this.tableName} WHERE id = ?`,
      [id]
    );
    return result[0];
  }

  public static async update(id: number, item: ItemEntity) {
    await db.query(`UPDATE ${this.tableName} SET ? WHERE id = ?`, [item, id]);
    const updatedItem = { ...item };
    return updatedItem;
  }

  public static async delete(id: number): Promise<void> {
    await db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
  }
}
