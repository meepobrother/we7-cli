#!/usr/bin/env node
console.log('welcome to use meepo we7 tools');

const program = require('commander');
const chalk = require('chalk');
const init = require('../src/init');
const open = require('../src/open');
const table = require('../src/table');

const web = require('../src/web');
const mobile = require('../src/mobile');
const wxapp = require('../src/wxapp');

const path = process.cwd();
program
    .command('init')
    .description('创建模块')
    .alias('i')
    .action((jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        init.run(jsonfile);
    });
program
    .command('open')
    .description('创建借口')
    .alias('o')
    .action((name, jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        open.run(name, jsonfile);
    });
program
    .command('table')
    .description('创建数据库')
    .alias('t')
    .action((name, jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        table.run(name, jsonfile);
    });
program
    .command('web')
    .description('创建电脑端页面')
    .alias('w')
    .action((name, jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        web.run(name, jsonfile);
    });
program
    .command('mobile')
    .description('创建手机端页面')
    .alias('m')
    .action((name, jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        mobile.run(name, jsonfile);
    });
program
    .command('wxapp')
    .description('创建小程序')
    .alias('wi')
    .action((jsonfile) => {
        if (typeof jsonfile === 'string') {
            jsonfile = path + '/' + jsonfile;
        } else {
            jsonfile = path + '/package.json';
        }
        init.run(jsonfile);
        wxapp.run(jsonfile);
    });
program.parse(process.argv);