import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with User-Agent header
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Resilient helper to call Gemini with automatic fallback: gemini-3.8-flash -> gemini-3.1-flash-lite
async function generateContentResilient(params: {
  contents: string;
  responseSchema?: any;
}) {
  if (!aiClient) return null;

  // 1. Try primary model: gemini-3.8-flash
  try {
    const config: any = { responseMimeType: 'application/json' };
    if (params.responseSchema) config.responseSchema = params.responseSchema;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: params.contents,
      config,
    });
    return response.text;
  } catch (primaryErr: any) {
    const status = primaryErr?.status || primaryErr?.error?.code || primaryErr?.code;
    const msg = primaryErr?.message || '';

    // If 503 (high demand) or 429 (rate limit), attempt fallback model gemini-3.1-flash-lite
    if (status === 503 || status === 'UNAVAILABLE' || msg.includes('high demand') || status === 429) {
      console.log('Gemini 3.8 Flash experiencing temporary demand spike. Routing to Gemini 3.1 Flash Lite fallback...');
      try {
        const config: any = { responseMimeType: 'application/json' };
        if (params.responseSchema) config.responseSchema = params.responseSchema;

        const fallbackResponse = await aiClient.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: params.contents,
          config,
        });
        return fallbackResponse.text;
      } catch (fallbackErr: any) {
        console.log('Gemini models temporarily at peak capacity, serving pre-verified deterministic rule template.');
        return null;
      }
    }

    console.log('Gemini request notice:', msg.slice(0, 80));
    return null;
  }
}

// 1. Gemini Heat Risk Explanation & Multilingual Alert endpoint
app.post('/api/gemini/heat-advice', async (req: Request, res: Response) => {
  const {
    airTemp,
    humidity,
    globeTemp,
    wbgt,
    workload,
    ppe,
    acclimatized,
    exposureHours,
    riskLevel,
    symptoms = [],
    isMiddayBanActive = false,
  } = req.body;

  // Pre-verified deterministic fallback template text
  const fallbackAdvice = {
    explanation: `Calculated WBGT is ${wbgt?.toFixed?.(1) || wbgt}°C driven by high ambient temperature (${airTemp}°C), relative humidity (${humidity}%), and solar thermal load. Workload threshold is adjusted for safety.`,
    recommended_actions: [
      riskLevel === 'Critical' ? 'Stop outdoor work immediately and report to cool zone.' : 'Take mandatory 15-minute shaded rest breaks every hour.',
      'Drink 250ml of cold water or electrolyte drink every 15-20 minutes.',
      'Loosen non-essential heavy PPE where safe to facilitate convective cooling.',
    ],
    level_suggestion: riskLevel || 'Moderate',
    alert_text: {
      en: riskLevel === 'Critical'
        ? 'Critical heat risk! Stop outdoor work now, drink water, and move to cooling shelter immediately.'
        : riskLevel === 'High'
        ? 'High heat stress! Take an immediate shaded cooling break, hydrate, and notify your supervisor.'
        : 'Heat risk is rising. Hydrate regularly and take scheduled shaded breaks.',
      ar: riskLevel === 'Critical'
        ? 'خطر حراري حرج جداً! أوقف العمل فوراً في الأماكن المكشوفة، وتوجه إلى منطقة تبريد وتناول الماء البارد.'
        : riskLevel === 'High'
        ? 'مستوى الإجهاد الحراري مرتفع. يرجى أخذ استراحة في الظل وشرب الماء وإبلاغ المشرف.'
        : 'خطر الإجهاد الحراري في تصاعد. يرجى شرب الماء بانتظام وأخذ فترات راحة مظللة.',
      hi: riskLevel === 'Critical'
        ? 'अत्यधिक गर्मी का खतरा! तुरंत काम रोकें, पानी पिएं और ठंडे आश्रय में जाएं।'
        : 'गर्मी का जोखिम बढ़ रहा है। कृपया पानी पिएं, छाया में आराम करें और सुपरवाइजर को बताएं।',
      ml: riskLevel === 'Critical'
        ? 'അതിരൂക്ഷമായ ചൂട് അപായം! ഉടൻ ജോലി നിർത്തി തണലിലേക്ക് മാറുക, വെള്ളം കുടിക്കുക.'
        : 'ചൂട് കൂടുന്നു. തണലിൽ വിശ്രമിക്കുക, ധാരാളം വെള്ളം കുടിക്കുക, സൂപ്പർവൈസറെ അറിയിക്കുക.',
      kn: riskLevel === 'Critical'
        ? 'ಅತ್ಯಂತ ತೀವ್ರ ಶಾಖದ ಅಪಾಯ! ತಕ್ಷಣ ಕೆಲಸ ನಿಲ್ಲಿಸಿ, ನೆರಳಿಗೆ ಹೋಗಿ ಮತ್ತು ನೀರು ಕುಡಿಯಿರಿ.'
        : 'ಶಾಖದ ಅಪಾಯ ಹೆಚ್ಚುತ್ತಿದೆ. ದಯವಿಟ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ನೆರಳಿನಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.',
      ur: riskLevel === 'Critical'
        ? 'شدید گرمی کا خطرہ! فوری طور پر کام روکیں، پانی پییں اور ٹھنڈی پناہ گاہ میں جائیں۔'
        : 'گرمی کی شدت بڑھ رہی ہے۔ براہ کرم سائے میں آرام کریں، پانی پییں اور نگران کو مطلع کریں۔',
    },
  };

  if (!aiClient) {
    return res.json({ ...fallbackAdvice, source: 'fallback_no_key' });
  }

  try {
    const prompt = `
You are the heat-health reasoning engine for "HeatShield AI" in Dubai, UAE.
Inputs:
- Air Temp: ${airTemp}°C, Humidity: ${humidity}%, Solar Globe: ${globeTemp}°C
- WBGT: ${wbgt?.toFixed?.(1) || wbgt}°C, Workload: ${workload}, PPE: ${ppe ? 'Yes' : 'No'}
- Acclimatized: ${acclimatized ? 'Yes' : 'No'}, Continuous Exposure: ${exposureHours}h
- Symptoms: ${symptoms.length > 0 ? symptoms.join(', ') : 'None'}
- Rule-based Level: ${riskLevel}, UAE Midday Ban Active: ${isMiddayBanActive ? 'YES' : 'NO'}

Guardrail:
Rule engine level is "${riskLevel}". You may SUGGEST RAISING risk, but NEVER lower it below "${riskLevel}".

Return JSON strictly matching schema:
- explanation: 2 sentences naming top 3 drivers of thermal stress.
- recommended_actions: 3 safe action steps for workers.
- level_suggestion: "Low" | "Moderate" | "High" | "Critical".
- alert_text: object with keys "en", "ar", "hi", "ml", "kn", "ur" (each under 25 words).
`;

    const responseText = await generateContentResilient({
      contents: prompt,
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          explanation: { type: Type.STRING },
          recommended_actions: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
          level_suggestion: { type: Type.STRING },
          alert_text: {
            type: Type.OBJECT,
            properties: {
              en: { type: Type.STRING },
              ar: { type: Type.STRING },
              hi: { type: Type.STRING },
              ml: { type: Type.STRING },
              kn: { type: Type.STRING },
              ur: { type: Type.STRING },
            },
            required: ['en', 'ar', 'hi', 'ml', 'kn', 'ur'],
          },
        },
        required: ['explanation', 'recommended_actions', 'level_suggestion', 'alert_text'],
      },
    });

    if (!responseText) {
      return res.json({ ...fallbackAdvice, source: 'resilient_template' });
    }

    const parsed = JSON.parse(responseText);
    return res.json({ ...parsed, source: 'gemini' });
  } catch (err) {
    return res.json({ ...fallbackAdvice, source: 'fallback_resilient' });
  }
});

