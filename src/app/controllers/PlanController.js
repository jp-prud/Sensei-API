const PlansRepository = require('../repositories/PlansRepository');

class PlanController {
  async index(request, response) {
    const rows = await PlansRepository.findAll();

    return response.status(200).json(rows);
  }

  async store(request, response) {
    const { name, price, description } = request.body;

    if (!name) {
      return response.status(404).json({
        error: 'Nome é obrigatório',
      });
    }

    if (!price) {
      return response.status(404).json({
        error: 'Preço é obrigatório',
      });
    }

    const planExist = await PlansRepository.findByName(name);

    if (planExist) {
      return response.status(400).json({
        error: 'Este nome já esta sendo usado',
      });
    }

    const row = await PlansRepository.create({ name, price, description });

    response.status(200).json(row);
  }
}

module.exports = new PlanController();
