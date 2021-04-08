let head = 0
let tail = 0
for (let i = 0; i < 100000; i++) {
    if (Math.random() < 0.5) {
        head += 1
    } else {
        tail += 1
    }
}
console.log(head / (head + tail))
