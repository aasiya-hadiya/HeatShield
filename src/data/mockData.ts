import { CoolingStation, CrewInfo } from '../types';

/**
 * 6 Cooling Stations around Dubai (Clearly labelled DEMO DATA).
 * Lat/Lng coordinates mapped to active delivery and urban clusters in Dubai.
 */
export const DUBAI_COOLING_STATIONS: CoolingStation[] = [
  {
    id: 'cs-1',
    name: 'Downtown AC Courier Haven',
    district: 'Downtown Dubai / Sheikh Mohammed bin Rashid Blvd',
    lat: 25.1972,
    lng: 55.2744,
    amenities: ['Chilled drinking water', 'High-speed fans', 'Phone charging docks', 'First-aid kit'],
    availability: 'unknown (demo)',
  },
  {
    id: 'cs-2',
    name: 'Business Bay Rider Pitstop',
    district: 'Business Bay / Marasi Drive',
    lat: 25.1867,
    lng: 55.2650,
    amenities: ['Air-conditioned seating', 'Electrolyte dispensers', 'Helmet storage'],
    availability: 'unknown (demo)',
  },
  {
    id: 'cs-3',
    name: 'Al Barsha Delivery Rest Oasis',
    district: 'Al Barsha 1 / Near Mall of the Emirates',
    lat: 25.1124,
    lng: 55.2045,
    amenities: ['Cold water dispensers', 'Shaded motorcycle parking', 'Misting fans'],
    availability: 'unknown (demo)',
  },
  {
    id: 'cs-4',
    name: 'Deira Gold Souq Air-Cooled Station',
    district: 'Deira / Old Baladiya St',
    lat: 25.2697,
    lng: 55.2995,
    amenities: ['Full HVAC cooling', 'Rest benches', 'Ice towel dispenser'],
    availability: 'unknown (demo)',
  },
  {
    id: 'cs-5',
    name: 'Dubai Marina Mall Courier Bay',
    district: 'Dubai Marina / Marina Promenade',
    lat: 25.0772,
    lng: 55.1403,
    amenities: ['Shaded canopy', 'Water refill point', 'Emergency call button'],
    availability: 'unknown (demo)',
  },
  {
    id: 'cs-6',
    name: 'Al Quoz Industrial Rest Depot',
    district: 'Al Quoz Industrial 3 / Street 8',
    lat: 25.1325,
    lng: 55.2341,
    amenities: ['Heavy-duty misting coolers', 'Rehydration salts', 'Paramedic contact point'],
    availability: 'unknown (demo)',
  },
];

/**
 * 3 Demo Crews for the Supervisor View.
 * Crew-level aggregated view with zero individual names or private health data.
 */
export const DEMO_CREWS: CrewInfo[] = [
  {
    id: 'crew-a',
    name: 'Crew A (Steel Reinforcement)',
    size: 8,
    workload: 'Moderate',
    taskDescription: 'Rebar tying & prefabricated mesh positioning',
    zone: 'Tower West - Shaded Bay 3',
    exposureHours: 3.2,
    wearableHeartRateAvg: 94,
    acclimatized: true,
    heavyPPE: false,
  },
  {
    id: 'crew-b',
    name: 'Crew B (Structural Scaffolding)',
    size: 12,
    workload: 'Heavy',
    taskDescription: 'Modular staging elevation & exterior pipe rigging',
    zone: 'Facade North - Elevated Deck',
    exposureHours: 4.1,
    wearableHeartRateAvg: 118,
    acclimatized: true,
    heavyPPE: true,
  },
  {
    id: 'crew-c',
    name: 'Crew C (Concrete & Foundation)',
    size: 6,
    workload: 'Very heavy',
    taskDescription: 'Continuous concrete slab pouring & screeding',
    zone: 'Basement Ramp & Outer Apron',
    exposureHours: 4.8,
    wearableHeartRateAvg: 132,
    acclimatized: false,
    heavyPPE: true,
  },
];

/**
 * Scientific literature citations and evidence backing HeatShield AI.
 */
