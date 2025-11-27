import { useEffect, useState } from "react";

export function useClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClientes() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/clientes/`
        );
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchClientes();
  }, []);

  return { clientes, loading };
}
