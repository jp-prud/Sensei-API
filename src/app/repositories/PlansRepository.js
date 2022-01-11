const db = require('../../database');

class PlansRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT * FROM plans
    `);

    return rows;
  }

  async findByName(name) {
    const [rows] = await db.query(`
      SELECT * FROM plans
      WHERE name = $1
    `, [name]);

    return rows;
  }

  async create({ name, price, description }) {
    const [rows] = await db.query(`
      INSERT INTO plans (name, price, description)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, price, description]);

    return rows;
  }
}

module.exports = new PlansRepository();
