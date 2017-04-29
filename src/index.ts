import {exec} from 'child_process';
import {execSync} from 'child_process';
import {relative} from 'path';
class Test {

  public hooks: any = {};

  constructor(private serverless: any) {
    this.excludeDevelopmentDependencies();
  }

  excludeDevelopmentDependencies() {
    const output = execSync('npm list --dev --parseable');
    const devModulePaths = output.toString()
      .split('\n')
      .filter((p) => !!p.trim())
      .map((p) => `${relative(process.cwd(), p)}/**`);

    if (!this.serverless.service.package)
      this.serverless['service']['package'] = {};
    if (!this.serverless['service']['package']['exclude'])
      this.serverless['service']['package']['exclude'] = [];

    devModulePaths.forEach((path) => this.serverless['service']['package']['exclude'].push(path));
  }
}


module.exports = Test;
