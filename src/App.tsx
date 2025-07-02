import { useForm } from "react-hook-form"
import { getCep } from "./services/api"
import { Inputs } from "./types/inputs.type"
import * as S from "./styles/styles"
import { useState } from "react"

function App() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)

  const handleSubmitForm = async ({ cep }: { cep: string }) => {
    setLoading(true)

    try {
      const response = await getCep(cep)

      if (response.erro) {
        alert("CEP não encontrado")
        reset() // limpa os campos anteriores
        return
      }

      const fieldsToSet = {
        rua: response.logradouro,
        bairro: response.bairro,
        cidade: response.localidade,
        estado: response.uf,
        ibge: response.ibge
      }

      Object.entries(fieldsToSet).forEach(([key, value]) =>
        setValue(key as keyof Inputs, value?.trim() || "")
      )

    } catch (error) {
      alert("Erro ao buscar o CEP")
      console.error("Erro ao buscar CEP:", error)
    } finally {
      setLoading(false)
    }
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
            required: "O CEP é obrigatório",
            pattern: {
              value: /^\d{8}$/,
              message: "O CEP deve conter 8 números sem traços"
            }
          })}
        />
        {errors.cep && <p className="error-message">{errors.cep.message}</p>}

        <S.Button type="submit" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </S.Button>

        {["rua", "bairro", "cidade", "estado", "ibge"].map((field) => (
          <div key={field}>
            <S.Label htmlFor={field}>{field[0].toUpperCase() + field.slice(1)}:</S.Label>
            <S.Input
              type="text"
              id={field}
              disabled
              {...register(field as keyof Inputs)}
            />
          </div>
        ))}
      </S.Form>
    </S.Main>
  )
}

export default App