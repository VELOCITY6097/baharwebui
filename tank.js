document.getElementById('btnTank').addEventListener('click', () => {
    const h = parseFloat(document.getElementById('dipReading').value); // height filled
    const r = parseFloat(document.getElementById('tankRadius').value); // radius
    const L = parseFloat(document.getElementById('tankLength').value); // length

    // Geometric formula for horizontal cylinder segment
    const area = Math.acos((r - h) / r) * Math.pow(r, 2) - (r - h) * Math.sqrt(2 * r * h - Math.pow(h, 2));
    const volumeLiters = (area * L) / 1000; // Assuming cm input, converting to Liters

    document.getElementById('resTank').innerText = `Volume: ${volumeLiters.toFixed(2)} Liters`;
});
