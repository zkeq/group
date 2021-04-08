/**
 * Created by cjh1 on 2017/5/25.
 */



var trueFactors = [];

function isOk(arr) {
    var max, min;
    max = min = arr[0];

    // 求最大、最小值
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        } else if (arr[i] < min) {
            min = arr[i];
        }
    }

    var factor = 0;
    var factorCount = 0;
    var count;

    for (var i = 2; i < max; i++) {
        count = 0;

        for (var n = 0; n < arr.length; n++) {
            if (arr[n] % i === 0) {
                count++;

/*                if (count >= 2) {
                    return i;
                }*/

                if (count === arr.length) {
                    trueFactors.push(i);
                    return i;
                } else if (count > factorCount) {
                    factor = i;
                    factorCount = count;
                }
            }
        }
    }

    if (factorCount >= 2) {
        return factor;
    }

    return 0;
}

function draw(canvas, arr) {
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext('2d');

    var ox = 16;
    var oy = 16;
    var GRID = 30;
    var x, y;
    var textX = 100;
    y = 60;
    ctx.fillStyle = '#000';
    ctx.font = '20px Arial';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制数
    for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        ctx.fillText(num, textX + i * 60, y);
    }

    var ret;
    var progress = arr;
    var lineX = 60;
    var lineX2 = lineX + arr.length * 60 + 8;
    var loop = 0; // 防止死循环
    
    var factors = [];
    trueFactors = [];
    var returnArr;
    
    while ((ret = isOk(progress)) !== 0 && loop < 50) {
        loop++;

        y += 40;
        lineX += 8;

        for (var i = 0; i < progress.length; i++) {
            if (progress[i] % ret === 0) {
                progress[i] = progress[i] / ret;
            }
        }

        // 绘制短除符号
        var lineY = y - 30;
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineX2, lineY);
        ctx.moveTo(lineX, lineY - 30);
        ctx.lineTo(lineX, lineY);
        ctx.stroke();

        factors.push(ret);
        returnArr = progress;
        
        // 绘制因数
        ctx.fillText(ret, lineX - 30, y - 40);
        
        // 绘制商
        arr.forEach(function (n, index) {
            ctx.fillText(n, textX + index * 60, y);
        });
    }

    return {
        trueFactors: trueFactors,
        factors: factors,
        returnArr: returnArr
    };
}