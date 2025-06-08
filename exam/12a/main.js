// main.js
import { Stack } from "./stack.js";
import { Queue } from "./queue.js";

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log("Stack:", stack.print());
console.log("Popped from stack:", stack.pop());
console.log("Updated Stack:", stack.print());

const queue = new Queue();
queue.enqueue("A");
queue.enqueue("B");
queue.enqueue("C");
console.log("Queue:", queue.print());
console.log("Dequeued from queue:", queue.dequeue());
console.log("Updated Queue:", queue.print());
