"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
class Test {
    constructor(serverless) {
        this.serverless = serverless;
        this.hooks = {};
        this.hooks['before:deploy:resources'] = this.excludeDevelopmentDependencies.bind(this);
    }
    excludeDevelopmentDependencies() {
        const output = child_process_1.execSync('npm list --dev --parseable');
        const devModulePaths = output.toString()
            .split('\n')
            .filter((p) => !!p.trim())
            .map((p) => `${path_1.relative(process.cwd(), p)}/**`);
        if (!this.serverless.service.package)
            this.serverless['service']['package'] = {};
        if (!this.serverless['service']['package']['exclude'])
            this.serverless['service']['package']['exclude'] = [];
        devModulePaths.forEach((path) => this.serverless['service']['package']['exclude'].push(path));
    }
}
module.exports = Test;
