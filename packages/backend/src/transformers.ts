import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
import {
  defaultUserTransformer,
} from '@backstage/plugin-catalog-backend-module-msgraph';
import { UserEntity } from '@backstage/catalog-model';

// This group transformer completely replaces the built in logic with custom logic.
export async function myUserTransformer(
 
    graphUser: MicrosoftGraph.User,
    userPhoto?: string,
  ): Promise<UserEntity | undefined> {
  
    graphUser.mail = graphUser.mail || graphUser.userPrincipalName;
  
  
    const backstageUser = await defaultUserTransformer(graphUser, userPhoto);
    
    if (backstageUser) {
      backstageUser.metadata.description = 'Loaded from Microsoft Entra ID';
      
    }
  
    return backstageUser;
  }