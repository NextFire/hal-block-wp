import { HAL } from "./hal";

window.onload = () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(block => {
        fetch(block.getAttribute('query'))
            .then(response => response.json())
            .then(data => block.appendChild(getHALNode(data.response.docs)))
    })
}

function getHALNode(docs: Array<HAL>) {
    let node = document.createElement('ul');
    docs.forEach(doc => {
        node.appendChild(getDocListing(doc));
    });
    return node;
}

function getDocListing(doc: HAL) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.appendChild(a)
    a.href = doc.uri_s;
    a.innerHTML = doc.label_s;
    return li;
}
