require 'net/http'
require 'json'
require 'securerandom'

class ApiClient
  def initialize(token)
    @token = token
  end

  def make_post_request(endpoint, payload)
    url = URI("https://api.sbx.rvhub.com.br/#{endpoint}")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    # Configurar a requisição POST com a chave de idempotência
    request = Net::HTTP::Post.new(url)
    request["Authorization"] = "Bearer #{@token}"
    request["Content-Type"] = "application/json"
    request["X-Idempotency-Key"] = SecureRandom.uuid

    request.body = payload.to_json

    # Enviar a requisição
    response = https.request(request)
    JSON.parse(response.read_body)
  end
end
