// boolean evaluation - Given a boolean expression consisting of the symbols 0 (false), 1 (true), &
// (AND), I (OR), and /\ (XOR), and a desired boolean result value result, implement a function to
// count the number of ways of parenthesizing the expression such that it evaluates to result. The
// expressionshouldbefully parenthesized (e.g., (0)A(1)) butnotextraneously (e.g., ( ( (0))/\(1))).
// EXAMPLE
// countEval("l /\1011", false) -> 2
// countEval("0&0&0&1All0", true) -> 10

const CONDITIONAL_OPERATORS: any = {
  "|": (val1: boolean, val2: boolean): boolean => val1 || val2,
  "&": (val1: boolean, val2: boolean): boolean => val1 && val2,
  "^": (val1: boolean, val2: boolean): boolean => val1 !== val2
}
const cache: { [key: string]: Array<boolean> } = {"1": [true], "0": [false] }; // { condition: [...(possible outcomes)] }

function computeEvaluations(condition: string, desiredResult: boolean, possibleResults: Array<number>): Array<boolean> {
  if (cache[condition]) {
    return cache[condition].map(val => val); // deep copy
  } else if (condition.length === 2) {
    throw new Error("Invalid condition");
  }

  for (let i = 0; i < condition.length; i++) {
    // check all possible splitting of the condition
    const char = condition[i];

    if (CONDITIONAL_OPERATORS.hasOwnProperty(char)) {
      // split by operator > make a call to left side and right side of operator
      const operands: Array<string> = [condition.substring(0, i), condition.substring(i + 1)];
      const leftSide: Array<boolean> = computeEvaluations(operands[0], desiredResult, possibleResults);
      const rightSide: Array<boolean> = computeEvaluations(operands[1], desiredResult, possibleResults);
      const result = leftSide.reduce((result: Array<boolean>, leftConditions) => {
        rightSide.forEach(rightCondition => {
          const newCombo: boolean = CONDITIONAL_OPERATORS[char](leftConditions, rightCondition);

          result.push(newCombo);
        });

        return result;
      }, []);

      if (!cache[condition]) {
        cache[condition] = result;
      } else {
        cache[condition].push(...result);
      }
    }
  }

  return []; // TODO: update
}

export default function booleanEvaluation(condition: string, desiredResult: boolean): number {
  // split on every condition
  const validEvaluations: Array<number> = new Array(condition.length).fill(0);

  computeEvaluations(condition, desiredResult, validEvaluations);

  console.log(validEvaluations)

  return validEvaluations.reduce((desiredResultCount, evaluation) => desiredResultCount + evaluation, 0);
}
/**
 * plan
 * - create cache > break into subproblems > backtrack ??? > save solved subproblems into cache
 * cases
 * - ^, |, &, and maybe invalid conditions ???
 * time: O(), space: O()
 */