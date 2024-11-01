const rechargeType = [" ", "Telefonia"];

const operadoras = [" ", "Claro", "Oi", "Tim", "Vivo"]; // colocar as operadoras com product_id

const operadorasId = {Claro: 1, Oi: 2, Tim: 3, Vivo: 4};

const rechargeValues = [" ", "10", "15", "20", "25", "50"];

const telefonia = {rechargeType, operadoras, operadorasId, rechargeValues};

export default telefonia;

// exemplo de body para o request de rechargeValues

// {"product_id": "1", "area_code": "11", "cell_phone_number": "942005316", "amount": 10}