let path1 = require('path');
const ts_module_path = __dirname + '/';
const js_module_path = ts_module_path + '/../../../modules/js/';

const { classes, vedraj } = require(ts_module_path + 'classes');
const { prptotest } = require(js_module_path + 'proto-test');

console.log(`Vedraj is ${(vedraj.isAlive()) ? 'alive' : 'dead'}`);
