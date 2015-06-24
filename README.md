ACLI
===========
An interactive command line to manage ACL.

## Documentation
### Access Control Lists for Node
### Usage
create a config.json file and fill in the following values:
``` js
{
  "redis" : {
    "host": "127.0.0.1",
    "port": 6379
  },
  "mysql" : {
    "ttt" : {
      "host" : "local",
      "user" : "tt",
      "port" : 3316,
      "password" : "pass",
      "database" : "tt",
      "charset" : "utf8mb4",
      "dateStrings" : true
    }
  }

}
```
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
