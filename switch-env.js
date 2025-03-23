// switch-env.js
const fs = require('fs');
const env = process.argv[2]; // "local" o "prod"

if (!env || !['local', 'prod'].includes(env)) {
  console.error('❌ Uso: node switch-env.js [local|prod]');
  process.exit(1);
}

const target = `.env.${env === 'local' ? 'local' : 'production.local'}`;
const dest = `.env.local`;

fs.copyFileSync(target, dest);
console.log(`✅ Archivo .env.local actualizado para entorno: ${env}`);
