function start() {
    
    while(true){
        let opcao = "sair"
        switch(opcao){
            case "cadastrar":
                console.log("vamos cadastra-lo")
                break
            case "listar":
                console.log("vamos listar")
                break
            case "sair":
                return
        }
    }
}

start()