const db = require('../../database');

class StoresRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT * FROM stores
    `);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT * FROM stores
      WHERE id = $1
    `, [id]);
    console.log(rows);
    return rows;
  }

  async findByName(name) {
    const [rows] = await db.query(`
      SELECT * FROM stores
      WHERE name = $1
    `, [name]);

    return rows;
  }

  async create(name) {
    const [rows] = await db.query(`
      INSERT INTO stores(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return rows;
  }

  async delete(id) {
    const [rows] = await db.query(`
      DELETE FROM stores
      WHERE id = $1
      RETURNING name
    `, [id]);

    return rows;
  }
}

module.exports = new StoresRepository();
