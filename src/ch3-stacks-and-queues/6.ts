import ListNode from "../ch2-linked-lists/util/ListNode";
import Queue from "./util/Queue";

// animal shelter - a shelter which holds only dogs and cats can only allow adoption for the oldest cat or dog. People can only select if cat or dog
// time: enqueue O(1) dequeue O(1) dequeueDog O(1) dequeueCat O(1) space: enqueue O(1) dequeue O(1) dequeueDog O(1) dequeueCat O(1)
export default class AnimalShelter {
  private time: number; // time they were added
  dogs: Queue<any>;
  cats: Queue<any>;

  constructor() {
    this.dogs = new Queue();
    this.cats = new Queue();
    this.time = 0;
  }

  enqueue(animal: any): void {
    const newNode: ListNode<any> = new ListNode(animal);

    newNode.value.time = this.time;
    this.time++;

    if (animal.type === "dog") {
      this.dogs.enqueue(newNode);
    } else if (animal.type === "cat") {
      this.cats.enqueue(newNode);
    }
  }

  dequeueAny(): any {
    const oldestDog: any = this.dogs?.front?.value;
    const oldestCat: any = this.cats?.front?.value;
    const isDogOlder: boolean = oldestDog?.time < oldestCat?.time; // smaller the number older the animal

    if (isDogOlder) {
      return this.dogs.dequeue();
    }

    return this.cats.dequeue();
  }

  dequeueDog(): any {
    return this.dogs.dequeue();
  }

  dequeueCat(): any {
    return this.cats.dequeue();
  }
}

// animal: { type, name, time } - time is time joined the shelter
// const as: AnimalShelter = new AnimalShelter();

// as.enqueue({ name: "Pedro", type: "cat" });
// as.enqueue({ name: "Anna", type: "cat" });
// as.enqueue({ name: "Juan", type: "dog" });
// as.enqueue({ name: "Julia", type: "cat" });
// as.enqueue({ name: "Louie", type: "dog" });
// as.enqueue({ name: "Mint", type: "cat" });