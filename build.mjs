import { build } from 'vite';

console.log('🏗 Building with Vite API...');

build()
  .then(() => console.log('✅ Vite build complete.'))
  .catch((err) => {
    console.error('❌ Build failed:', err);
    process.exit(1);
  });
