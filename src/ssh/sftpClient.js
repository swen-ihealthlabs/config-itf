const SSH2Promsie = require('ssh2-promise');
const util = require('util');
const path = require('path');

const sshconfig = {
  host: process.env.HOST || '35.180.87.37',
  username: process.env.USER || 'ubuntu',
  // username: 'ubuntu',
  identity:
    process.env.IDENTITY_PATH ||
    path.join(process.env.HOME, '.ssh/paris_aws_key_pair.pem')
};
let ssh;
let sshConnected;
let sftp;

const prefix = 'cardiomed';

const getSsh = async (config = null) => {
  const customConfig = Object.assign({}, sshconfig, config);
  if (!ssh) {
    ssh = new SSH2Promsie(customConfig);
  }
  ssh.on('ssh:connect', () => {
    sshConnected = true;
    console.log(`SSH Connection Satatus is ${sshConnected}`);
  });

  try {
    if (!sshConnected) {
      await ssh.connect();
    }
    console.log('SSH Connection established');
  } catch (err) {
    throw err;
  }
  return ssh;
};

const getSftp = async (ssh, _extSsh = null) => {
  const customSsh = _extSsh || ssh;
  if (!sftp) {
    try {
      sftp = await new SSH2Promsie.SFTP(customSsh);
      return sftp;
    } catch (err) {
      throw err;
    }
  }
  return sftp;
};

const getConfigList = async path => {
  let result = [];
  try {
    const list = await sftp.readdir(path);
    if (list) {
      const reg = new RegExp(prefix, 'g');
      result = list
        .filter(it => it.longname.charAt(0) === '-')
        .filter(it => reg.test(it.filename));
    }
  } catch (err) {
    throw err;
  }
  return result;
};

const getConfigFilePath = (configPath, env) => {
  let filePath = '';
  const configFiles = getConfigList(configPath) || [];
  if (configFiles && configFiles.length != 0) {
    configFile = configFiles
      .map(f => f.filename)
      .filter(name => name.split('.').pop() === env);

    const filePath = path.join(configPath, configFile);
  }

  return filePath;
};

const getConfigContent = async path => {
  let chunks = [];
  try {
    const stream = await sftp.createReadStream(path);
    return new Promise((resolve, reject) => {
      stream.on('readable', chunk => {
        chunks.push(chunk.toString());
      });
      stream.once('end', data => {
        console.log(`config file: ${path} has been read`);
        const jsonString = chunks.join('');
        resolve(jsonString);
      });
      stream.once('error', err => {
        console.log(`error occurs while reading stream from ${path}`, err);
        reject(err);
      });
    });
  } catch (err) {
    throw err;
  }
};
