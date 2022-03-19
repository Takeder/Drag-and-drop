// Добавление списка LI с названиями из JSON в OL 
let ol1 = document.querySelector('.list');
let ol2 = document.querySelector('.list2');

let btnAdd = document.querySelector('.add');
let formBrend = document.querySelector('.brend');

let btnSave = document.querySelector('.save');
let title = document.getElementById('title');
let descr = document.getElementById('description');


btnAdd.addEventListener('click', () => {
    btnAdd.classList.add('hidden');
    formBrend.classList.add('active');    
});

function handlerDragstart(event) {
    this.classList.add('dragItem--active');
    event.dataTransfer.setData('dragItem', this.className.slice(9));
    // this.className = 'dsasd'
    console.log(this.className.slice(9));
    // console.log(a);
}

function handlerDragend(event) {
    this.classList.remove('dragItem--active');
    // console.log('dragend', this);
}

function handlerDrag(event) {
    // console.log('drag');
}

function handlerDragenter(event) {
    event.preventDefault();
    this.classList.add('dropZone--active');
    // console.log('dragenter', this);
}

function handlerDragleave(event) {
    this.classList.remove('dropZone--active');
    // console.log('dragleave', this);
}

function handlerDragover(event) {
    event.preventDefault();
    // console.log('dragover');
}

function handlerDrop(event) {
    // event.preventDefault()
    let a = event.dataTransfer.getData('dragItem');
    console.log(a);
    let dragItem = document.querySelector(`.${a}`);
    console.log(dragItem);
    // const clone = dragFlag.cloneNode(true)
    this.append(dragItem);
    // console.log(dragFlag)
    // event.target.append(document.querySelector(dragFlag));
    // console.log('drop');
}





function removeItem (ol) {
    ol.addEventListener('click', ({target}) => {
        if(Array.prototype.slice.call(target.classList).indexOf('close') >= 0) {
            target.parentNode.remove();
        }
    });
}


function addItem (ol, {title, description}) {
    let li = document.createElement('li');
    let titl = document.createElement('p');
    titl.innerHTML = title;
    li.appendChild(titl);
    

    let desc = document.createElement('p');
    desc.innerHTML = description;
    li.appendChild(desc);
    
    let close = document.createElement('div');
    close.className = 'close';
    close.innerHTML = '[X]';
    li.appendChild(close);

    

    li.setAttribute('class', 'dragItem');
    li.setAttribute('draggable', true);

    ol.insertAdjacentElement("afterbegin", li);

    const dragItems = document.querySelectorAll('.dragItem');
    const dropZones = document.querySelectorAll('.dropZone');
    console.log(dragItems, dropZones);


    dragItems.forEach(dragItem => {
        dragItem.addEventListener('dragstart', handlerDragstart);
        dragItem.addEventListener('dragend', handlerDragend);
        dragItem.addEventListener('drag', handlerDrag);
    })

    dropZones.forEach(dropZone => {
        dropZone.addEventListener('dragenter', handlerDragenter);
        dropZone.addEventListener('dragleave', handlerDragleave);
        dropZone.addEventListener('dragover', handlerDragover);
        dropZone.addEventListener('drop', handlerDrop);
    })


    
    // return ol;
}

btnSave.addEventListener('click', (event) => {
    event.preventDefault();
    let a = {'title': title.value, 'description': descr.value};
    if (title.value !== '' && descr.value !== '') {
        addItem(ol1, a);
        btnAdd.classList.remove('hidden');
        formBrend.classList.remove('active');
    } else {
        alert ('Поля не заполнены!')
    }
})


removeItem(ol1);
removeItem(ol2);


Promise.all([
    fetch('http://127.0.0.1:5500/list.json').then(res => res.json()),
    fetch('http://127.0.0.1:5500/list2.json').then(res => res.json())
]).then(([list, list2]) => {
    list.forEach(item => addItem(ol1, item));
    list2.forEach(item => addItem(ol2, item));    
})

// ________________________________________________________________________________________________

