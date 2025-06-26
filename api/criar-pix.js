export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const token = '33e85c6700fa919df9c37d99aeb604253bff2e639086c66024decdb199344ae1'; // <--- Troque aqui

  const payload = {
    amount: 150.75,
    payment: { method: 'pix' },
    customer: {
      name: "frederick aquino",
      email: "frederickaquino@gmail.com",
      cpf: "12345678912",
      phone: "(00) 00000-0000"
    }
  };

  try {
    const resposta = await fetch('https://api.risepay.com.br/api/External/Transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(payload)
    });

    const dados = await resposta.json();
    res.status(200).json(dados);
  } catch (err) {
    console.error('Erro ao criar transação:', err);
    res.status(500).json({ error: 'Erro ao gerar Pix' });
  }
}
