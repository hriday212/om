export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { points, matter, weight } = req.body;
  const BORZO_SANDBOX_TOKEN = "5227CBA1AC19DC1AD08FFFF6CA66FFEB995E0D9A";
  
  // vehicle_type_id: 7 = motorcycle, 8 = car (for weight > 20kg)
  const vehicleTypeId = (weight && parseFloat(weight) > 20) ? 8 : 7;

  try {
    const response = await fetch("https://robotapitest-in.borzodelivery.com/api/business/1.8/calculate-order", {
      method: "POST",
      headers: {
        "X-DV-Auth-Token": BORZO_SANDBOX_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        matter: matter || "Fresh Pickles & Snacks (Om Coldrink House)",
        vehicle_type_id: vehicleTypeId,
        points: points
      })
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Borzo proxy error:", error);
    return res.status(500).json({ is_successful: false, errors: [error.message] });
  }
}
