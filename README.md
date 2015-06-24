ACLI
===========
An interactive command line to manage ACL.

## Documentation
### Access Control Lists for Node
### Usage
``` shell
vim config.json
npm install
node index.js
```
### Commands
``` shell
users
addUserRoles       userId roles
removeUserRoles    userId roles
userRoles          userId
roleUsers          roleName
hasRole            userId rolename
addRoleParents     role parents
removeRole         role
removeResource     resource
allow              roles resources permissions
removeAllow        role resources permissions
removePermissions  role resources permissions
allowedPermissions userId resources
isAllowed          userId resource permissions
areAnyRolesAllowed roles resource permissions
whatResources      roles permissions
permittedResources roles permissions
```
