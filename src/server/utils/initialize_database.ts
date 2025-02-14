import fs from 'node:fs/promises';

import { Database } from 'sqlite3';

import { DATABASE_PATH, DATABASE_SEED_PATH } from './database_paths';

export const initializeDatabase = async () => {
  await fs.copyFile(DATABASE_SEED_PATH, DATABASE_PATH);

  const db = new Database(DATABASE_PATH);
  const execPromise = (sql: string) =>
    new Promise<void>((resolve, reject) => db.exec(sql, (err) => (err ? reject(err) : resolve())));

  await execPromise('CREATE INDEX IF NOT EXISTS media_filename_idx ON media_file (filename);');
  await execPromise('CREATE INDEX IF NOT EXISTS user_email_idx ON user (email);');
  await execPromise('CREATE INDEX IF NOT EXISTS limited_time_offer_productId_idx ON limited_time_offer (productId);');
  await execPromise(
    'CREATE INDEX IF NOT EXISTS limited_time_offer_date_idx ON limited_time_offer (startDate, endDate);',
  );
  await execPromise(
    'CREATE INDEX IF NOT EXISTS product_media_productId_fileId_idx ON product_media (productId, fileId);',
  );
  await execPromise('CREATE INDEX IF NOT EXISTS shopping_cart_item_productId_idx ON shopping_cart_item (productId);');
  await execPromise('CREATE INDEX IF NOT EXISTS shopping_cart_item_orderId_idx ON shopping_cart_item (orderId);');
  await execPromise('CREATE INDEX IF NOT EXISTS order_userId_isOrdered_idx ON "order" (userId, isOrdered);');
  await execPromise('CREATE INDEX IF NOT EXISTS profile_userId_idx ON profile (userId);');
  await execPromise('CREATE INDEX IF NOT EXISTS review_productId_postedAt_index ON review (productId, postedAt);');
  await execPromise(
    'CREATE INDEX IF NOT EXISTS feature_item_sectionId_productId_idx ON feature_item (sectionId, productId);',
  );
  await execPromise('CREATE INDEX IF NOT EXISTS recommendation_productId_idx ON recommendation (productId);');

  await new Promise<void>((resolve, reject) => db.close((err) => (err ? reject(err) : resolve())));
};
