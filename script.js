let notes = [
    {
        id: 0,
        title: "test",
        text: "Place Holder"
    }
]

document.addEventListener("DOMContentLoaded", () => {

    //RESTAURACAO DOS DADOS ANTERIORES
    const notesList = document.querySelector("#list")
    renderList(notesList)

    const addButton = document.querySelector("#add")
    const removeButton = document.querySelector("#remove")
    const textArea = document.querySelector("textarea")
    
    //MODIFICA E SALVA AS ANOTACOES
    textArea.addEventListener('keyup', () => {
        notes.map(note => {
            if(note.id == textArea.name)
                note.text = textArea.value
        })
    })

    //ADICIONAR NOVAS ANOTACOES
    addButton.addEventListener("click", () => {
        let title = prompt("title:")
        
        if (title) {
            let id = (new Date()).getTime()
            notes.push({
                id: id,
                title: title,
                text: ""
            })
        }

        renderList(notesList)
    })

    //REMOVE ANOTACOES
    removeButton.addEventListener("click", () => {
        let procede = confirm("ARE YOU SURE ?")

        if (procede) {
            let id = textArea.name
            notes = notes.filter(note => note.id != id)
            textArea.value = ""
        }

        renderList(notesList)
    })
    
})

function renderList (parent) {
    parent.innerHTML = ""
    notes.forEach((note) => {
        let newNode = document.createElement("button");
        newNode = setUpButton(newNode, note)
        parent.appendChild(newNode)
    })
}

function setUpButton (button, note) {
    let textArea = document.querySelector("textarea")
    button.id = note.id;
    button.innerText = note.title

    button.addEventListener("click", () => {
        let note = notes.find(note => note.id == button.id)
        textArea.value = note.text
        textArea.name = note.id
    })

    return button
}

