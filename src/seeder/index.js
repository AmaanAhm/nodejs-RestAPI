const userSeeder = require('./userSeeder');
const roleSeeder = require('./roleSeeder');

async function seed() {
  await userSeeder.seed();
  await roleSeeder.seed();
}

seed()
  .then(() => {
    console.log('Seeders finished successfully');
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
