require 'sinatra'
require 'sinatra/cors'
require 'json'
require_relative 'config/dotenv'
require_relative 'lib/auth'
require_relative 'lib/api_client'
require_relative 'lib/db'

# Configuração do CORS para permitir requisições de origens diferentes
set :allow_origin, "http://localhost:3000"  # Ou qualquer origem que você esteja usando no frontend
set :allow_methods, "GET,POST,OPTIONS"
set :allow_headers, "Content-Type,Authorization,X-Requested-With"

# Carregar client_id e client_secret das variáveis de ambiente
client_id = ENV['CLIENT_ID']
client_secret = ENV['CLIENT_SECRET']

# Obter o token de autenticação
token = Auth.get_token(client_id, client_secret)

# Criar o cliente da API
api_client = ApiClient.new(token)

# Criar a tabela de requests no PostgreSQL se ainda não existir
Database.connection.exec <<-SQL
  CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    response JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
SQL

# Rota para realizar recarga de celular
post '/recarga' do
  data = JSON.parse(request.body.read)
  product_id = data["product_id"]
  area_code = data["area_code"]
  cell_phone_number = data["cell_phone_number"]
  amount = data["amount"]

  # Realizar a recarga
  response = api_client.realizar_recarga(product_id, area_code, cell_phone_number, amount)
  
  # Salvar a resposta no banco de dados
  Database.save_response(response)
  
  content_type :json
  { message: "Recarga realizada com sucesso", data: response }.to_json
end

# Rota para consultar operadoras
get '/operadoras' do
  response = api_client.consultar_operadoras
  content_type :json
  { operadoras: response }.to_json
end

# Rota para consultar transações
get '/transacoes' do
  response = api_client.consultar_transacoes
  content_type :json
  { transacoes: response }.to_json
end
