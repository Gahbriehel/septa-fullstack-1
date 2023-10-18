const db = require("../config/connection");

const getItemByName = async (name) => {
  const query = "SELECT * FROM items WHERE name = $1";
  return db.query(query, [name]);
};

const getItemById = async (id) => {
  const query = "SELECT * FROM items WHERE id = $1";
  return db.query(query, [id]);
};

const getAllItems = async () => {
  const query = "SELECT * FROM items";
  const { rows } = await db.query(query);
  return rows;
};

const addNewItem = async (body) => {
  const { name, price, weight } = body;

  const existingItem = await getItemByName(name);

  if (existingItem.rowCount > 0) {
    return {
      itemExist: true,
      items: [],
    };
  }

  const text =
    "INSERT INTO items(name, price, weight) VALUES($1, $2, $3) RETURNING *";
  const values = [name, price, weight];

  const { rows } = await db.query(text, values);
  return {
    itemExist: false,
    items: rows,
  };
};

const updateItem = async (id, body) => {
  const { name, weight, price } = body;
  const query =
    "UPDATE items SET name = $1, weight = $2, price = $3 WHERE id = $4";
  const existingItem = await getItemById(id);
  if (existingItem.rowCount <= 0) {
    return {
      itemExist: false,
      items: [],
    };
  }
  await db.query(query, [name, weight, price, id]);

  return {
    itemExist: true,
    items: [],
  };
};

const deleteItem = async (id) => {
  const query = "DELETE FROM items WHERE id = $1";
  const existingItem = await getItemById(id);
  if (existingItem.rowCount <= 0) {
    return {
      itemExist: false,
      items: [],
    };
  }

  const { rows } = await db.query(query, [id]);
  return {
    itemExist: true,
    items: rows,
  };
};

module.exports = {
  getAllItems,
  addNewItem,
  updateItem,
  deleteItem,
  getItemById,
};
