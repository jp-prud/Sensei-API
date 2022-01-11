const StoresRepository = require('../repositories/StoresRepository');

class StoreController {
  async index(request, response) {
    const rows = await StoresRepository.findAll();

    if (rows === 0) {
      return response.status(400).json({
        error: 'Nenhuma loja foi cadastrada ainda',
      });
    }

    response.status(200).json(rows);
  }

  async show(request, response) {
    const { id } = request.params;

    const rows = await StoresRepository.findById(id);

    if (!rows) {
      return response.status(404).json({
        error: 'Loja não encontrada',
      });
    }

    response.status(200).json(rows);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({
        error: 'Nome é obrigatório',
      });
    }

    const storeExist = await StoresRepository.findByName(name);

    if (storeExist) {
      return response.status(400).json({
        error: 'Este nome de loja já foi cadastrado',
      });
    }

    const store = await StoresRepository.create(name);

    response.status(200).json({
      message: `${store.name} foi criado`,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const storeExist = await StoresRepository.findById(id);

    if (!storeExist) {
      return response.status(404).json({
        error: 'Não foi possível estar excluindo, está loja não existe.',
      });
    }

    const store = await StoresRepository.delete(id);

    response.status(200).json({
      message: `${store.name} foi excluído`,
    });
  }
}

module.exports = new StoreController();
