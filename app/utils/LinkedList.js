export default class LinkedList {
  constructor() {
    this.head = null;
  }

  add(data) {
    const node = {
      data,
      next: null,
    };
    let current;
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
  }

  item(index) {
    if (index < 0) {
      return null;
    }
    let current = this.head;
    let i = 0;

    while (i++ < index && current) {
      current = current.next;
    }
    return (current ? current.data : null);
  }

  remove(index) {
    if (index < 0) {
      return null;
    }
    let current = this.head;
    let previous;
    let i = 0;
    if (index === 0) {
      this.head = current.next;
    } else {
      while (i++ < index) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    return (current ? current.data : null);
  }

  size() {
    let current = this.head;
    let count = 0;

    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  toArray() {
    const result = [];
    let current = this.head;

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return result;
  }

  toString() {
    return this.toArray().toString();
  }
}
