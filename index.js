let sketches = ['glass', 'glass2', 'glass3', 'vortex'];
let catalogDelay = 300;
let menuDelay = 150;
let nonsense = '<p>DISK VOLUME 254</p><p>&nbsp;</p>';

function catalogLine(sketch) {
    return `<a href="${sketch}.html">${sketch.toUpperCase()}</a>`;
}

function nonsenseLine(sketch) {
    return `<p>*J 001 ${catalogLine(sketch)}</p>`;
}

function menuLine(sketch, letter) {
    return `<p>*J..<span class="inverse">${letter}</span>..${catalogLine(sketch)}</p>`;
}

function display(i) {
    $('#main').append(nonsenseLine(sketches[i]));
    if (i + 1 < sketches.length) {
        setTimeout(() => { display(i + 1); }, catalogDelay);
    } else {
        setTimeout(() => { menu(0); }, catalogDelay);
    }
}

function menuLines(i) {
    let html = '';
    for (let j = 0; j < i; ++j) {
        html += menuLine(sketches[j], String.fromCharCode(65 + j));
    }
    for (let j = i; j < sketches.length; ++j) {
        html += nonsenseLine(sketches[j]);
    }
    return html;
}

function menu(i) {
    $('#main').html(nonsense + menuLines(i));

    if (i < sketches.length) {
        setTimeout(() => { menu(i + 1); }, menuDelay);
    } else {
        setTimeout(menuDone, menuDelay);
    }
}

function menuDone() {
    let html = '<p class="title"><span class="inverse">PROGRAMS</span></p><p>&nbsp;</p>';
    html += menuLines(sketches.length);
    $('#main').html(html);

    $(document).keypress((event) => {
        if (event.which > 96 && event.which <= 96 + sketches.length) {
            window.location.href = `${sketches[event.which - 97]}.html`; 
            event.preventDefault();
        }
    });
}

$(document).ready(() => {
    $('#main').append(nonsense);
    setTimeout(function () { display(0); }, catalogDelay);
});



