import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { projectSchema } from './dataSchema';

addRxPlugin(RxDBDevModePlugin);

const createDatabase = async () => {
  const db = await createRxDatabase({
    name: 'myDataBase',
    storage: getRxStorageDexie(),
    multiInstance: false,
  });

  await db.addCollections({
    projects: {
      schema: projectSchema,
    },
  });

  return db;
};

export default createDatabase;
