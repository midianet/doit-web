import { ReactNode, useEffect, useState } from "react"

import { useForm } from 'react-hook-form';
import { SelectItem } from "../../service/Types";
/* import Form from "@/components/forms/Form"; */
import TemplateService, { Prompt } from "../../service/TemplateService";
/* import useAppData from "@/data/hook/useAppData";
import ProjetoService, { ProjetoPropriedade } from "@/data/service/ProjetoService"; */
import { MessageType, useAppContext } from '../../contexts';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SwitcherThree from '../../components/Switchers/SwitcherThree';

type FormData = {
  [key: string]: string | boolean;
}

const ProjetoNovo = () => {
  const templateService = new TemplateService()
  const { showMessage, setLoading } = useAppContext()
  const { handleSubmit, register, reset, formState: { errors } } = useForm<FormData>()
  const[ templates,setTemplates ] = useState<SelectItem[]>([])
  const[ template, setTemplate  ] = useState<string>()

  useEffect(() => {
    setLoading(true)
    templateService.listSelectItem()
        .then((data) => {
            setTemplates(data)
            setLoading(false)
        })
        .catch((error: Error) => {
            setTemplates([])
            showMessage({message: error.message, level: 'error'})
            setLoading(false)
        })
  },[])

  async function onSubmit(data: FormData){
/*     setLoading(true)
    const form = {
        nome: String(data.nome), 
        justificativa: String(data.justificativa), 
        temporario: Boolean(data.temporario),
        template: Number(data.template),
        propriedades: buildPropriedades(data,['nome', 'justificativa', 'temporario', 'template'])
    }
    service.create(form)
     .then(() => {
        setMessage({value: 'Projeto Criado com sucesso', type: 'success'})
        onReset()
        setLoading(false)
     })    
     .catch(error => {
         setMessage({value: error.message, type: 'error'})
         setLoading(false)
     }); */
}

  function onReset(){
    //setPrompts([])
    reset()
    setTemplate(undefined)
}

  return (
    <>
      <Breadcrumb pageName="Novo Projeto" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5.5 pt-1 p-6.5">
                <div>
                  <label className="mb-1 block text-black dark:text-white">Nome</label>
                  <input
                    {...register('nome', {
                      required: 'Campo Obrigatório', 
                      pattern: { value:  /^([a-z_][a-z0-9_\-]*)$/, message: 'Valor Inválido: letras miúsculas baixa sem espaços, hifem permitido.'}
                    })}
                    maxLength={20}
                    placeholder="Informe o nome do projeto ex: nome-api"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-black dark:text-white">Justificativa</label>
                  <textarea
                    rows={2}
                    placeholder="Descreva a motivação do projeto"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Repositório</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Escolha o Repositório...</option>
                        <option value="gitlab">Git Lab (CNP)</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Ferramenta de pipeline</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Escolha ferramenta de pipeline...</option>
                        <option value="gitlab">Git Lab Runner (CNP)</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Repositório Imagem</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Escolha o repositório da imagem...</option>
                        <option value="gitlab">Nexus (CNP)</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Destino do deploy</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Selecione o destino...</option>
                        <option value="gitlab">OpenShift (CNP)</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Namespace</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Escolha o namespace...</option>
                        <option value="sandbox-arq">sandbox-arq</option>
                        <option value="comunicacao">comunicação</option>
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-5">
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white">Template</label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                      <select
                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}                       >
                        <option selected disabled value="">Escolha o Template...</option>
                        {templates.map((template, index) => 
                          <option value={template.value} key={index}>
                              {template.label}
                          </option>
                        )}
                      </select>
                      <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                        <svg
                          className="fill-current"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g opacity="0.8">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                              fill=""
                            ></path>
                          </g>
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-1 block text-black dark:text-white"></label>
                    <div className="relative z-20 bg-transparent dark:bg-form-input">
                      <div className="flex flex-row gap-2 mt-8.5">
                        Temporário? <SwitcherThree />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjetoNovo;
