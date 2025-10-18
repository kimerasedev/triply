import { NextResponse } from "next/server";

interface EximItem {
  result: number; // 조회결과 (1: 성공, 2: DATA코드 오류, 3: 인증코드 오류, 4: 일일제한횟수 마감)
  cur_unit: string; // 통화코드
  deal_bas_r: string; // 매매기준율
  cur_nm: string; // 참고용 국가/통화명
}

interface ExchangeApiResp {
  dateUsed: string; // YYYYMMDD
  before11: boolean; // 영업일 11시 이전(또는 비영업일) 여부
  map: Record<string, number>; // code -> KRW 값 (JPY/IDR은 100단위 값 그대로 사용)
}

const EXIM_URL =
  "https://oapi.koreaexim.go.kr/site/program/financial/exchangeJSON";

// 날짜 포맷 함수
function yyyymmdd(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

// 서버가 어떤 타임존이든, "지금 KST" Date 를 만들어주는 헬퍼
function nowInKST(): Date {
  // locale string을 KST로 변환한 후 다시 Date로
  const s = new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" });
  return new Date(s);
}

function addDays(d: Date, diff: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + diff);
  return nd;
}

// 문자열 deal_bas_r를 숫자로 바꾸는 함수
function parseKRW(s: string): number {
  return Number(String(s).replace(/,/g, "")) || 0;
}

// 지정된 날짜(YYYYMMDD)로 한국수출입은행 API 호출
async function fetchEximByDate(
  dateStr: string,
  key: string
): Promise<EximItem[] | null> {
  const url = `${EXIM_URL}?authkey=${key}&data=AP01&searchdate=${dateStr}`;
  // Upstream 응답을 Next 캐시에 1시간 저장 (같은 날짜로 여러 번 치는 것 방지)
  const r = await fetch(url, { next: { revalidate: 3600 } });
  try {
    const json = await r.json();
    return Array.isArray(json) ? (json as EximItem[]) : null;
  } catch {
    return null;
  }
}

// GET /api/exchange
export async function GET() {
  const key = process.env.KOREAEXIM_API_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "Missing KOREAEXIM_API_KEY" },
      { status: 500 }
    );
  }

  const nowKST = nowInKST();
  const hourKST = nowKST.getHours();

  // 오늘부터 최대 7일 뒤로 가며 데이터가 있는 날 찾기
  const MAX_LOOKBACK = 7;
  let list: EximItem[] = [];
  let dateUsed = yyyymmdd(nowKST);

  for (let i = 0; i < MAX_LOOKBACK; i++) {
    const tryDate = yyyymmdd(addDays(nowKST, -i));
    const data = await fetchEximByDate(tryDate, key);
    if (data && data.length > 0) {
      list = data;
      dateUsed = tryDate;
      break;
    }
  }

  // 오늘 날짜가 아닌 날(=전일/이전일) 데이터를 썼거나,
  // 오늘이지만 11시 이전이라 아직 데이터가 비었을 가능성이 있으면 before11 = true
  const before11 = dateUsed !== yyyymmdd(nowKST) || hourKST < 11;

  // code -> KRW 맵 생성 (JPY/IDR은 "(100)"만 떼고 값은 그대로)
  const map: Record<string, number> = {};
  for (const item of list) {
    if (!item?.cur_unit) continue;
    const code = item.cur_unit.replace("(100)", ""); // "JPY(100)" → "JPY"
    const krw = parseKRW(item.deal_bas_r);
    if (code) map[code] = krw;
  }

  const resp: ExchangeApiResp = { dateUsed, before11, map };
  return NextResponse.json(resp);
}
