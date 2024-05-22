/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ulubwgvl4dq9yvy",
    "created": "2024-05-22 11:37:12.831Z",
    "updated": "2024-05-22 11:37:12.831Z",
    "name": "point_of_interest",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "2dkwkuh6",
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
        "id": "sturzfaa",
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
        "id": "npyfixjq",
        "name": "district",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "mhc7b8w5fnc7nip",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "dce2sdlm",
        "name": "location",
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
      "CREATE UNIQUE INDEX `idx_TCGifBO` ON `point_of_interest` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("ulubwgvl4dq9yvy");

  return dao.deleteCollection(collection);
})
