import {ReactNode, useEffect, useState } from "react"

import { useForm } from 'react-hook-form';
import { SelectItem } from "../../service/Types";
/* import Form from "@/components/forms/Form"; */
import TemplateService, { Prompt } from "../../service/TemplateService";
/* import useAppData from "@/data/hook/useAppData"; */
import ProjetoService, { ProjetoPropriedade } from "../../service/ProjetoService";
import { MessageType, useAppContext } from '../../contexts';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Switcher from '../../components/Switchers/Switcher';
import Toolbar from "../../components/Toolbar/Toolbar";

type FormData = {
  [key: string]: string | boolean;
}

const ProjetoNovo = () => {
  const service = new ProjetoService()
  const templateService = new TemplateService()
  const { showMessage, setLoading } = useAppContext()
  const { handleSubmit, register, reset, formState: { errors, isSubmitting } } = useForm<FormData>()
  const[ templates,setTemplates ] = useState<SelectItem[]>([])
  const[ prompts,  setPrompts   ] = useState<Prompt[]>([])  
  const[ template, setTemplate  ] = useState<string>()
  const [temporario, setTemporario] = useState(false);

  useEffect(() => {
    setLoading(true)
    templateService.listSelectItem()
        .then((data) => {
          setTemplates(data)
          setLoading(false)
        })
        .catch((error: Error) => {
          setTemplates([])
          showMessage({message: error.message, level: MessageType.Error})
          setLoading(false)
        })
  },[])

  useEffect(() => {
    if(template){
        setLoading(true)            
        templateService.findById(template)
        .then((data) => {
          setLoading(false)          
          setPrompts(data.prompts)
        })
        .catch((error: Error) => {
          showMessage({message: error.message, level: MessageType.Error})
          setLoading(false)
          setPrompts([])          
        })
    }
},[template])

function buildPropriedades(data: FormData, excluir: string[]): ProjetoPropriedade[]{
  const result: ProjetoPropriedade[] = []
  for (const key in data) {
      if (!excluir.includes(key)) {
          result.push({nome: key, valor: String(data[key])})
      }
  }
  return result
}

function makeInput(prompt: Prompt){
  if(prompt.tipo === 'CONFIRM'){
    return (
      <input 
        type="checkbox" 
        {...register(prompt.nome,)}
        className={`ml-2 mr-2 mt-0.5 w-5 h-5 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
      />
    )
  }else if(prompt.tipo ===  'LIST'){
    return (
      <select {...register(prompt.nome,{ required: 'Campo Obrigatório',})}
        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}        
      >
        <option value="">Selecione a opção...</option>
        {prompt.opcoes?.map((item, index) => (
            <option value={item.valor} key={index}>{item.rotulo}</option>
        ))}
      </select>
    )
  }else{
      const validate = {required: 'Campo obrigatório'}
      if(prompt.regex) validate['pattern'] = {value: RegExp(prompt.regex), message: 'Formato inválido'}
      return( 
        <input
          {...register(prompt.nome, validate)}   
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"          
        />
      )
  }
}

async function onSubmit(data: FormData){
    setLoading(true)
    const form = {
      nome: String(data.nome), 
      justificativa: String(data.justificativa), 
      temporario: temporario,
      template: String(data.template),
      repositorio : String(data.repositorio),
      pipeline: String(data.pipeline),
      registry: String(data.registry),
      deploy: String(data.deploy),
      namespace: String(data.namespace),
      propriedades: buildPropriedades(data,['nome', 'justificativa', 'temporario', 'template', 'repositorio', 'pipeline', 'registry','deploy', 'namespace'])
    }
    service.create(form)
     .then(() => {
        showMessage({message: 'Projeto Criado com sucesso', level: MessageType.Success})
        onReset()
        setLoading(false)
     })    
     .catch(error => {
        showMessage({message: error.message, level: MessageType.Error})
        setLoading(false)
     });
}

  function onReset(){
    setPrompts([])
    reset()
    setTemplate(undefined)
}

  return (
    <form onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
      <Toolbar title="Novo Projeto">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-400 py-2 px-3 mr-3 w-24 rounded cursor-pointer text-white shadow-lg">
            Salvar
        </button>
      </Toolbar>
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 pt-1 p-6.5">
              <div>
                <label htmlFor="nome" className="mb-1 block text-black dark:text-white">Nome</label>
                <input
                  {...register('nome', {
                    required: 'Campo obrigatório', 
                    pattern: { value:  /^([a-z_][a-z0-9_\-]*)$/, message: 'Valor inválido: letras miúsculas baixa sem espaços, hifem permitido.'}
                  })}
                  maxLength={20}
                  placeholder="Informe o nome do projeto ex: nome-api"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                {errors.nome && <p className="text-red-500">{errors.nome.message}</p>}
              </div>
              <div>
                <label htmlFor="justificativa" className="mb-1 block text-black dark:text-white">Justificativa</label>
                <textarea
                  rows={2}
                  {...register('justificativa', {
                      required: 'Campo obrigatório', 
                      min: {value: 10, message: 'Tamanho mínimo 10'} 
                  })}
                  maxLength={200}
                  placeholder="Descreva a motivação do projeto"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-2 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
                {errors.justificativa && <p className="text-red-500">{errors.justificativa.message}</p>}
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="repositorio" className="mb-1 block text-black dark:text-white">Repositório</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('repositorio', {required: 'Campo obrigatório'})}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione o repositório...</option>
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
                  {errors.repositorio && <p className="text-red-500">{errors.repositorio.message}</p>}
                </div>
                <div className="flex flex-col">
                  <label htmlFor="pipeline" className="mb-1 block text-black dark:text-white">Ferramenta de pipeline</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('pipeline', {required: 'Campo obrigatório'})}                      
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione ferramenta de pipeline...</option>
                      <option value="gtrunner">Git Lab Runner (CNP)</option>
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
                    {errors.pipeline && <p className="text-red-500">{errors.pipeline.message}</p>}
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="registry" className="mb-1 block text-black dark:text-white">Repositório Imagem</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('registry', {required: 'Campo obrigatório'})}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione o repositório da imagem...</option>
                      <option value="nexus">Nexus (CNP)</option>
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
                    {errors.registry && <p className="text-red-500">{errors.registry.message}</p>}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="deploy" className="mb-1 block text-black dark:text-white">Destino do deploy</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('deploy', {required: 'Campo obrigatório'})}                      
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione o destino...</option>
                      <option value="openshift">OpenShift (CNP)</option>
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
                    {errors.deploy && <p className="text-red-500">{errors.deploy.message}</p>}                      
                  </div>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="namespace" className="mb-1 block text-black dark:text-white">Namespace</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('namespace', {required: 'Campo obrigatório'})}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione o namespace...</option>
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
                    {errors.namespace && <p className="text-red-500">{errors.namespace.message}</p>}                      
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="template" className="mb-1 block text-black dark:text-white">Template</label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">                  
                    <select
                      {...register('template', {
                        required: 'Campo obrigatório',
                        onChange: (e) => setTemplate(e.target.value)
                      })}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-2 px-2 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}>
                      <option selected disabled value="">Selecione o template...</option>
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
                    {errors.template && <p className="text-red-500">{errors.template.message}</p>}                      
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="mb-1 block text-black dark:text-white"></label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <div className="flex flex-row gap-2 mt-8.5">
                      Temporário?
                      <Switcher 
                        setEnabled={setTemporario} enabled={temporario} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="ml-6 mr-6 h-0.5 border-t-0 bg-black opacity-40 dark:opacity-100 mb-2" />
            <div className="flex flex-col w-115 pl-5">
                {prompts.map((prompt) => {
                  return (
                    <div key={prompt.nome} className={`flex ${prompt.tipo === 'CONFIRM' ? 'flex-row':'flex-col'} pt-2 pb-2`}>
                      <label htmlFor={`[${prompt.nome}]`}>{prompt.mensagem} {prompt.exemplo && (<span className="text-gray-400 ml-2">{`( ${prompt.exemplo} )`}</span>)}</label>
                      {makeInput(prompt)}
                      {errors?.[prompt.nome] && <span className="text-red-500 dark:text-red-400">{errors?.[prompt.nome]?.message}</span>}
                    </div>)
                })
                }
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProjetoNovo;
