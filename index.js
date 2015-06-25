"use strict";
var config = require('./config.json');

var inquirer = require("inquirer");
var Acl = require("acl");

var Redis = require("redis");
var redis = Redis.createClient(config.redis.port, config.redis.host,  {no_ready_check: true});
var backend = new Acl.redisBackend(redis);
var acl = new Acl(backend);

var mysql      = require('mysql');
var pool = mysql.createPool(config.mysql.ttt);

var Users = require("./lib/users.js");
var users = new Users(pool);

var questions = [
  {
    type: "input",
    name: "cli",
    message: ">"
  }
];

function ask() {
  inquirer.prompt( questions, function( answers ) {
    var args = answers.cli.trim().split(" ");

    if ( args[0] === 'exit' ) {
      redis.end();
      pool.end();
      console.log( "bye");
      return;
    } else if ( args[0] === 'help' ) {
      console.log( "exit");
      console.log( "users");
      console.log( "addUserRoles       userId roles");
      console.log( "removeUserRoles    userId roles");
      console.log( "userRoles          userId");
      console.log( "roleUsers          roleName");
      console.log( "hasRole            userId rolename");
      console.log( "addRoleParents     role parents");
      console.log( "removeRole         role");
      console.log( "removeResource     resource");
      console.log( "allow              roles resources permissions");
      console.log( "removeAllow        role resources permissions");
      console.log( "removePermissions  role resources permissions");
      console.log( "allowedPermissions userId resources");
      console.log( "isAllowed          userId resource permissions");
      console.log( "areAnyRolesAllowed roles resource permissions");
      console.log( "whatResources      roles permissions");
      console.log( "permittedResources roles permissions");

    } else if ( args[0] ==='users' ) {
      users.list();

    } else if ( args[0] === 'allow' ) {
      acl.allow(args[1], args[2], args[3], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'allowedPermissions' ) {
      acl.allowedPermissions(args[1], args[2], function (err, permissions) {
        if (err) console.log(err);
        console.dir(permissions);
      });

    } else if ( args[0] === 'addUserRoles' ) {
      acl.addUserRoles(args[1], args[2], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'isAllowed' ) {
      acl.isAllowed(args[1], args[2], args[3], function (err, allowed) {
        if (err) console.log(err);
        console.log(allowed);
      });

    } else if ( args[0] === 'removeUserRoles' ) {
      acl.removeUserRoles(args[1], args[2], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'userRoles' ) {
      acl.userRoles(args[1], function (err, roles) {
        if (err) console.log(err);
        console.dir(roles);
      });

    } else if ( args[0] === 'roleUsers' ) {
      acl.roleUsers(args[1], function (err, users) {
        if (err) console.log(err);
        console.log(users);
      });

    } else if ( args[0] === 'hasRole' ) {
      acl.hasRole(args[1], args[2], function (err, is_in_role) {
        if (err) console.log(err);
        console.log(is_in_role);
      });

    } else if ( args[0] === 'addRoleParents' ) {
      acl.addRoleParents(args[1], args[2], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'removeRole' ) {
      acl.removeRole(args[1], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'removeResource' ) {
      acl.removeResource (args[1], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'removeAllow' ) {
      acl.removeAllow(args[1], args[2], args[3], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'removePermissions' ) {
      acl.removePermissions(args[1], args[2], args[3], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'areAnyRolesAllowed' ) {
      acl.areAnyRolesAllowed(args[1], args[2], args[3], function (err) {
        if (err) console.log(err);
      });

    } else if ( args[0] === 'whatResources' ) {
      acl.whatResources(args[1], args[2], function (err, resources) {
        if (err) console.log(err);
        console.log(resources);
      });

    } else if ( args[0] === 'permittedResources' ) {
      acl.permittedResources(args[1], args[2], function (err) {
        if (err) console.log(err);
      });

    } else if ( args.length === 0 || args[0] === '' ) {
      //nothing
    } else {
      console.log( "command not found");
    }
    ask();
  });
}

ask();
