import { createBackend } from '@backstage/backend-defaults';
import { createBackendModule } from '@backstage/backend-plugin-api';
import { microsoftGraphOrgEntityProviderTransformExtensionPoint } from '@backstage/plugin-catalog-backend-module-msgraph/alpha';
import { myUserTransformer } from './transformers';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../.env') });

const backend = createBackend();

backend.add(import('@backstage/plugin-app-backend/alpha'));
backend.add(import('@backstage/plugin-proxy-backend/alpha'));
backend.add(import('@backstage/plugin-scaffolder-backend/alpha'));
backend.add(import('@backstage/plugin-techdocs-backend/alpha'));

backend.add(
  createBackendModule({
    pluginId: 'catalog',
    moduleId: 'microsoft-graph-extensions',
    register(env) {
      env.registerInit({
        deps: {
          microsoftGraphTransformers: microsoftGraphOrgEntityProviderTransformExtensionPoint,
        },
        async init({ microsoftGraphTransformers }) {
          microsoftGraphTransformers.setUserTransformer(myUserTransformer);
        },
      });
    },
  })
);

backend.add(import('@backstage/plugin-auth-backend'));
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-microsoft-provider'));
backend.add(import('@backstage/plugin-auth-backend-module-google-provider'));

backend.add(import('@backstage/plugin-catalog-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-scaffolder-entity-model'));
backend.add(import('@backstage/plugin-permission-backend/alpha'));
backend.add(import('@backstage/plugin-permission-backend-module-allow-all-policy'));
backend.add(import('@backstage/plugin-search-backend/alpha'));
backend.add(import('@backstage/plugin-catalog-backend-module-msgraph/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-catalog/alpha'));
backend.add(import('@backstage/plugin-search-backend-module-techdocs/alpha'));

backend.start();
