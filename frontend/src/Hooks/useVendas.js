import { useEffect, useState } from "react";

export function useVendas() {
  const [vendas, setVendas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVendas() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/vendas/`
        );
        const data = await response.json();
        setVendas(data);
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVendas();
  }, []);

  return { vendas, loading };
}
