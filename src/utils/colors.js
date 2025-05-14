export function hexToRgba(hex, opacity = 0.2) {
    if (!/^#([A-Fa-f0-9]{6})$/.test(hex)) {
        console.warn(`Invalid hex color: ${hex}`);
        return `rgba(0, 0, 0, ${opacity})`;
    }

    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
