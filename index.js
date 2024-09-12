const { select } = require('@inquirer/prompts')

const start = async () => {
    
    while(true){

    const opcao = await select({
        messagem: "Menu >",
        choices: [
        {
            name:"Cadastrar meta",
            value:"cadastrar"
        },
        {
            name:"Listar metas",
            value:"Listar"
        },
        {
            name: "Sair",
            value:"sair"
        }]
    })


        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastra-lo")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                console.log("Até a próxima!")
            return
        }
    }
}

start()