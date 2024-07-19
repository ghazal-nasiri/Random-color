const sectionColors = document.querySelector(".container");
const codeHex = document.querySelectorAll(".codeHex");
const audio = new Audio("audio/click.mp3");

// show text copied after copy text in keyboard
codeHex.forEach(element => {
    element.addEventListener("click", () => {
        const span = document.createElement("span");
        span.textContent = "Copied!";
        span.classList.add("showCopied");
        document.body.appendChild(span);
        setTimeout(() => {
            span.remove()
        }, 1000);
    })
});

// Choose a color from the color box
document.querySelectorAll(".chooseColor").forEach((element) => {
    element.addEventListener("input", () => {
        const bgColor = element.value;
        element.parentElement.style = `background-color: ${bgColor}`
        element.style.backgroundColor = bgColor;
        // show code hex
        element.nextElementSibling.textContent = bgColor;
    })
});

// Display random color when clicked
sectionColors.addEventListener("click", (e) => {
    const clickedSection = e.target;

    if (clickedSection.className.includes("bg")) {
        audio.play();
        const random = randomColor();
        clickedSection.style = `background-color: ${random}`;
        clickedSection.firstElementChild.value = random;
        // show code hex
        clickedSection.querySelector(".codeHex").textContent = random;
    }
    // Copy the hex code to the keyboard
    if (clickedSection.className == "codeHex") {
        copyToKeyboard(clickedSection.textContent)
    }
})
// rgb to hex
const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
const rgbToHex = (r, g, b) => {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// random color
const randomColor = () => {
    const r = Math.ceil(Math.random() * 255);
    const g = Math.ceil(Math.random() * 255);
    const b = Math.ceil(Math.random() * 255);
    return rgbToHex(r, g, b);
}

// Clicking effect
window.addEventListener("click", (e) => {
    const x = e.pageX;
    const y = e.pageY;
    const span = document.createElement("span");
    span.classList.add("clickEffect");
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    document.body.appendChild(span);
    setTimeout(() => {
        span.remove();
    }, 600);

})

//copy on the keyboard
function copyToKeyboard(text) {
    navigator.clipboard.writeText(text)
}

