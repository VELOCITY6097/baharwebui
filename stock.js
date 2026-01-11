import { MS_15KL_CHART, HSD_20KL_CHART } from './charts.js';

let currentTank = 'MS';
const container = document.getElementById('tankToggle');
const lblDip = document.getElementById('lblDip');
const btnMS = document.getElementById('btnMS');
const btnHSD = document.getElementById('btnHSD');

// Sliding Toggle Logic
btnMS.onclick = function() {
    currentTank = 'MS';
    container.classList.remove('hsd-active'); 
    btnMS.classList.add('active');
    btnHSD.classList.remove('active');
    lblDip.innerText = "Dip Reading (cm) - MS (15KL)";
};

btnHSD.onclick = function() {
    currentTank = 'HSD';
    container.classList.add('hsd-active'); 
    btnHSD.classList.add('active');
    btnMS.classList.remove('active');
    lblDip.innerText = "Dip Reading (cm) - HSD (20KL)";
};

// Calculation Logic
document.getElementById('btnCalcTank').onclick = () => {
    const dipInput = document.getElementById('dipReading').value;
    const resDiv = document.getElementById('resTank');
    
    if (!dipInput) return alert("Please enter a dip reading");
    resDiv.innerHTML = `<div class="spinner"></div>`;

    setTimeout(() => {
        const chart = (currentTank === 'MS') ? MS_15KL_CHART : HSD_20KL_CHART;
        const dipNum = parseFloat(dipInput);

        // 1. Normalize lookup: MS and HSD both use 2-decimal string keys in your provided data
        let lookupKey = dipNum.toFixed(2);
        let volume = chart[lookupKey];

        // 2. Linear Interpolation for values between chart steps
        if (volume === undefined) {
            const keys = Object.keys(chart).map(Number).sort((a, b) => a - b);
            const lower = keys.filter(k => k <= dipNum).pop();
            const upper = keys.find(k => k >= dipNum);

            if (lower !== undefined && upper !== undefined && lower !== upper) {
                const valLower = chart[lower.toFixed(2)];
                const valUpper = chart[upper.toFixed(2)];
                
                const fraction = (dipNum - lower) / (upper - lower);
                volume = valLower + fraction * (valUpper - valLower);
            }
        }

        // 3. Render Output
        if (volume === undefined) {
            resDiv.innerHTML = `
                <div class="animate__animated animate__shakeX" style="color:var(--danger); text-align:center; padding:20px; font-weight:bold;">
                    DIP ${dipNum} NOT FOUND IN ${currentTank} CHART
                </div>`;
        } else {
            resDiv.innerHTML = `
                <div class="result-card animate__animated animate__zoomIn">
                    <p>${currentTank} (${currentTank === 'MS' ? '15,000' : '20,000'}L) STOCK</p>
                    <div class="result-value">${Math.round(volume).toLocaleString()}</div>
                    <p style="opacity:0.6">LITRES</p>
                </div>`;
        }
    }, 600);
};

document.getElementById('btnResetTank').onclick = () => {
    document.getElementById('dipReading').value = '';
    document.getElementById('resTank').innerHTML = '';
};
