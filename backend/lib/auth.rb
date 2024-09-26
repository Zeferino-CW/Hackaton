require 'base64'
require 'net/http'
require 'json'

class Auth
  def self.get_token(client_id, client_secret)
    # Codificar client_id e client_secret em base64
    b64 = Base64.strict_encode64("#{client_id}:#{client_secret}")

    # Configurar a URL para a requisição de autenticação
    url = URI("https://auth.sbx.rvhub.com.br/oauth2/token?grant_type=client_credentials")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    # Configurar a requisição POST
    request = Net::HTTP::Post.new(url)
    request["Content-Type"] = "application/x-www-form-urlencoded"
    request["Authorization"] = "Basic #{b64}"

    # Enviar a requisição e obter o token
    response = https.request(request)
    response_body = response.read_body

    # Verificar se a requisição foi bem-sucedida
    if response.code == '200'
      data = JSON.parse(response_body)
      data['access_token']
    else
      raise "Erro ao obter token: #{response.code} - #{response_body}"
    end
  end
end
