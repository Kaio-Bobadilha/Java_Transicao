import { useState, useEffect } from "react";

export function useFornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFornecedores() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/fornecedores/`);
        const data = await response.json();
        setFornecedores(data);
      } catch (err) {
        console.error("Erro ao buscar fornecedores:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchFornecedores();
  }, []);

  return { fornecedores, loading };
}
