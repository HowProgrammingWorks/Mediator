'use strict';

class Colleague {
  constructor(mediator) {
    const proto = Object.getPrototypeOf(this);
    if (proto.constructor === Colleague) {
      throw new Error('Abstract class should not be instanciated');
    }
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }

  notify(message) {
    const s = JSON.stringify({ notify: message });
    throw new Error('Method is not implemented: ' + s);
  }
}

class Mediator {
  send(message, sender) {
    const s = JSON.stringify({ send: { message, sender } });
    throw new Error('Method is not implemented: ' + s);
  }
}

class ConcreteColleague1 extends Colleague {
  constructor(mediator) {
    super(mediator);
    mediator.colleague1 = this;
  }

  notify(message) {
    console.log('Colleague1 gets message: ' + message);
  }
}

class ConcreteColleague2 extends Colleague {
  constructor(mediator) {
    super(mediator);
    mediator.colleague2 = this;
  }

  notify(message) {
    console.log('Colleague2 gets message: ' + message);
  }
}

class ConcreteMediator extends Mediator {
  constructor() {
    super();
    this.colleague1 = null;
    this.colleague2 = null;
  }

  send(message, sender) {
    if (sender === this.colleague2) {
      this.colleague1.notify(message);
    } else {
      this.colleague2.notify(message);
    }
  }
}

// Usage

const mediator = new ConcreteMediator();
const colleague1 = new ConcreteColleague1(mediator);
const colleague2 = new ConcreteColleague2(mediator);
console.dir(mediator);

colleague1.send('Ping');
colleague2.send('Pong');
