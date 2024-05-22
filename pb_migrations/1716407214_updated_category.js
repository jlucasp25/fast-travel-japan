/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htzi1dnrdhj7o32")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qypi7crk",
    "name": "icon",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("htzi1dnrdhj7o32")

  // remove
  collection.schema.removeField("qypi7crk")

  return dao.saveCollection(collection)
})
