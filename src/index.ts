import {exec} from 'child_process';
import {execSync} from 'child_process';
import {relative} from 'path';

class ExcludeDevDependecies {

  constructor(private serverless: any) {
    this.excludeDevelopmentDependencies();
  }

  excludeDevelopmentDependencies() {
    const output = execSync('npm list --production --parseable');
    const devModulePaths = output.toString()
      .split('\n')
      .filter((p) => !!p.trim())
      .map((p) => `${relative(process.cwd(), p)}/**`)
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
