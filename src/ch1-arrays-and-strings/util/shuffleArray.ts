export default function shuffleArray(arr: Array<number | string>, willPrintShuffledArr: boolean = false): void {
  for (let i = 0; i < arr.length; i++) {
    const randIndex = Math.floor(Math.random() * (arr.length - i)) + i;
    const temp = arr[randIndex];

    arr[randIndex] = arr[i];
    arr[i] = temp;
  }

  if (willPrintShuffledArr) {
    console.log("shuffled arr:", arr);
  }
}