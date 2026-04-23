// Server entrypoint builder for production
import * as esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/server/server.cjs',
  format: 'cjs',
  // Exclude node_modules holding native dependencies and problematic modules
  external: ['mongoose', 'bcryptjs', 'express', 'cors', 'cloudinary', 'multer', 'jsonwebtoken', 'vite']
}).catch(() => process.exit(1));
