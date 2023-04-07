export function FOOO() {
  console.log(process.env.FOO2);

  const foo2 = process.env.FOO2;

  console.log(foo2);

  console.log(process.env.FOO);

  const foo = process.env.FOO;

  console.log(foo);
}

const { BIM, BAM, BOOM, FOO, FOO2 } = process.env;

console.log({ BIM, BAM, BOOM, FOO, FOO2 });

export const zoo = FOOO;
