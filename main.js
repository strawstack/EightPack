(() => {

    const SIZE = 200;
    const container = document.querySelector(".container");
    const cells = document.querySelectorAll(".cell");
    const state = {
        mouse: {x: 0, y: 0},
        cells: [
            1.75, 1.75, 1.75,
            1.75, 1.75, 1.75,
            1.75, 1.75, 1.75
        ]
    };

    const base = 1.2;
    const range = [1.2, 8];

    function sub(a, b) {
        return {
            x: a.x - b.x,
            y: a.y - b.y
        };
    }

    function mag(a) {
        return Math.sqrt(Math.pow(a.x, 2) + Math.pow(a.y, 2));
    }

    function valueFromRange(range, percent) {
        if (percent <= 0) return base;
        const [lower, upper] = range;
        const size = upper - lower;
        return lower + percent * size;
    }

    function numberToCoord(n) {
        return {
            x: n % 3,
            y: Math.floor(n / 3)
        };
    }

    function calculate(timestamp) {

        render(timestamp);
    }

    function render(timestamp) {

        // Set Font Size
        // Set innerHTML
        cells.forEach((e, i) => {
            e.style.fontSize = `${state.cells[i]}rem`;
            e.innerHTML = state.cells[i];
        });

        window.requestAnimationFrame(calculate);
    }

    container.addEventListener("mousemove", e => {
        const { clientX, clientY } = e;
        const { left, top } = container.getBoundingClientRect();
        const mouse = {
            x: clientX - left,
            y: clientY - top
        };
        state.mouse = mouse;

        cells.forEach((e, i) => {

            const { x, y } = numberToCoord(i);

            // Global center point of cell
            const CENTER_POINT = {x: x * SIZE + SIZE/2, y: y * SIZE + SIZE/2};

            // Max distance possible from center
            const MAX_DISTANCE = mag({x: 3 * SIZE/2, y: 3 * SIZE/2});

            // Vec from center to global mouse
            const vec = sub(state.mouse, CENTER_POINT);

            // Magnitude of vector
            const length = mag(vec);

            // Mouse proximity to center
            const percent = 1 - (length / MAX_DISTANCE);

            const fontSizeRaw = valueFromRange(range, percent);
            const fontSize = Math.floor(fontSizeRaw * 10) / 10;

            state.cells[i] = fontSize;

        });
    });

    window.requestAnimationFrame(calculate);

})()