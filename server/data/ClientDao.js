// TODO update this to persist data in MongoDB!

const Client = require("../model/Client");
const ApiError = require("../model/ApiError");
const { v4: uuidv4 } = require("uuid");


class ClientDao {
  constructor() {
    this.clients = [];
  }

  async create({ name, email }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every client must have a non-empty name!");
    }

    if (email === undefined || email === "") {
      throw new ApiError(400, "Every client must have a valid email!");
    }

    const client = await Client.create({_id: uuidv4(), name, email});
    return client;
  }

  // clients may not change their email!
  async update(id, { name }) {
    const client = await Client.findByIdAndUpdate(
      id,
      { name }, 
      { new: true, runValidators:true}
    );

    if (client === null) {
      throw new ApiError(404, "There is no client with the given ID!")
    }
  }

  async delete(id) {
    const client = await Client.findByIdAndDelete(id);
    if (client === null) {
      throw new ApiError(404, "There is no user with the given ID!");
    }
    return client;
  }

  // returns an empty array if there is no client with the given ID
  async read(id) {
    const client = await Client.findById(id);
    return client ? client : [];
  }

  // returns an empty array if there is no client in the database
  //  or no client matches the search queries
  async readAll(query = "") {

    const all_clients = await Client.find({});


    if (query !== "") {
      // const users = await Client.find({ query })
      return all_clients.filter(
        (client) => client.email.include(query) || note.name.includes(query)
      );
    }
    
    return all_clients;
  }
}

module.exports = ClientDao;
