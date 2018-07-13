// import SftpClient from './sftpClient';
const SftpClient = require('./sftpClient');
const util = require('util');

module.exports = exports;
const client = new SftpClient();

const getConfigAsync = async (path, env) => {
  const ssh = await client.connect();
  // await client.getSftp(ssh);
  const configFilePath = await client.getConfigFilePath(path, env);
  const configs = await client.getConfigContent(configFilePath);
  console.log(util.inspect(configs));
  return configs;
};

const configToJson = configs => {
  let res;
  const reg = /\r?\n/;
  if (configs) {
    res = configs.split(reg).reduce(function(o, pair) {
      pair = pair.split('=').map(p => p.trim());
      o[pair[0]] = pair[1];
      return o;
    }, {});
  }
  console.log(util.inspect(res));

  return res;
};

// getConfigAsync(process.env.CONFIGPATH, process.env.DEMOENV);
const test = async () => {
  const config = await getConfigAsync('/home/ubuntu/apps/envserver', 'demo');
  const jsonObject = configToJson(config);
};

test();
