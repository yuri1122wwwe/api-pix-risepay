export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // Insira seu token privado RisePay abaixo, no formato "Bearer TOKEN_AQUI"
  const token = 'Bearer 33e85c6700fa919df9c37d99aeb604253bff2e639086c66024decdb199344ae1';

  const { amount, payment, customer } = req.body;

  if (!amount || !payment || !customer) {
    return res.status(400).json({ error: 'Dados incompletos' });
  }

  try {
    const response = await fetch('https://api.risepay.com.br/api/External/Transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({ amount, payment, customer })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('Erro na API RisePay:', error);
    return res.status(500).json({ error: 'Erro ao gerar Pix' });
  }
}
