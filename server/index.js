const express = require("express");

//uuid key generator!
const { getId, getKey } = require("./util/key");

//to console log the key!
const { sendKey } = require("./service/email");

//different html views that will come in handy!
const { index, register, confirm } = require("./views/pages");

const db = require("./data/db");

//CRUD operations for client!
const ClientDao = require("./data/ClientDao");

const app = express();
const port = process.env.PORT || 5050;

db.connect();

const clients = new ClientDao();

// You need this to parse submitted form data!
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send(index());
});

app.get("/api/clients", async (req, res) => {
  // TODO users must not get the clients data unless
  //  they provide a valid API Key
  const {key} = req.query;
  if(key) {

    try {
      const id = getId(key);
      const data = await clients.readAll();
      const only_client_id = data.filter(client => client._id === id);
      if (only_client_id.length > 0) {
        return res.status(200).json({
          data,
        });
      } else {
        return res.status(403).json({ message: "Invalid API Key!" });
      }
    } catch (err) {
      return res.status(403).json({ message: "Invalid API Key!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid API Key!" });
  }
  
});

app.get("/register", (_req, res) => {
  res.send(register());
});

app.post("/register", async (req, res) => {
  const { name, email } = req.body;
  try {
    const data = await clients.create({ name, email });
    const key = getKey(data._id);
    sendKey(name, email, key);
    res.send(confirm(name, true));
  } catch (err) {
    res.send(confirm(name, false));
  }
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
