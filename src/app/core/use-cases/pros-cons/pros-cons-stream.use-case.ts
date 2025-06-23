import { environment } from 'environments/environment';

export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal): AsyncGenerator<string> {
  try {
    const resp = await fetch(
      `${environment.backendApi}/pros-cons-discusser-stream`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
        signal: abortSignal,
      }
    );
    if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}, No se pudo realizar la comparación de pros y contras`);

    const reader = resp.body?.getReader();
    if (!reader) throw new Error('No se pudo obtener el lector de la respuesta');


    const decoder = new TextDecoder('utf-8');
    let text = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
      yield text; // Emitimos el texto parcial
    }


    return text;


  } catch (error) {
    console.error('Error in prosConsStreamUseCase:', error);
    return null;
  }
};
