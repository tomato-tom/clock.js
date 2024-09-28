const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const radius = canvas.height / 2;
ctx.translate(radius, radius); // 時計の中心をキャンバスの中心に
const clockRadius = radius * 0.9;

function drawClock() {
    drawFace(ctx, clockRadius);
    drawNumbers(ctx, clockRadius);
    drawTime(ctx, clockRadius);
}

function drawFace(ctx, radius) {
    // 枠
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "#d0d0d0";
    ctx.fill();

    // 時計盤
    ctx.strokeStyle = "#3a5a3a";  // 外側のラインの色を変更
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();

    // 中心点
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = "#3a5a3a";
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    const fontHeight = radius * 0.15;
    ctx.font = `${fontHeight}px arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
        const ang = num * Math.PI / 6;
        const x = radius * 0.85 * Math.cos(ang - Math.PI / 2);
        const y = radius * 0.85 * Math.sin(ang - Math.PI / 2);
        ctx.fillText(num.toString(), x, y);
    }
}

function drawTime(ctx, radius) {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // 時針
    const hourAngle = (hour % 12 + minute / 60) * (Math.PI / 6);
    drawHand(ctx, hourAngle, radius * 0.5, radius * 0.07);

    // 分針
    const minuteAngle = (minute + second / 60) * (Math.PI / 30);
    drawHand(ctx, minuteAngle, radius * 0.8, radius * 0.07);

    // 秒針
    const secondAngle = second * (Math.PI / 30);
    drawHand(ctx, secondAngle, radius * 0.9, radius * 0.02, "#9a3a3a");
}

function drawHand(ctx, pos, length, width, color = "#333") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos); // 回転を元に戻す
}

setInterval(drawClock, 1000); // 毎秒更新

