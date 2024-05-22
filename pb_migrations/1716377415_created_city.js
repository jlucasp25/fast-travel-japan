/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "s3mdbgw0mkfibhu",
    "created": "2024-05-22 11:30:15.783Z",
    "updated": "2024-05-22 11:30:15.783Z",
    "name": "city",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "frdeplr0",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ay4qiz6q",
        "name": "photo",
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
      },
      {
        "system": false,
        "id": "uikhqkid",
        "name": "polygon",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_Uti8H84` ON `city` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("s3mdbgw0mkfibhu");

  return dao.deleteCollection(collection);
})