export const EVIDENCE_CITATIONS = [
  {
    id: 'ahmed2020',
    title: 'Assessment of thermal exposure level among construction workers in UAE using WBGT, HSI and TWL indices',
    authors: 'Ahmed HO, Newson-Smith MS, et al.',
    journal: 'Industrial Health 2020; 58(2): 170–181',
    link: 'https://pubmed.ncbi.nlm.nih.gov/31308288/',
    keyFinding:
      'Field evaluation in UAE construction sites revealed WBGT values consistently reaching high heat-stress thresholds, emphasizing that rigid uniform schedules fail without microclimate adjustments and mandatory shaded breaks.',
  },
  {
    id: 'bates2008',
    title: 'Hydration status and physiological workload of UAE construction workers',
    authors: 'Bates GP, Schneider J.',
    journal: 'Journal of Occupational Medicine and Toxicology 2008; 3:21',
    link: 'https://link.springer.com/content/pdf/10.1186/1745-6673-3-21.pdf',
    keyFinding:
      'Demonstrated that ambient WBGT alone can misstate physiological strain in Gulf conditions because workers self-pace and hydrate differently. Highlights the necessity of workload-aware, crew-adjusted risk thresholds rather than weather-only alerts.',
  },
  {
    id: 'dillane2020',
    title: 'Comparison between OSHA-NIOSH Heat Safety Tool app and WBGT monitor to assess heat stress risk',
    authors: 'Dillane D, Balanay JG.',
    journal: 'Journal of Occupational and Environmental Hygiene 2020; 17(4): 181–192',
    link: 'https://stacks.cdc.gov/view/cdc/230582',
    keyFinding:
      'Found that simple heat index apps underestimate real occupational strain as risk increases compared to localized WBGT monitoring with radiant solar heat considerations.',
  },
  {
    id: 'mohre2024',
    title: 'UAE Ministry of Human Resources and Emiratisation (MoHRE) Midday Break Policy',
    authors: 'UAE Government Decree (22nd consecutive year in 2026)',
    journal: 'MoHRE Ministerial Resolution on Occupational Heat Stress',
    link: 'https://en.aletihad.ae/news/uae/4671066',
    keyFinding:
      'Legally mandates the stoppage of all outdoor work performed under direct sunlight between 12:30 PM and 3:00 PM from June 15 to September 15. Provides over 6,000 to 10,000 delivery rest stations nationwide.',
  },
  {
    id: 'stull2011',
    title: 'Wet-bulb temperature from relative humidity and air temperature',
    authors: 'Stull R.',
    journal: 'Journal of Applied Meteorology and Climatology 2011; 50: 2267–2269',
    link: 'https://journals.ametsoc.org/view/journals/apme/50/11/jamc-d-11-0143.1.xml',
    keyFinding:
      'Validated empirical formulation to accurately compute thermodynamic wet-bulb temperature across wide humidity (5-99%) and temperature (-20°C to 50°C) ranges without psychrometric chart iterations.',
  },
];

/**
 * ESP32 Arduino C++ Code snippet as documented in Section 6 of the build guide.
 */
export const ESP32_ARDUINO_SKETCH = `// HeatShield AI - ESP32 Site Node Firmware
// Wiring:
// DHT22 Data -> GPIO 4 (3.3V and GND)
// DS18B20 Data -> GPIO 5 (4.7kΩ pull-up resistor to 3.3V)

#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <DHT.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define DHTPIN 4
#define DHTTYPE DHT22
#define ONEWIRE_PIN 5

const char* WIFI_SSID = "YOUR_WIFI_SSID";
const char* WIFI_PASS = "YOUR_WIFI_PASSWORD";
// Paste your Firebase Realtime Database node URL or any REST relay:
const char* DB_URL = "https://YOUR-PROJECT-default-rtdb.firebaseio.com/heatshield/node1.json";

DHT dht(DHTPIN, DHTTYPE);
OneWire ow(ONEWIRE_PIN);
DallasTemperature globe(&ow);

void setup() {
  Serial.begin(115200);
  dht.begin();
  globe.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) { 
    delay(500); 
    Serial.print("."); 
  }
  Serial.println("\\nWiFi connected successfully!");
}

void loop() {
  float t = dht.readTemperature();
  float h = dht.readHumidity();
  globe.requestTemperatures();
  float g = globe.getTempCByIndex(0);

  if (isnan(t) || isnan(h)) { 
    Serial.println("DHT sensor read failed!");
    delay(2000); 
    return; 
  }

  String gs = (g == DEVICE_DISCONNECTED_C) ? "null" : String(g, 1);
  String body = "{\\"t\\":" + String(t, 1) + 
                ",\\"rh\\":" + String(h, 0) +
                ",\\"globe\\":" + gs + 
                ",\\"ts\\":{\\".sv\\":\\"timestamp\\"}}";

  WiFiClientSecure client;
  client.setInsecure(); // Demo only; use pinned SSL cert in production
  HTTPClient http;
  http.begin(client, DB_URL);
  http.addHeader("Content-Type", "application/json");
  
  int code = http.PUT(body);
  Serial.printf("HTTP %d payload: %s\\n", code, body.c_str());
  http.end();
  
  delay(5000); // Sample every 5 seconds
}`;
