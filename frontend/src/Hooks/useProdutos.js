import { useEffect, useState } from "react";

export function useProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/produtos/`);
        const data = await response.json();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  return { produtos, loading };
}
