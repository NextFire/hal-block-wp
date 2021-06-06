// const HAL_API = 'https://api.archives-ouvertes.fr/search/';
window.onload = function () {
    var blocks = document.querySelectorAll('div.wp-block-halb-hal-block');

    blocks.forEach(block => {
        console.log(block);
        
        fetch(block.innerHTML)
            .then(response => response.json())
            .then(data => {
                constructBlock(block, data.response.docs)
            })
    })

    function constructBlock(block: Element, docs: Array<any>) {
        block.innerHTML = ''
        var node = document.createElement("LI");
        var textnode = document.createTextNode("Water");
        node.appendChild(textnode);
        block.appendChild(node);
        docs.forEach(function (element: any) {
            console.log(element);
        });
    }
}
