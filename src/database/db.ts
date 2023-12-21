import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import dataSchema from './dataSchema';

addRxPlugin(RxDBDevModePlugin);

const createDatabase = async () => {
  const db = await createRxDatabase({
    name: 'myDataBase',
    storage: getRxStorageDexie(),
    multiInstance: false,
  });

  const myCollection = await db.collection({
    name: 'myCollection',
    schema: dataSchema,
  });

  return db;
};

export default createDatabase;