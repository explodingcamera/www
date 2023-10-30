// license: MIT
// Credit: https://github.com/pmndrs/maath
// Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

type TypedArray = Float32Array | Float64Array;

type Sphere = {
  radius?: number;
  center?: number[];
};

const defaultSphere = {
  radius: 1,
  center: [0, 0, 0],
};

function normalizeSeed(seed: number | string) {
  if (typeof seed === "number") {
    seed = Math.abs(seed);
  } else if (typeof seed === "string") {
    const string = seed;
    seed = 0;
    for (let i = 0; i < string.length; i++) {
      seed = (seed + (i + 1) * (string.charCodeAt(i) % 96)) % 2147483647;
    }
  }
  if (seed === 0) {
    seed = 311;
  }
  return seed;
}

function lcgRandom(seed: number | string) {
  let state = normalizeSeed(seed);
  return function () {
    const result = (state * 48271) % 2147483647;
    state = result;
    return result / 2147483647;
  };
}

export class Generator {
  seed: string | number = 0;

  constructor(seed: string | number) {
    this.init(seed);
  }

  init = (seed: number | string) => {
    this.seed = seed;
    this.value = lcgRandom(seed);
  };

  value = lcgRandom(this.seed);
}

const defaultGen = new Generator(Math.random());

export function inSphere(
  buffer: TypedArray,
  sphere?: Sphere,
  rng: Generator = defaultGen
) {
  const { radius, center } = {
    ...defaultSphere,
    ...sphere,
  };
  for (let i = 0; i < buffer.length; i += 3) {
    const u = Math.pow(rng.value(), 1 / 3);

    let x = rng.value() * 2 - 1;
    let y = rng.value() * 2 - 1;
    let z = rng.value() * 2 - 1;

    const mag = Math.sqrt(x * x + y * y + z * z);

    x = (u * x) / mag;
    y = (u * y) / mag;
    z = (u * z) / mag;

    buffer[i] = x * radius + center[0];
    buffer[i + 1] = y * radius + center[1];
    buffer[i + 2] = z * radius + center[2];
  }

  return buffer;
}