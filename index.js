const { select, input, checkbox } = require('@inquirer/prompts')

let mensagem = "Bem vindo ao app de metas";

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

    mensagem = "Meta cadastrada com Sucesso!!"
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmcarcar e o Enter para finalizar essa etapa",
        choices: [...metas],
        instructions: false,
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0){
        mensagem = "Nenhuma meta selecionada"
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })
        meta.checked = true
    })
    mensagem = "Meta(s) Marcada(s) como Conluída(s)"
}

const MetasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if(realizadas.length == 0){
        mensagem = "Nenhuma meta realizada"
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
        mensagem = "Nenhuma meta aberta: "
        return
    }
    
    await select({
        message: "Metas Abertas: " + abertas.length,
        choices: [...abertas],
    })
}

const DeletarMetas = async () => {
    const  metasDesmercadas = metas.map((meta) => {
        return { value: meta.value, checked: false }
    }) 


    const itemsDeletar = await checkbox({
        message: "Selecione uma meta para deletar: ",
        choices: [...metasDesmercadas],
        instructions: false,
    })

    if(itemsDeletar.length == 0){
        mensagem = "Nenhuma meta foi escolhida para deletar"
        return
    }

    itemsDeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear();

    if(mensagem != ""){
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {
    
    while(true){
        mostrarMensagem();

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
            name:"Deletar Metas",
            value:"deletar"
        },
        {
            name: "Sair",
            value:"sair"
        }]
    })


        switch(opcao){
            case "cadastrar":
                await cadastrarMeta();
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
            case "deletar":
                await DeletarMetas()
                break
            case "sair":
                console.log("Até a próxima!")
            return
        }
    }
}

start()