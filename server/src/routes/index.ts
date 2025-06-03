'use strict';

import frontend from './frontend';
import admin from './admin';

export default {
	frontend: {
		type: 'content-api',
		routes: [...frontend],
	},
	admin: {
		type: 'admin',
		routes: [...admin],
	},
};
