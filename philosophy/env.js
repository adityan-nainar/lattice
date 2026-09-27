// Agora runs on the Lattice engine (../lattice) with its own name, starter content, look and data.
// Loaded ahead of the engine:  node --import ./env.js ../lattice/server.js
// Any of these can still be overridden from the shell, e.g. $env:PORT=4400.

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const set = (key, value) => {
  if (!process.env[key]) process.env[key] = value;
};

set('LATTICE_NAME', 'Agora');
set('LATTICE_SEED', path.join(here, 'seed.js'));
set('LATTICE_THEME', path.join(here, 'theme.css'));
set('LATTICE_DATA', path.join(here, 'data'));
set('PORT', '4324');
