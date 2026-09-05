export type ExchangeRates = {
  pygPerUsd: number;
  eurPerUsd: number;
  updatedAt: string;
};

type OpenErApiResponse = {
  result?: string;
  time_last_update_unix?: number;
  rates?: {
    PYG?: number;
    EUR?: number;
  };
};

export async function getRates(): Promise<ExchangeRates | null> {
  const res = await fetch("https://open.er-api.com/v6/latest/USD", {
    next: { revalidate: 86400, tags: ["exchange-rates"] },
  });
  if (!res.ok) return null;

  const data = (await res.json()) as OpenErApiResponse;
  const pyg = Number(data.rates?.PYG);
  const eur = Number(data.rates?.EUR);
  if (data.result !== "success") return null;
  if (!Number.isFinite(pyg) || pyg <= 0) return null;
  if (!Number.isFinite(eur) || eur <= 0) return null;

  const updatedAt = data.time_last_update_unix
    ? new Date(data.time_last_update_unix * 1000).toISOString()
    : "";

  return {
    pygPerUsd: pyg,
    eurPerUsd: eur,
    updatedAt,
  };
}
