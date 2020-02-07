'use strict';

class Colleague {
  constructor(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }
}

class Colleague1 extends Colleague {
  constructor(mediator) {
    super(mediator);
    mediator.colleague1 = this;
  }

  notify(message) {
    console.log('Colleague1 gets message: ' + message);
  }
}

class Colleague2 extends Colleague {
  constructor(mediator) {
    super(mediator);
    mediator.colleague2 = this;
  }

  notify(message) {
    console.log('Colleague2 gets message: ' + message);
  }
}

class Mediator {
  constructor() {
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

const mediator = new Mediator();
const colleague1 = new Colleague1(mediator);
const colleague2 = new Colleague2(mediator);
console.dir(mediator);

colleague1.send('Ping');
colleague2.send('Pong');
