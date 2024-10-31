# Usar a imagem oficial do Ruby 3.0.2
FROM ruby:3.0.2

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar os arquivos do projeto para o diretório de trabalho
COPY . .

# Instalar as dependências necessárias
RUN gem install bundler && gem install dotenv sinatra rackup pg

# Expor a porta 4567, que é o padrão do Sinatra
EXPOSE 4567

# Rodar a aplicação com rackup
CMD ["rackup", "--host", "0.0.0.0", "--port", "4567"]
