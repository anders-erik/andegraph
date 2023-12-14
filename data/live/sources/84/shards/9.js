const boxes = [
  { value: 1, getValue() { return this.value; } },
  { value: 2, getValue() { return this.value; } },
  { value: 3, getValue() { return this.value; } },
];

// This is subpar, because each instance has its own function property that does the same thing, which is redundant and unnecessary. Instead, we can move getValue to the [[Prototype]] of all boxes: