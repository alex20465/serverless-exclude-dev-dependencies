"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
class ExcludeDevDependecies {
    constructor(serverless) {
        this.serverless = serverless;
        this.excludeDevelopmentDependencies();
    }
    excludeDevelopmentDependencies() {
        const output = child_process_1.execSync('npm list --production --parseable');
        const devModulePaths = output.toString()
            .split('\n')
            .filter((p) => !!p.trim())
            .map((p) => `${path_1.relative(process.cwd(), p)}/**`)
            .filter((p) => p.indexOf('node_modules') === 0);
        if (!this.serverless.service.package)
            this.serverless['service']['package'] = {};
        if (!this.serverless['service']['package']['include'])
            this.serverless['service']['package']['include'] = [];
        devModulePaths.forEach((path) => {
            this.serverless.cli.log(`ADD PATH ${path} TO package.include`);
            this.serverless['service']['package']['include'].push(path);
        });
    }
}
module.exports = ExcludeDevDependecies;
