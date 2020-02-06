'use strict';

class Colleague {
  constructor(mediator) {
    const proto = Object.getPrototypeOf(this);
    if (proto === Colleague) {
      throw new Error('Abstract class should not be instanciated');
    }
    this.mediator = mediator;
  }

  send(message) {
    mediator.send(message, this);
  }

  notify(message) {
    const s = JSON.stringify({ notify: message });
    throw new Error('Method is not implemented: ' + s);
  };
}

class Mediator {
  send(message, sender) {
    const s = JSON.stringify({ send: message });
    throw new Error('Method is not implemented: ' + s);
  };
}

class ConcreteColleague1 extends Colleague {
  constructor(mediator) {
    super(mediator);
  }

  notify(message) {
    console.log('Colleague1 gets message: ' + message);
  }
}

class ConcreteColleague2 extends Colleague {
  constructor(mediator) {
    super(mediator);
  }

  notify(message) {
    console.log('Colleague2 gets message: ' + message);
  }
}

class ConcreteMediator extends Mediator {
  constructor(mediator) {
    super();
    this.colleague1 = null;
    this.colleague2 = null;
  }

  setColleague1(colleague) {
    this.colleague1 = colleague;
  }

  setColleague2(colleague) {
    this.colleague2 = colleague;
  }

  send(message, sender) {
    if (sender = this.colleague2) {
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

mediator.setColleague1(colleague1);
mediator.setColleague2(colleague2);

colleague1.send('Ping');
colleague2.send('Pong');
