// https://github.com/oreillymedia/data_structures_and_algorithms_using_javascript/blob/master/Chapter6/chap6-4.txt

class Node {
   constructor(element) {
      this.element = element;
      this.next = null;
      this.previous = null;
   }
}

class LinkedList {
   constructor() {
      this.head = new Node("head");
   }

   dispReverse() {
      var currNode = this.head;
      currNode = this.findLast();
      while (!(currNode.previous == null)) {
         console.log(currNode.element);
         currNode = currNode.previous;
      }
   }

   findLast() {
      var currNode = this.head;
      while (!(currNode.next == null)) {
         currNode = currNode.next;
      }
      return currNode;
   }

   remove(item) {
      var currNode = this.find(item);
      if (!(currNode.next == null)) {
            currNode.previous.next = currNode.next;
            currNode.next.previous = currNode.previous;
            currNode.next = null;
            currNode.previous = null;
      }
   }

   display() {
      var currNode = this.head;
      while (!(currNode.next == null)) {
         console.log(currNode.next.element);
         currNode = currNode.next;
      }
   }

   find(item) {
      var currNode = this.head;
      while (currNode.element != item) {
         currNode = currNode.next;
      }
      return currNode;
   }

   insert(newElement, item) {
      var newNode = new Node(newElement);
      var current = this.find(item);
      newNode.next = current.next;
      newNode.previous = current;
      current.next = newNode;
   }
}


var cities = new LinkedList();
console.log({cities});

cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
console.log();
cities.dispReverse();
