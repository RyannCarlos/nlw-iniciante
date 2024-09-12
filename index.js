const { select, input } = require('@inquirer/prompts')

let meta = {
    value: "Tomar 3 litros de agua por dia",
    checked: 'false',
}

let metas = [meta]

const cadastrarMeta = async () => {
    const meta = await input({ message: "Digite a meta:"})

    if(meta.length == 0){
        console.log("A meta não pode ser vazia")
        return;
    }
    metas.push(
        { value: meta, checked: false}
    )
}

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
                cadastrarMeta();
                console.log(metas);
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