Vertical pattern appears at 82s
Horizontal pattern appears at 47s

Vertical pattern 183s (82 + 101, where 101 is our grid width)
Horizontal pattern 150s (47 + 103, where 103 is our grid height)

If n is the iteration (seconds) where a pattern appears,
we need to find an iteration where both patterns appear at the same time.
n = 82 + 101 x k
n = 47 + 103 x m

So the first pattern appears at: 82, 183, 284,... (k = 0, 1, 2,...)
And the second pattern appears at: 47, 150, 253,... (m = 0, 1, 2,...)

To find the overlapping iteration,
we need to check if an iteration in the first list also appears in the second list

Let's start with n = 82, and check if it appears in the second pattern's list of iterations
82 = 47 + 103m
82 - 47 = 103m
35 = 103m
m = 35/103
But 35 does not divide evenly by 103, so it does not appear in the second list (m needs to be an integer, see above)

Now we also do this for 183 (the next iteration where vertical pattern appears), and so on...
Until we find an iteration that appears in both lists, in my case 7051

```typescript
let k = 0;
let overlap = null;
while (!overlap) {
  const n = 82 + 101 * k;
  if ((n - 47) % 103 === 0) {
    overlap = n;
  }
  k++;
}
console.log("overlap");
```
