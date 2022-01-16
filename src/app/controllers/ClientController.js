const ClientsRepository = require('../repositories/ClientsRepository');

class ClientController {
  async index(request, response) {
    const { orderBy } = request.query;

    const clients = await ClientsRepository.findAll(orderBy);

    response.status(200).json(clients);
  }

  async show(request, response) {
    const { id } = request.params;

    const client = await ClientsRepository.findById(id);

    if (!client) {
      return response.status(404).json(
        { error: 'No client found' },
      );
    }

    response.status(200).json(client);
  }

  async store(request, response) {
    const {
      name, email, phone, password, store_id, plan_id,
    } = request.body;

    const clientByEmail = await ClientsRepository.findByEmail(email);

    if (clientByEmail) {
      return response.status(400).json({
        error: 'Email já está sendo usado',
      });
    }

    const newClient = await ClientsRepository.create({
      name, email, phone, password, store_id, plan_id,
    });

    return response.status(200).json(
      { error: `${newClient.name}, criou a sua conta` },
    );
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, password, store_id, plan_id,
    } = request.body;

    const clientExist = await ClientsRepository.findById(id);

    if (!clientExist) {
      return response.status(404).json({
        error: 'Client not found',
      });
    }

    if (!email) {
      return response.status(400).json({
        error: 'Email is required',
      });
    }

    const clientByEmail = await ClientsRepository.findByEmail(email);

    if (clientByEmail && clientByEmail.id !== id) {
      return response.status(400).json({
        error: 'Email is already in use',
      });
    }

    const updatedClient = await ClientsRepository.update(id, {
      name, email, phone, password, store_id, plan_id,
    });

    response.status(200).json({
      error: `Cliente ${updatedClient.name} foi atualizado`,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const clientExist = await ClientsRepository.findById(id);

    if (!clientExist) {
      return response.status(404).json(
        { error: 'Cliente não encontrado' },
      );
    }

    const client = await ClientsRepository.delete(id);

    response.status(200).json({
      error: `${client.name} foi excluído`,
    });
  }
}

module.exports = new ClientController();
