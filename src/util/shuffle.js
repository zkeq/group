const shuffle = arr => {
    arr.forEach((element, index) => {
        const randomIndex = Math.floor(Math.random() * (index + 1))
        swap(arr, index, randomIndex)
    })
    return arr
}

// 此处用 ES5 的函数写法是为了函数提升
function swap (arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
}

export default shuffle
