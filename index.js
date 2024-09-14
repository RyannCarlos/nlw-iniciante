const { select, input, checkbox } = require('@inquirer/prompts')

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

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmcarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        console.log("Nenhuma meta selecionada")
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    console.log("Meta(s) concluida(s)")
}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        console.log("Nenhuma meta realizada")
        return
    }

    await select({
        message: "Metas Realizadas: ",
        choices: [...realizadas],
    })
}

const MetasAbertas = async () => {
    const abertas = metas.filter((metas) =>{
        return metas.checked != true
    })

    if(abertas.length == 0){
        console.log("Nenhuma meta aberta: ")
        return
    }
    
    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas],
    })
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
            value:"listar"
        },
        {
            name:"Metas Realizadas",
            value:"realizadas"
        },
        {
            name:"Metas Abertas",
            value:"abertas"
        },
        {
            name: "Sair",
            value:"sair"
        }]
    })


        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
                console.log(metas);
                break
            case "listar":
                await listarMetas();
                break
            case "realizadas":
                await MetasRealizadas()
                break
                case "abertas":
                await MetasAbertas()
                break
            case "sair":
                console.log("Até a próxima!")
            return
        }
    }
}

start()