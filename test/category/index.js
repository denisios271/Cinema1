"use strict";
process.env.NODE_ENV = 'test';
var superagent = require('superagent');
var assert = require('assert');
var websiteConfig = require("../../website.config.js");

var url = websiteConfig.websiteUrl + "/category/";
describe("/category/", function(){
    this.timeout(5000);
    
    require("./all")(superagent, assert, url);
    require("./id")(superagent, assert, url);
    require("./alt_name")(superagent, assert, url);
    require("./post")(superagent, assert, url, websiteConfig.tester);
    require("./put")(superagent, assert, url, websiteConfig.tester);
    require("./delete")(superagent, assert, url, websiteConfig.tester);
});