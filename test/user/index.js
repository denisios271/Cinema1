"use strict";
process.env.NODE_ENV = 'test';
var superagent = require('superagent');
var assert = require('assert');
var websiteConfig = require("../../website.config.js");

var url = websiteConfig.websiteUrl + "/user/";
describe("/user/", function(){
    this.timeout(5000);
    
    require("./auth")(superagent, assert, url, websiteConfig.tester);
    require("./exit")(superagent, assert, url, websiteConfig.tester);

    require("./id")(superagent, assert, url);
    require("./name")(superagent, assert, url);
    require("./all")(superagent, assert, url);

    require("./post")(superagent, assert, url);
    require("./put")(superagent, assert, url);
    require("./delete")(superagent, assert, url);
});