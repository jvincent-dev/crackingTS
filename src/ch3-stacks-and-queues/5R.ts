import Stack from "./util/Stack";

// sort stack - sort a stack such that the smallest items are at the top. Only allowed to use one other stack for additional data structure
// time: O(n) ?? space: O(n) for extra stack ??
export default function sortStack(stack: Stack<number | string>): void {
  if (stack.isEmpty() || stack.size() === 1) {
    return;
  }

  const tempStack: Stack<number | string> = new Stack();
  let temp: number | string = stack.peek(); // buffer
  stack.pop();

  while (!stack.isEmpty()) {
    const next: number | string = stack.peek(); // essentially pop but pop returns undefined but we while(!stack.isEmpty())
    stack.pop();

    if (next < temp) {
      if (next > tempStack.peek()) {
        tempStack.push(next);
      } else {
        tempStack.push(temp);
        temp = next;

        // desc order is found on tempStack. So pop and push values to stack
        while (!tempStack.isEmpty() && temp < tempStack.peek()) {
          const poppedVal: number | string = tempStack.peek();
          tempStack.pop();

          stack.push(poppedVal);
        }
      }
    } else {
      tempStack.push(temp);
      temp = next;
    }
  }

  tempStack.push(temp);

  while (!tempStack.isEmpty()) {
    const poppedVal: number | string = tempStack.peek();
    tempStack.pop();

    stack.push(poppedVal);
  }
}
// plan: let tempStack contain values larger than temp > pop from top of stack > if (next < temp && next > tempStack.peek()): push next to tempStack;
// else if (next < temp && next <= tempStack.peek()): push temp into tempStack and set temp = next while(temp < tempStack.peek()): pop from tempStack
// into stack; else if (next >= temp): push temp into tempStack and set temp = next > repeat until stack is empty > push tempStack values into stack
//  > repeat for remaining; else if next > temp.peek(): push tos and set tos = next ???
// edge cases: temp is less than both stack.peek() and tempStack.peek()
// input stack: [2, 16, 1, 8, 7, 3]
// R: not sure about complexities