// highlight when running on localhost or test site
window.onload = (e) => {
    let server
    if (location.hostname == 'localhost') {
        server = 'localhost'
    }
    let m = location.pathname.match(`^/(test-\\w+)/`)
    if (m)  {
        server = m[1]
    }
    if (server) {
        document.querySelector('body').classList.add(server)
        let div = document.createElement('div')
        div.classList.add('test-header')
        div.innerText = server
        document.querySelector('body').prepend(div)
    }
}
function fullscreen(img) {
    let d = document.querySelector('.fullscreen')
    if (d) {
        d.remove()
    }
    d = document.createElement('div')
    d.classList.add('fullscreen')
    d.style.backgroundImage = `url(${img.src})`
    d.style.display = 'block'
    document.querySelector('body').append(d)
    d.addEventListener('click', (x) => {
        d.remove()
    })
}

async function citeThis(e) {
    try {
        const citation = document.querySelector('cite').innerText
        const clip = new ClipboardItem({ ["text/plain"]: citation })
        await navigator.clipboard.write([clip])
        alert("This citation has been copied to your clipboard:\n\n" + citation)
    }
    catch (error) {
        alert("Sorry, there was an error when generating the citation.")
        console.log(error)
    }
}

function detectGreek() {
    // Detect <em> that contains greek characters and mark it as lang="el" (Greek)
    // so it can be styled in custom.css -- see the rule for em:lang(el)
    // Note: this only looks in <p> (garden/place description), to avoid altering style of bibliography titles
    document.querySelectorAll('p em').forEach((em) => {
        if (em.innerText.search(/[\u0370-\u03ff\u1f00-\u1fff]/) > -1) {
            em.lang = 'el'
        }
    })
}

detectGreek()