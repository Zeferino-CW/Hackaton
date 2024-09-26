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

# Fazer uma chamada de exemplo (substitua com seu endpoint e payload)
response = api_client.make_post_request('cellphone-topups/transactions', { 
    "product_id": "1",
    "area_code": "11",
    "cell_phone_number": "999990002" 
    })
puts response
