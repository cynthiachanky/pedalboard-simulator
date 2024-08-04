export class FetchError extends Error {
  error: string;

  constructor(name: string, message: string) {
    super(message);
    this.name = 'FetchError';
    this.error = name;
  }
}

// export const getConfig = async (): Promise<PedalConfig[]> => {
//   const res = await fetch('/api/config', {method: 'GET'});
//   const data = await res.json();
//   if (res.ok) return data;
//   else throw new FetchError(data.error || String(res.status), data.message || res.statusText);
// };

export const processAudio = async (boardConfig: Pedal[], audioFile: File): Promise<ArrayBuffer> => {
  const payload = new FormData();
  payload.append('pedalboard', JSON.stringify(boardConfig));
  payload.append('audio', audioFile);

  const res = await fetch('/api/simulation', {method: 'POST', body: payload});
  if (res.ok) return await res.arrayBuffer();
  else {
    const {error, message} = await res.json();
    throw new FetchError(error || String(res.status), message || res.statusText);
  }
};
