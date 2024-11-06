require 'net/http'
require 'json'
require 'securerandom'

class ApiClient
  def initialize(token)
    @token = token
  end

  # Método para renovar o token usando Auth
  def renew_token
    client_id = ENV['CLIENT_ID']
    client_secret = ENV['CLIENT_SECRET']
    @token = Auth.get_token(client_id, client_secret)
  end

  def make_post_request(endpoint, payload)
    url = URI("https://api.sbx.rvhub.com.br/#{endpoint}")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Post.new(url)
    request["Authorization"] = "Bearer #{@token}"
    request["Content-Type"] = "application/json"
    request["X-Idempotency-Key"] = SecureRandom.uuid
    request.body = payload.to_json

    response = https.request(request)
    result = JSON.parse(response.read_body)

    # Verifica se o token expirou e renova se necessário
    if result["message"] == "The incoming token has expired"
      renew_token
      # Refaz a requisição com o novo token
      request["Authorization"] = "Bearer #{@token}"
      response = https.request(request)
      result = JSON.parse(response.read_body)
    end

    result
  end

  def make_get_request(endpoint)
    url = URI("https://api.sbx.rvhub.com.br/#{endpoint}")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Get.new(url)
    request["Authorization"] = "Bearer #{@token}"
    request["Content-Type"] = "application/json"

    response = https.request(request)
    result = JSON.parse(response.read_body)

    # Verifica se o token expirou e renova se necessário
    if result["message"] == "The incoming token has expired"
      renew_token
      # Refaz a requisição com o novo token
      request["Authorization"] = "Bearer #{@token}"
      response = https.request(request)
      result = JSON.parse(response.read_body)
    end

    result
  end

  def make_delete_request(endpoint)
    url = URI("https://api.sbx.rvhub.com.br/#{endpoint}")
    https = Net::HTTP.new(url.host, url.port)
    https.use_ssl = true

    request = Net::HTTP::Delete.new(url)
    request["Authorization"] = "Bearer #{@token}"
    request["Content-Type"] = "application/json"

    response = https.request(request)
    result = JSON.parse(response.read_body)

    # Verifica se o token expirou e renova se necessário
    if result["message"] == "The incoming token has expired"
      renew_token
      # Refaz a requisição com o novo token
      request["Authorization"] = "Bearer #{@token}"
      response = https.request(request)
      result = JSON.parse(response.read_body)
    end

    result
  end

  # Função para realizar uma recarga de celular
  def realizar_recarga(product_id, area_code, cell_phone_number, amount)
    payload = {
      product_id: product_id,
      area_code: area_code,
      cell_phone_number: cell_phone_number,
      amount: amount
    }
    make_post_request('cellphone-topups/transactions', payload)
  end

  # Função para consultar todas as transações
  def consultar_transacoes
    make_get_request('cellphone-topups/transactions')
  end

  # Função para consultar uma transação específica
  def consultar_transacao(id)
    make_get_request("cellphone-topups/transactions/#{id}")
  end

  # Função para confirmar uma transação
  def confirmar_transacao(id)
    make_post_request("cellphone-topups/transactions/#{id}/capture", {})
  end

  # Função para desfazer uma transação
  def desfazer_transacao(id)
    make_delete_request("cellphone-topups/transactions/#{id}")
  end

  # Função para consultar operadoras
  def consultar_operadoras
    make_get_request('portfolio/providers')
  end

  def consultar_produtos(endpoint)
    make_get_request(endpoint)
  end
end
