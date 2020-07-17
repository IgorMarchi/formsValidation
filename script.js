const fields = document.querySelectorAll("[required]")

function ValidateField(field) {
    //lógica para verificar se existem errors
    function varifyErrors(){
        let foundError = false

        for(let error in field.validity){

            //se nâo for customError 
            //então verifica se tem erro
            if(field.validity[error] && !field.validity.valid){
                foundError = error
            }
        }
        return foundError
    }

    function CustomMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email váliso"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {

        const spanError = field.parentNode.querySelector("span.error")

        if(message){
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {
        const error = varifyErrors()
        
        if(error) {
            const message = CustomMessage(error)
            field.style.borderColor= "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor= "green"
            setCustomMessage()
        }
    }
}

function customValidation (event) {

    const field = event.target
    const validation = ValidateField(field)
    
    validation()
}

for( field of fields){
    field.addEventListener("invalid", event => {
        //eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}

document.querySelector("form")
    .addEventListener("submit", event => {
        console.log("enviar o formulário")
        
        //não vai enviar o form
        event.preventDefault()
    })