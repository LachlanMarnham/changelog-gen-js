'use strict';

import { gitStatus, isClean } from './modules/git.js';

var bar = await isClean();
