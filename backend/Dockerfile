# Usar a imagem oficial do Ruby
FROM ruby:3.0.2

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Instalar as dependências (dotenv no caso)
RUN gem install bundler && gem install dotenv

# Expor a porta 3000 (caso você precise, ou remova se não usar)
EXPOSE 3000

# Rodar o arquivo main.rb
CMD ["ruby", "main.rb"]
