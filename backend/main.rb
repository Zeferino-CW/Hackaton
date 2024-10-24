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

# Exemplo de chamada para realizar recarga de celular
response = api_client.realizar_recarga('1', '11', '942005316', 10)
puts "Recarga realizada: #{response}"

# Exemplo de chamada para consultar operadoras
response = api_client.consultar_operadoras
puts "Operadoras disponíveis: #{response}"

# Exemplo de chamada para consultar transações
response = api_client.consultar_transacoes
puts "Transações: #{response}"
