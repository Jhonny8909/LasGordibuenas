document.getElementById("shippingForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const API_KEY = "shippo_test_65874286ae8aaa1b265c2dbb5db54cb24d0d8954"; // Tu clave API sandbox
    const data = {
      address_from: {
        name: "Tienda Gorditas de Nata",
        street1: "123 Calle Principal",
        city: "Guadalajara",
        state: "JAL",
        zip: "45000",
        country: "MX",
      },
      address_to: {
        name: document.getElementById("name").value,
        street1: document.getElementById("street").value,
        city: document.getElementById("city").value,
        state: document.getElementById("state").value,
        zip: document.getElementById("zip").value,
        country: "MX",
      },
      parcels: [
        {
          length: "10",
          width: "10",
          height: "5",
          distance_unit: "in",
          weight: document.getElementById("weight").value || "2",
          mass_unit: "lb",
        },
      ],
      async: false,
    };
  
    console.log("Datos enviados a Shippo:", data);
  
    try {
      const response = await fetch("https://api.goshippo.com/shipments/", {
        method: "POST",
        headers: {
          Authorization: `ShippoToken ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      console.log("Resultado de la simulación:", result);
  
      // Mostrar mensajes de advertencia o errores de la API
      if (result.messages && result.messages.length > 0) {
        console.warn("Mensajes devueltos por Shippo:", result.messages);
      }
  
      // Validar tarifas
      if (!result.rates || result.rates.length === 0) {
        throw new Error("No se encontraron tarifas disponibles. Revisa los datos enviados o los transportistas configurados.");
      }
  
      // Mostrar tarifas disponibles
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerHTML = "<h2>Tarifas disponibles:</h2>";
      result.rates.forEach((rate) => {
        resultsDiv.innerHTML += `
          <p>
            Transportista: ${rate.provider} <br>
            Servicio: ${rate.servicelevel.name} <br>
            Precio: ${rate.amount_local} ${rate.currency_local} <br>
            Tiempo estimado: ${rate.estimated_days} días<br>
          </p>
          <hr>
        `;
      });
    } catch (error) {
      console.error("Error al simular el envío:", error);
      const resultsDiv = document.getElementById("results");
      if (resultsDiv) {
        resultsDiv.innerHTML = `<p>${error.message}</p>`;
      }
    }
  });