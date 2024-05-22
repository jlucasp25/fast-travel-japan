/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulubwgvl4dq9yvy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uu9ypjsh",
    "name": "visited",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ulubwgvl4dq9yvy")

  // remove
  collection.schema.removeField("uu9ypjsh")

  return dao.saveCollection(collection)
})
