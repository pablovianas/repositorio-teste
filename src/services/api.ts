
export const getCep = async (cep: string) => {
    try {
        if (!cep) throw new Error("CEP inválido!")

        const url = `https://viacep.com.br/ws/${cep}/json/`
        const response = await fetch(url)

        if (!response.ok) throw new Error("Erro ao buscar CEP")

        return await response.json()
        
    } catch (error) {
        console.log('ERRO AO consultar a API:', error)
    }
}