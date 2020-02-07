'use strict';

class Accounts {
  constructor() {
    this.users = new Map();
  }

  createUser(login, password, group) {
    this.users.set(login, { login, password, group });
  }

  checkUserPassword(login, password) {
    const account = this.users.get(login);
    if (!account) return false;
    return account.password === password;
  }

  getUserGroup(login) {
    const account = this.users.get(login);
    if (!account) return undefined;
    return account.group;
  }
}

class Logger {
  static color(level) {
    return Logger.COLORS[level] || Logger.COLORS.info;
  }

  log(level, s) {
    const date = new Date().toISOString();
    const color = Logger.color(level);
    console.log(color + date + '\t' + s + '\x1b[0m');
  }

  warn(s) {
    this.log('warn', s);
  }

  error(s) {
    this.log('error', s);
  }

  info(s) {
    this.log('info', s);
  }
}

Logger.COLORS = {
  warn: '\x1b[1;33m',
  error: '\x1b[0;31m',
  info: '\x1b[1;37m',
};

// Mediator

class Authenticator {
  constructor(accounts, logger) {
    this.accounts = accounts;
    this.logger = logger;
  }

  check(login, password) {
    if (!login || !password) {
      this.logger.error('No login or password passed to auth');
      return false;
    }
    const valid = this.accounts.checkUserPassword(login, password);
    if (!valid) {
      this.logger.warn(`Password is not valid for ${login}`);
      return false;
    }
    this.logger.info(`User ${login} logged in`);
    return true;
  }
}

// Usage

const accounts = new Accounts();
accounts.createUser('marcus', '12345', 'emperors');

const logger = new Logger();

const authenticator = new Authenticator(accounts, logger);
console.dir(authenticator);

authenticator.check('marcus');
authenticator.check('marcus', 'qwerty');
authenticator.check('marcus', '12345');
