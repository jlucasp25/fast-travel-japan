/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulubwgvl4dq9yvy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgxqctwk",
    "name": "which",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "UFI",
        "UCA"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulubwgvl4dq9yvy")

  // remove
  collection.schema.removeField("bgxqctwk")

  return dao.saveCollection(collection)
})
