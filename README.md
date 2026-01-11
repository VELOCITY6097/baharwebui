
# ⛽ FuelMaster Pro

**FuelMaster Pro** is a high-performance, mobile-first Progressive Web App (PWA) designed for fuel station management. It streamlines technical calculations for fuel density standardization, stock volume tracking, and invoice auditing with a clean, modern interface.

## 🚀 Live Demo

You can access the live application here: **[Your GitHub Pages URL]**

## ✨ Key Features

* **🧪 Density Standardization**: Standardize observed fuel density to the industry-standard **15°C**. Supports a density range of 700-900 kg/m³ and temperatures from 0-50°C using synchronized lookup tables.
* **⛯ Stock Volume Calculator**: Convert dip readings (in cm) directly into litres. Includes pre-configured charts for:
* **MS (Motor Spirit)**: 15KL Main Storage Tank.
* **HSD (High-Speed Diesel)**: 20KL Main Storage Tank.


* **🚛 Invoice Variance Audit**: Perform real-time audits comparing Tanker density against official Challan density. Includes automated warnings to prevent unloading if variance exceeds safety limits.
* **📱 Mobile-First UI**: Features a "glassmorphism" design with a persistent bottom navigation bar for quick switching between tools.
* **📶 Offline Capable**: Built as a PWA with a web manifest, allowing it to be "installed" on mobile devices and used with minimal connectivity.

## 🛠️ Technical Overview

* **Frontend**: HTML5, CSS3 (Custom Variables & Animations), Vanilla JavaScript (ES6+).
* **PWA**: `manifest.json` for standalone mobile experience and theme integration (#0b1f33).
* **Calculations**: Logic is modularized into specialized engines:
* `density.js`: Core standardization logic.
* `stock.js`: Dip-to-volume conversion for MS/HSD tanks.
* `invoice.js`: Variance auditing and safety alerts.


* **Design**: Responsive layout utilizing the `Animate.css` library for smooth page transitions.

## 📂 Project Structure

```text
├── index.html      # Main entry point & app shell
├── style.css       # Custom glassmorphism UI & layout
├── app.js          # Page routing & navigation logic
├── density.js      # Density calculation & lookup tables
├── stock.js        # Tank volume & toggle logic
├── charts.js       # MS/HSD tank calibration data
├── invoice.js      # Variance audit & warning logic
└── manifest.json   # PWA configuration

```

## 🔧 Installation & Deployment

Since this is a static web application, no backend is required.

1. **Fork** this repository.
2. Go to **Settings > Pages** in your GitHub repository.
3. Select the `main` branch as your source.
4. Your app will be live at `https://[your-username].github.io/[repo-name]/`.

## 🛡️ License

Distributed under the MIT License. See `LICENSE` for more information.

---

*Developed for efficient fuel station operations.*
