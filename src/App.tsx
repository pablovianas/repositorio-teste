import { useForm } from "react-hook-form"
import { getCep } from "./services/api"
import { Inputs } from "./types/inputs.type"
import * as S from "./styles/styles"

function App() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>()

  const handleSubmitForm = async (data: { cep: string }) => {
    const response = await getCep(data.cep)
    console.log("Dados recebidos:", response)

    if (response.erro && response.length !== 8) {
      alert("CEP não encontrado")
      return
    }

    setValue("rua", response.logradouro.trim())
    setValue("bairro", response.bairro.trim())
    setValue("cidade", response.localidade.trim())
    setValue("estado", response.uf.trim())
    setValue("ibge", response.ibge.trim())

  }


  return (
    <S.Main>

      <h1>Informe o CEP</h1>

      <S.Form onSubmit={handleSubmit(handleSubmitForm)}>
        <h2>Informe o Cep e obtenha informações:</h2>

        <S.Label htmlFor="cep">Cep:</S.Label>
        <S.Input
          type="text"
          id="cep"
          placeholder="Digite o cep"
          {...register("cep", {
            required: "O CEP é obrigatório", minLength: { value: 8, message: "O CEP deve ter 8 dígitos" }, maxLength: { value: 8, message: "O CEP deve ter 8 dígitos" }
          })}
        />

        {errors.cep && <p className="error-message">{errors.cep.message}</p>}

        {errors.cep && errors.cep.type === "minLength" && <p className="error-message"></p>}

        <S.Button type="submit">Buscar</S.Button>

        <S.Label htmlFor="rua">Rua:</S.Label>
        <S.Input
          type="text"
          id="rua"
          disabled
          {
          ...register("rua")
          }
        />

        <S.Label htmlFor="bairro">Bairro:</S.Label>
        <S.Input
          type="text"
          id="bairro"
          disabled
          {
          ...register("bairro")
          }
        />

        <S.Label htmlFor="cidade">Cidade:</S.Label>
        <S.Input
          type="text"
          id="cidade"
          disabled
          {
          ...register("cidade")
          }
        />

        <S.Label htmlFor="estado">Estado:</S.Label>
        <S.Input
          type="text"
          id="estado"
          disabled
          {
          ...register("estado")
          }
        />

        <S.Label htmlFor="ibge">IBGE:</S.Label>
        <S.Input
          type="text"
          id="ibge"
          disabled
          {
          ...register("ibge")
          }
        />
      </S.Form>
    </S.Main>
  )
}



export default App
