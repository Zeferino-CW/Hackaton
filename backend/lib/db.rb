require 'pg'

class Database
  def self.connection
    @connection ||= PG.connect(ENV['DATABASE_URL'])
  end

  def self.save_response(response_data)
    connection.exec_params(
      "INSERT INTO requests (response) VALUES ($1)", 
      [response_data.to_json]
    )
  end
end
