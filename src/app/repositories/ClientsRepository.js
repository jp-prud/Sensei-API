const db = require('../../database');

class ClientsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const rows = await db.query(`
      SELECT clients.*,
      stores.name AS store_name, plans.name AS plan_name
      FROM clients
      LEFT JOIN stores ON stores.id = clients.store_id
      LEFT JOIN plans ON plans.id = clients.plan_id
      ORDER BY clients.name ${direction}
    `);

    return rows;
  }

  async findById(id) {
    const [rows] = await db.query(`
    SELECT clients.*,
    stores.name AS store_name, plans.name AS plan_name
    FROM clients
    LEFT JOIN stores ON stores.id = clients.store_id
    LEFT JOIN plans ON plans.id = clients.plan_id
    WHERE clients.id = $1
  `, [id]);

    return rows;
  }

  async findByName(name) {
    const [rows] = await db.query(`
      SELECT * FROM clients
      WHERE name = $1
    `, [name]);

    return rows;
  }

  async findByEmail(email) {
    const [rows] = await db.query(`
    SELECT * FROM clients
    WHERE email = $1
  `, [email]);

    return rows;
  }

  async create({
    name, email, phone, password, store_id, plan_id,
  }) {
    const [rows] = await db.query(`
      INSERT INTO clients(name, email, phone, password, store_id, plan_id)
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [name, email, phone, password, store_id, plan_id]);

    return rows;
  }

  async update(id, {
    name, email, phone, password, store_id, plan_id,
  }) {
    const [rows] = await db.query(`
      UPDATE clients
      SET
        name = $2, email = $3, phone = $4,
        password = $5, store_id = $6, plan_id = $7
      WHERE id = $1
      RETURNING *
    `, [id, name, email, phone, password, store_id, plan_id]);

    return rows;
  }

  async delete(id) {
    const [rows] = await db.query(`
      DELETE FROM clients
      WHERE id = $1
      RETURNING *
    `, [id]);

    return rows;
  }
}

module.exports = new ClientsRepository();
