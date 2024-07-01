#!/usr/bin/env node

var argv = require('optimist')
    .usage('Convert a ProtoBuf.js JSON description in TypeScript definitions.\nUsage: $0')

    .demand('f')
    .alias('f', 'file')
    .describe('f', 'The JSON file')

    .boolean('c')
    .alias('c', 'camelCaseGetSet')
    .describe('c', 'Generate getter and setters in camel case notation')
    .default('c', true)

    .boolean('u')
    .alias('u', 'underscoreGetSet')
    .describe('u', 'Generate getter and setters in underscore notation')
    .default('u', false)

    .boolean('p')
    .alias('p', 'properties')
    .describe('p', 'Generate properties')
    .default('p', true)

    .argv;


var vinylFile = require('vinyl-file');
var proto2typescript = require('../dist/proto2typescript');

var file = vinylFile.readSync(argv.file);

proto2typescript(
    file.contents,
    {
        camelCaseGetSet: argv.camelCaseGetSet,
        underscoreGetSet: argv.underscoreGetSet,
        properties: argv.properties
    },
    function (err, out) {
        if (err != null) {
            console.error(err);
            process.exit(1);
        }
        else {
            process.stdout.write(out);
        }
    }
);
