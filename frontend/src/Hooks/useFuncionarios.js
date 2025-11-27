import { useEffect, useState } from "react";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFuncionarios() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/funcionarios/`
        );
        const data = await response.json();
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFuncionarios();
  }, []);

  return { funcionarios, loading };
}
