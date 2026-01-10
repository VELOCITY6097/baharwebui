/**
 * Invoice Audit Logic
 * Standardizes Tanker Density and checks variance against Challan
 * Displays variance with +/- signs
 */

document.getElementById('btnCalcInvoice').onclick = () => {
    // Get values from the UI
    const tkrObs = parseFloat(document.getElementById('tkrObsDensity').value);
    const tkrTemp = parseFloat(document.getElementById('tkrTemp').value);
    const challan = parseFloat(document.getElementById('challanDensity').value);
    const resDiv = document.getElementById('resInvoice');

    // Validation
    if (isNaN(tkrObs) || isNaN(tkrTemp) || isNaN(challan)) {
        return alert("Please fill all fields for verification");
    }

    // 1. Show "Connecting DB..." Loading State
    resDiv.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px;">
            <div class="spinner"></div>
            <p style="color:var(--text-secondary); font-weight:600; margin-top:10px;">Connecting DB...</p>
        </div>`;

    setTimeout(() => {
        // 2. Standardize Tanker Reading via global function in density.js
        const calculatedStandard = window.getStandardDensity(tkrObs, tkrTemp);
        
        if (calculatedStandard === "Range Error") {
            resDiv.innerHTML = `
                <div class="animate__animated animate__shakeX" style="color:var(--danger); text-align:center; padding:20px; font-weight:bold;">
                    OUT OF TABLE RANGE
                </div>`;
            return;
        }

        // 3. Calculate Variance (No Math.abs() to keep the sign)
        const rawVariance = (calculatedStandard - challan).toFixed(1);
        
        // Format string to show "+" if positive, "-" is automatic for negative
        const displayVariance = rawVariance > 0 ? `+${rawVariance}` : rawVariance;
        
        // Acceptance criteria is still based on the absolute difference <= 3.0
        const isAccepted = Math.abs(rawVariance) <= 3.0;

        // 4. Display Result Card
        resDiv.innerHTML = `
            <div class="result-card animate__animated ${isAccepted ? 'animate__zoomIn' : 'animate__shakeX'}" 
                 style="background: ${isAccepted ? '#f0fdf4' : '#fef2f2'}; border: 1px solid ${isAccepted ? '#bbf7d0' : '#fecaca'}; padding: 25px 15px;">
                
                <div class="checkmark-wrapper">
                    ${isAccepted ? 
                        `<svg class="checkmark" style="stroke:var(--success);" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark__circle" style="stroke:var(--success);" cx="26" cy="26" r="25" fill="none"/>
                            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                        </svg>` : 
                        `<div class="animate__animated animate__pulse animate__infinite" style="font-size: 50px; margin-bottom:10px;">⚠️</div>`
                    }
                </div>
                
                <p style="color:var(--text-secondary); font-weight:700; font-size: 12px; letter-spacing: 1px; margin-bottom:5px;">
                    ${isAccepted ? 'VARIANCE ACCEPTED' : 'DENSITY MISMATCH'}
                </p>
                
                <div class="result-value" style="color: ${isAccepted ? 'var(--success)' : 'var(--danger)'}; font-size: 3rem; margin-bottom: 20px;">
                    ${isAccepted ? 'PASS' : 'FAIL'}
                </div>

                <div style="width: 100%; background: rgba(255,255,255,0.5); border-radius: 15px; padding: 15px; border: 1px dashed ${isAccepted ? '#bbf7d0' : '#fecaca'};">
                    <div style="margin-bottom: 10px;">
                        <p style="font-size: 10px; color: var(--text-secondary); margin: 0;">CALCULATED DENSITY</p>
                        <strong style="font-size: 1.5rem; color: var(--text-dark); display: block;">${calculatedStandard.toFixed(1)} <span style="font-size: 12px; opacity: 0.6;">kg/m³</span></strong>
                    </div>
                    
                    <div style="border-top: 1px solid rgba(0,0,0,0.05); padding-top: 10px;">
                        <p style="font-size: 10px; color: var(--text-secondary); margin: 0;">VARIANCE</p>
                        <strong style="font-size: 1.8rem; color: ${isAccepted ? 'var(--success)' : 'var(--danger)'}; display: block;">${displayVariance} <span style="font-size: 12px; opacity: 0.6;">kg/m³</span></strong>
                    </div>
                </div>

                ${!isAccepted ? `
                    <div style="margin-top: 15px; background: var(--danger); color: white; padding: 10px; border-radius: 10px; font-size: 11px; font-weight: 800; text-transform: uppercase;">
                        ⚠️ Warning: Do not unload tanker
                    </div>` : ''}
            </div>
        `;
    }, 800); 
};