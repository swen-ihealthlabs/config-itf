const SSH2Promsie = require('ssh2-promise');
const util = require('util');
const path = require('path');
// import SSH2Promsie from 'ssh2-promise';
// import util from 'util';
// import path from 'path';

const sshconfig = {
  host: process.env.HOST || '35.180.41.80',
  username: process.env.USERNAME || 'ubuntu',
  // username: 'ubuntu',
  identity:
    process.env.IDENTITY_PATH ||
    path.join(process.env.HOME, '.ssh/paris_aws_key_pair.pem')
};

let ssh;
let sshConnected;
let sftp;

const prefix = 'cardiomed';

module.exports = class SftpClient {
  async connect(config = null) {
    const customConfig = Object.assign({}, sshconfig, config);
    if (!ssh) {
      ssh = new SSH2Promsie(customConfig);
      sftp = new SSH2Promsie.SFTP(ssh);
    }
    try {
      if (!sshConnected) {
        await ssh.connect();
        sshConnected = true;
      }
      console.log('SSH Connection established');
    } catch (err) {
      throw err;
    }
    return ssh;
  }

  // async getSftp(ssh, _extSsh = null) {
  //   const customSsh = _extSsh || ssh;
  //   if (!sftp) {
  //     try {
  //       sftp = await new SSH2Promsie.SFTP(customSsh);
  //       return sftp;
  //     } catch (err) {
  //       throw err;
  //     }
  //   }
  //   return sftp;
  // }

  async getConfigList(path) {
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
  }

  async getConfigFilePath(configPath, env) {
    let filePath = '';
    const configFiles = (await this.getConfigList(configPath)) || [];
    if (configFiles && configFiles.length != 0) {
      let configFile = configFiles
        .map(f => f.filename)
        .filter(name => name.split('.').pop() === env);

      // consider to offer a default config file in case of non match to env
      configFile = configFile && configFile.length != 0 ? configFile[0] : '';
      filePath = path.join(configPath, configFile);
    }

    return filePath;
  }

  async getConfigContent(path) {
    let chunks = [];
    try {
      const stream = await sftp.createReadStream(path);
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => {
          chunks.push(chunk.toString());
        });
        stream.once('end', data => {
          console.log(`config file: ${path} has been read`);
          const configs = chunks.join('');
          resolve(configs);
        });
        stream.once('error', err => {
          console.log(`error occurs while reading stream from ${path}`, err);
          reject(err);
        });
      });
    } catch (err) {
      throw err;
    }
  }
};