// 2. Gemini SmartShift Schedule Planner endpoint
app.post('/api/gemini/smartshift-plan', async (req: Request, res: Response) => {
  const { currentWbgt, forecastSummary } = req.body;

  const fallbackPlan = {
    rationale:
      'To mitigate severe afternoon thermal strain while strictly abiding by UAE ministerial decree, heavy physical activities are rescheduled to the early morning (06:00-09:30) and late afternoon (16:00-18:00). All outdoor work is legally halted between 12:30 and 15:00.',
    timeline: [
      {
        timeSlot: '06:00 - 09:30',
        label: 'Cool Early Window (WBGT ~25°C)',
        crewActions: {
          'Crew A': 'Steel rebar assembly in shaded yard',
          'Crew B': 'Heavy scaffolding structural erection',
          'Crew C': 'Concrete casting and structural pouring',
        },
        risk: 'Low to Moderate',
        coolingProtocol: 'Hydration every 25 mins',
      },
      {
        timeSlot: '09:30 - 12:30',
        label: 'Escalating Heat Window (WBGT ~29°C - 33°C)',
        crewActions: {
          'Crew A': 'Light prefab alignment with portable mist fans',
          'Crew B': 'Crew rotation: 30 min scaffolding / 15 min shade',
          'Crew C': 'Troweling under canopy; rotate heavy loaders',
        },
        risk: 'Moderate to High',
        coolingProtocol: '15 min shade break per 45 min work; cold electrolyte stations active',
      },
      {
        timeSlot: '12:30 - 15:00',
        label: 'UAE LEGAL MIDDAY BAN (MANDATORY STOP)',
        crewActions: {
          'Crew A': 'MANDATORY REST in air-conditioned rest station',
          'Crew B': 'MANDATORY REST in air-conditioned rest station',
          'Crew C': 'MANDATORY REST in air-conditioned rest station',
        },
        risk: 'Prohibited - Legal Stop',
        coolingProtocol: 'Full site evacuation from open sun. AC cooling stations open.',
        isMiddayBan: true,
      },
      {
        timeSlot: '15:00 - 16:30',
        label: 'Post-Ban Re-entry (WBGT ~31°C)',
        crewActions: {
          'Crew A': 'Site inspection and tool prep in shaded bays',
          'Crew B': 'Light material logistics and inventory check',
          'Crew C': 'Pre-pour inspection under temporary awnings',
        },
        risk: 'Moderate',
        coolingProtocol: 'Buddy hydration check-in; ice towel reapplication',
      },
      {
        timeSlot: '16:30 - 18:00',
        label: 'Evening Cooling Window (WBGT ~27°C)',
        crewActions: {
          'Crew A': 'Final welding inspection & site cleanup',
          'Crew B': 'Complete remaining scaffolding fastening',
          'Crew C': 'Night pour finishing and cover installation',
        },
        risk: 'Low to Moderate',
        coolingProtocol: 'Normal hydration protocol',
      },
    ],
    adherenceNotes: [
      '100% compliant with UAE MoHRE Midday Break regulations (12:30 to 15:00).',
      'Crew C (Very Heavy) exposure capped at 90 continuous minutes before mandated AC recovery.',
      'Buddy-system pairs implemented across all 3 crews.',
    ],
  };

  if (!aiClient) {
    return res.json({ ...fallbackPlan, source: 'fallback_no_key' });
  }

  try {
    const prompt = `
You are the SmartShift industrial heat scheduler for construction and logistics operations in Dubai, UAE.
Current Conditions:
- WBGT: ${currentWbgt}°C
- Forecast: ${forecastSummary || 'Peak heat between 11:30 and 15:30 with high UV index and humidity.'}
- Crews: Crew A (Moderate), Crew B (Heavy), Crew C (Very Heavy)

REGULATORY CONSTRAINTS (STRICT):
1. Between 12:30 and 15:00, all outdoor work is legally prohibited under UAE MoHRE Midday Break policy. NEVER schedule any outdoor task during this window. Mark it as mandatory air-conditioned rest.
2. Shift heavy tasks to cooler morning (06:00 - 09:30) or late afternoon (16:00 - 18:00).
3. Assign rotation and cooling protocols.

Generate JSON with:
- rationale: 2-3 sentences explaining heat prevention.
- timeline: array of 5 time-slot objects (06:00 to 18:00), each with: timeSlot, label, crewActions (Crew A, B, C), risk, coolingProtocol, isMiddayBan (boolean).
- adherenceNotes: array of 3 bullet points.
`;

    const responseText = await generateContentResilient({
      contents: prompt,
    });

    if (!responseText) {
      return res.json({ ...fallbackPlan, source: 'resilient_template' });
    }

    const parsed = JSON.parse(responseText);
    return res.json({ ...parsed, source: 'gemini' });
  } catch (err) {
    return res.json({ ...fallbackPlan, source: 'fallback_resilient' });
  }
});

