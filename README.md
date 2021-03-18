## Instalação

**1° Passo**: Clonar o repositório do projeto utilizando o terminal (ex.: GitBash):

```bash
git clone https://bitbucket.org/cristianovelkan/yoga-toolbox-front
```

**2° Passo**: Verificar requisitos do sistema para o funcionamento do projeto.

* [Nuxt](https://nuxtjs.org/docs/2.x/get-started/installation/) v2.14.12

* [Node](https://nodejs.org/en/about/) - no mínimo a versão v10.13 é recomendada. (Para verificar sua versão é possível digitar node -v em seu terminal)

**3° Passo**: Se os requisitos estiverem corretos, é necessário criar um arquivo de configuração do ambiente de desenvolvimento, o **.env**.
Crie um arquivo .env na raiz do projeto e siga os passos a seguir.

## Configurar Variáveis do .env

Para configurar as variáveis do **.env**, abra o arquivo e edite as seguintes:

1. **API_ROOT**: é a url do servidor da api. Ex: http://localhost:8000 
2. **APP_NAME**: (opcional) Define o título da aplicação
3. **PORT**: (opcional) este valor deve ser setado somente caso necessário, pois por padrão a porta utilizada é a 3000

Exemplo do .env:

```
API_ROOT=http://localhost:8000
APP_NAME="Yoga App"
```

## Instalação de Dependências
Após a configuração do .env é necessário instalar as dependências npm (node_modules) rodando o seguinte comando:

```
npm i
```

ou se tiver o yarn instalado:

```
yarn
```

## Rodando a aplicação
Após instalação das dependências do npm, você pode rodar a aplicação por meio do seguinte comando:

```
npm run dev
```

Ou pelo yarn:

```
yarn dev
```

## Problemas comuns
Devido ao sistemas de arquivos dos sistemas operacionais, algumas vezes ao clonar o projeto e tentar rodar ele apresentará alguns erros. Para corrigi-los de forma rápida é possível executar os comando abaixo:

```
eslit --ext .vue --fix .
eslit --ext .js --fix .
```

## Build Setup

Para buildar a versão final da aplicação no sevidor do cliente é necessário executar os passo abaixo:
```bash
npm run generate
```

ou pelo yarn 
```
yarn generate
```

ou pelo npx (de forma mais atualizada possível, forma recomendada):
```
npx nuxt generate
```
