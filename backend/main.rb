require 'sinatra'
require 'json'
require_relative 'config/dotenv'
require_relative 'lib/auth'
require_relative 'lib/api_client'

# Carregar client_id e client_secret das variáveis de ambiente
client_id = ENV['CLIENT_ID']
client_secret = ENV['CLIENT_SECRET']

# Obter o token de autenticação
token = Auth.get_token(client_id, client_secret)

# Criar o cliente da API
api_client = ApiClient.new(token)

# Rota para realizar recarga de celular
post '/recarga' do
  data = JSON.parse(request.body.read)
  product_id = data["product_id"]
  area_code = data["area_code"]
  cell_phone_number = data["cell_phone_number"]
  amount = data["amount"]

  response = api_client.realizar_recarga(product_id, area_code, cell_phone_number, amount)
  content_type :json
  { data: response }.to_json
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
