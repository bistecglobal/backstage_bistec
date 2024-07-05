/*
 * Hi!
 *
 * Note that this is an EXAMPLE Backstage backend. Please check the README.
 *
 * Happy hacking!
 */

import { createBackend } from '@backstage/backend-defaults';
//Using custom Transformers
import { createBackendModule } from '@backstage/backend-plugin-api';
import { microsoftGraphOrgEntityProviderTransformExtensionPoint } from '@backstage/plugin-catalog-backend-module-msgraph/alpha';
import {
  myUserTransformer,
} from './transformers';


// Load environment variables from the .env file
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') })

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

//Custom transformer
backend.add(
  createBackendModule({
    pluginId: 'catalog',
    moduleId: 'microsoft-graph-extensions',
    register(env) {
      env.registerInit({
        deps: {
          microsoftGraphTransformers:
            microsoftGraphOrgEntityProviderTransformExtensionPoint,
        },
        async init({ microsoftGraphTransformers }) {
          microsoftGraphTransformers.setUserTransformer(myUserTransformer);
        },
      });
    },
  }),
);


// auth plugin
backend.add(import('@backstage/plugin-auth-backend'));
// See https://backstage.io/docs/backend-system/building-backends/migrating#the-auth-plugin
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));

//Auth plgin added for the microsoft provider
backend.add(import('@backstage/plugin-auth-backend-module-microsoft-provider'));
// See https://backstage.io/docs/auth/guest/provider

// catalog plugin
backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(
  import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'),
);

// permission plugin
backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(
  import('@backstage/plugin-permission-backend-module-allow-all-policy'),
);

// search plugin
backend.add(import('@backstage/plugin-search-backend/alpha'));
//Added msgraph alpha
backend.add(import('@backstage/plugin-catalog-backend-module-msgraph/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));



backend.start();
