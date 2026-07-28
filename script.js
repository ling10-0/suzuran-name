const surnameMap = {
  "陳": ["穎川", "松谷", "山本", "峰山", "高島", "松田", "田川", "中里", "永川", "東野", "東川", "東間", "安東", "成田", "永田", "津田", "澤田", "竹田", "金田", "乃木田", "元田", "東田", "東山"],
  "林": ["神田", "高林", "小林", "長林", "林田", "大林", "竹林", "森川", "三木實", "二木"],
  "張": ["長田", "長本", "豐田", "清河", "弓長", "長谷川", "長村", "長岡"],
  "黃": ["廣內", "廣田", "橋本", "陸本", "橫山", "廣上", "岡田"],
  "李": ["中村", "岩里", "宮原", "松本", "樺島", "井下"],
  "吳": ["梅村", "安藤", "朝光", "梅里", "吳正", "矢口"],
  "劉": ["金子", "泉川", "中山", "金岡", "金本"],
  "蔡": ["吉本", "齋藤", "神田", "佐井", "豐田"],
  "何": ["河本", "和田", "河村", "河元", "川村"],
  "蔣": ["松井", "石岡", "石田"],
  "謝": ["天川", "大倉", "市村"],
  "鄭": ["平島", "平戶", "大木"],
  "呂": ["宮本", "宮下", "宮田"],
  "郭": ["大原", "賀來", "香久"],
  "江": ["江本", "江田", "江戶"],
  "高": ["高山", "高野", "高島"],
  "賴": ["瀨本", "廣瀨", "瀨上"],
  "蘇": ["安田", "和同", "安武"],
  "紀": ["飯村", "安村"],
  "孫": ["中山", "石黑"],
  "許": ["大山", "小西"],
  "彭": ["吉江", "古川"],
  "柯": ["松野", "青山"],
  "曾": ["八田", "增田"],
  "沈": ["青海"], "凌": ["鈴原"], "莊": ["本庄"], "朱": ["福田"], "盧": ["南鄉"],
  "簡": ["竹內", "竹間"], "徐": ["福山"], "范": ["高原"], "宋": ["梅本"], "汪": ["江元"],
  "柳": ["柳村"], "王": ["王野"]
};

const compoundSurnames = ["歐陽", "司馬", "上官", "諸葛"];
const fallbackSurnames = ["高橋", "山田", "中村", "小林", "藤本", "川上", "森田", "松本", "石川", "田中", "青木", "井上", "福田", "大野"];
const fallbackEndings = ["子", "美", "郎", "彥", "真", "和"];
const storageKey = "suzuran-name-registration";

const form = document.querySelector("#name-form");
const input = document.querySelector("#real-name");
const errorMessage = document.querySelector("#form-error");
const resultPanel = document.querySelector("#result-panel");
const originalName = document.querySelector("#original-name");
const convertedName = document.querySelector("#converted-name");
const welcomeTitle = document.querySelector("#welcome-title");
const methodNote = document.querySelector("#method-note");
const copyButton = document.querySelector("#copy-button");
const retryButton = document.querySelector("#retry-button");
const clearButton = document.querySelector("#clear-button");
const copyStatus = document.querySelector("#copy-status");

function stableHash(value) {
  let hash = 2166136261;
  for (const character of value) {
    hash ^= character.codePointAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function splitName(name) {
  const compound = compoundSurnames.find((surname) => name.startsWith(surname));
  const surname = compound || name.slice(0, 1);
  return { surname, givenName: name.slice(surname.length) };
}

function convertName(name) {
  const { surname, givenName } = splitName(name);
  const choices = surnameMap[surname];
  const hash = stableHash(name);

  if (choices) {
    return {
      converted: choices[hash % choices.length] + (givenName || "真"),
      matched: true,
      sourceSurname: surname
    };
  }

  const retained = givenName.slice(-1) || surname.slice(-1);
  const suffix = fallbackEndings[(hash >>> 3) % fallbackEndings.length];
  return {
    converted: fallbackSurnames[hash % fallbackSurnames.length] + retained + suffix,
    matched: false,
    sourceSurname: surname
  };
}

function showResult(record, shouldScroll = true) {
  originalName.textContent = record.original;
  convertedName.textContent = record.converted;
  welcomeTitle.textContent = `${record.converted}，歡迎來到臺中舊城區`;
  methodNote.textContent = record.matched
    ? `依「${record.sourceSurname}」姓改姓名對照，本所登記為「${record.converted}」。`
    : `對照資料未收錄「${record.sourceSurname}」姓，本次以通用內地式姓氏演算，並保留原名一字。`;
  resultPanel.hidden = false;
  copyStatus.textContent = "";
  if (shouldScroll) resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const normalized = input.value.replace(/\s+/g, "").trim();
  if (!/^[\u3400-\u9fff]{2,8}$/u.test(normalized)) {
    errorMessage.textContent = "查無此登記內容，請輸入 2 至 8 個中文字。";
    input.focus();
    return;
  }

  errorMessage.textContent = "";
  const result = convertName(normalized);
  const record = { original: normalized, ...result };
  localStorage.setItem(storageKey, JSON.stringify(record));
  showResult(record);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(convertedName.textContent);
    copyStatus.textContent = "登記名已複製。";
  } catch {
    copyStatus.textContent = "無法自動複製，請長按登記名後選擇複製。";
  }
});

retryButton.addEventListener("click", () => {
  document.querySelector("#registration-section").scrollIntoView({ behavior: "smooth" });
  input.focus();
});

clearButton.addEventListener("click", () => {
  localStorage.removeItem(storageKey);
  resultPanel.hidden = true;
  input.value = "";
  errorMessage.textContent = "本機登記紀錄已清除。";
  input.focus();
});

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved?.original && saved?.converted) {
    input.value = saved.original;
    showResult(saved, false);
  }
} catch {
  localStorage.removeItem(storageKey);
}