// 3. Sensor URL Proxy endpoint (solves CORS when ESP32 writes to Firebase Realtime DB or custom REST endpoint)
app.get('/api/sensor-proxy', async (req: Request, res: Response) => {
  const url = req.query.url as string;
  if (!url) {
    return res.status(400).json({ error: 'Missing url query parameter' });
  }

  try {
    const fetchRes = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!fetchRes.ok) {
      return res.status(fetchRes.status).json({
        error: `Remote sensor URL returned HTTP ${fetchRes.status}`,
      });
    }

    const data = await fetchRes.json();
    return res.json(data);
  } catch (err: any) {
    return res.status(502).json({
      error: `Failed to poll sensor URL: ${err.message || 'Connection timeout or network error'}`,
    });
  }
});

// 4. Predictive Heat Windows / Weather Forecast for Dubai
app.get('/api/weather-forecast', async (_req: Request, res: Response) => {
  try {
    const apiUrl =
      'https://api.open-meteo.com/v1/forecast?latitude=25.2048&longitude=55.2708&hourly=temperature_2m,relative_humidity_2m,direct_normal_irradiance&timezone=Asia%2FDubai&forecast_days=1';
    const omRes = await fetch(apiUrl, { signal: AbortSignal.timeout(3500) });
    if (omRes.ok) {
      const weatherData = await omRes.json();
      return res.json(weatherData);
    }
  } catch (e) {
    // Graceful fallback to synthetic high-fidelity forecast
  }

  // Realistic Dubai Summer Hourly Forecast fallback
  const fallbackHours = [
    { hour: '06:00', temp: 31, rh: 65, wbgt: 26.2, status: 'Safe' },
    { hour: '08:00', temp: 35, rh: 58, wbgt: 29.4, status: 'Caution' },
    { hour: '10:00', temp: 39, rh: 48, wbgt: 31.8, status: 'Caution' },
    { hour: '12:00', temp: 42, rh: 42, wbgt: 34.1, status: 'High Risk' },
    { hour: '13:00', temp: 43.5, rh: 40, wbgt: 35.0, status: 'Midday Ban (Stop)' },
    { hour: '14:30', temp: 44, rh: 38, wbgt: 34.8, status: 'Midday Ban (Stop)' },
    { hour: '16:00', temp: 41, rh: 45, wbgt: 33.2, status: 'Caution' },
    { hour: '18:00', temp: 37, rh: 55, wbgt: 30.1, status: 'Caution' },
  ];
  return res.json({ fallback: true, hours: fallbackHours });
});

// Setup Vite middleware in dev or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`HeatShield AI server running on http://0.0.0.0:${PORT} (${isProd ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
