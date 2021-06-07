import { HALResponse } from './hal';

window.onload = () => {
    document.querySelectorAll('div.wp-block-halb-hal-block').forEach(async block => {
        try {
            let response = await fetch(block.getAttribute('url'));
            let data = await response.json();
            block.appendChild(getHALNode(data.response.docs));
        } catch (error) {
            let errorNode = document.createElement('p');
            errorNode.className = 'hal-error';
            errorNode.innerHTML = 'An error occured when fetching<br>' + block.getAttribute('url') + '<br><br>' + error;
            block.appendChild(errorNode)
        }
    });
}

function getHALNode(docs: Array<HALResponse>) {
    let node = document.createElement('ul');
    docs.forEach(doc => node.appendChild(getDocListing(doc)));
    return node;
}

function getDocListing(doc: HALResponse) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.appendChild(a)
    a.href = doc.uri_s;
    a.innerHTML = doc.label_s;
    return li;
}
