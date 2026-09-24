// Stack's starter content, written to data/lattice.json the first time Stack runs.
// After that the data file is the source of truth. To add more to an existing library,
// write a content pack and run: npm run merge -- <pack.js>

import { existsSync } from 'node:fs';

import { AI_EXTRA_ENTRIES } from './content/ai-extra.js';
import { BACK_ENTRIES } from './content/backend.js';
import { BASIC_CODE_ENTRIES } from './content/basics-code.js';
import { BASIC_LINKS } from './content/basics-links.js';
import { BASIC_MATHS_ENTRIES } from './content/basics-maths.js';
import { CLOUD_ENTRIES } from './content/cloud.js';
import { CS_ENTRIES } from './content/cs.js';
import { EXTRA_LINKS } from './content/extra-links.js';
import { FASTAPI_ENTRIES } from './content/fastapi.js';
import { FRONT_ENTRIES } from './content/frontend.js';
import { HELP } from './content/help.js';
import { AREAS } from './content/helpers.js';
import { LINKS } from './content/links.js';
import { LLM_ENTRIES } from './content/llm.js';
import { LOCAL_ENTRIES } from './content/local.js';
import { ROUTE } from './content/path.js';
import { ML_ENTRIES } from './content/ml.js';
import { PIPELINE_ENTRIES } from './content/pipelines.js';
import { DATA_ENTRIES } from './content/postgres.js';
import { SHIP_ENTRIES } from './content/shipping.js';
import { STORY_ENTRIES } from './content/stories.js';
import { WEB_ENTRIES } from './content/web.js';

// Topics built from private documents (tech/private/, git-ignored) join the library when present.
const privateFile = new URL('./private/index.js', import.meta.url);
const PRIVATE = existsSync(privateFile) ? (await import(privateFile.href)).PRIVATE : null;

export const SEED = {
  areas: [...AREAS.slice(0, -2), ...(PRIVATE?.areas || []), ...AREAS.slice(-2)],
  entries: [
    ...BASIC_CODE_ENTRIES,
    ...BASIC_MATHS_ENTRIES,
    ...WEB_ENTRIES,
    ...FRONT_ENTRIES,
    ...BACK_ENTRIES,
    ...FASTAPI_ENTRIES,
    ...DATA_ENTRIES,
    ...ML_ENTRIES,
    ...LLM_ENTRIES,
    ...AI_EXTRA_ENTRIES,
    ...LOCAL_ENTRIES,
    ...SHIP_ENTRIES,
    ...CLOUD_ENTRIES,
    ...PIPELINE_ENTRIES,
    ...CS_ENTRIES,
    ...STORY_ENTRIES,
    ...(PRIVATE?.entries || []),
    HELP,
  ],
  links: [...LINKS, ...BASIC_LINKS, ...EXTRA_LINKS, ...(PRIVATE?.links || [])],
  route: PRIVATE ? { ...ROUTE, stages: [...ROUTE.stages, ...PRIVATE.stages] } : ROUTE,
};

export default SEED;
