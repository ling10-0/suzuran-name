// 本活動使用的日治時期改姓對照。每次登記會從同姓候選中重新抽取。
const surnameMap = {
  陳: '穎川 松谷 山本 峰山 高島 松田 田川 中里 永川 東野 東川 安東 成田 永田 津田 澤田 竹田 金田 元田 東田 東山 吉川 光田 島崎 大林 豐田 本田 高田 富川 中山 田中 遠山 德富 德山 梅岡 芳川 藤田 樋口 東原 池田 岡野 北島 瀨川 川島 清水 大川 太田 宮本 石井 伊東 北川 三谷 北原 日下 川本 和田 森山 高山 小泉 宮島 山下 永井 中田 村田 安田 中川 宮田 岡本 三好 寺內 廣田 松村 松下 西川 富田 吉本 武田 平山 香川 松岡 米田 龍田 新井 長田 福井 西田 吉田 木田 柳川 中島 藤山 松本 吉村 川村 中村 下村 神田 村上 堀田 石山 林田 內山 岡橋 南村 石川 田村 東城'.split(' '),
  林: '神田 高林 小林 長林 林田 大林 竹林 森川 二木 松田 西林 森 福田 大木 松林 森本 若林 中林 直木 木村 杉林 江木 大山 廣田 新村 武林 夏木 武內 三川 上林 森田 竹村 中野 高田 西谷 村井 西村 田林 大森 藤原 豐岡 田中 平林 竹田 池田 森岡 藤川 神林 松岡 宮林 森原 伊藤 中村 金成 鶴山 平野 豐田 德永 高峰 岡本 前川 野村 山中 本田 本村 牧野'.split(' '),
  張: '長田 長本 豐田 清河 弓長 長谷川 長村 長岡 石井 永田 安田 長脇 芳村 新村 宮城 福永 福島 山下 長野 多田 喜田 宮本 青山 木下 宮永 吉川 長口 廣田 梅村 有田 谷川 米田 松岡 富田 永山 千葉 中山 川添 清田 高山 竹下 牧野 長山 清川 河上 大山 清原 西村 大藏 竹田 三本 上原 吉本 山本 前田 川村 福井 日下 森山 古莊'.split(' '),
  黃: '廣內 廣田 橋本 陸本 橫山 廣上 岡田 平川 守田 橫田 秋山 小山 共田 松宮 友田 江口 竹村 江原 廣畑 清水 平井 廣瀨 若林 廣潮 吉富 廣江 深川 井上 伊藤 龍岡 竹中 三原 高山 吉田 江川 宮田 本田 北濱 中野 金子 長井 橫光 松島 松岡 吉岡 金田 廣谷 西村 吉松 木戶 平山 金成 峰田 益田 松村 永田 北原 山田 田中'.split(' '),
  李: '中村 岩里 宮原 松本 樺島 井下 利根 柏原 東 松山 大倉 宮木 松下 中田 木下 山田 玉里 安村 中里 神木 金里 木原 島井 三木 木村 芳賀 和田 村上 西山 北原 西原 松木 岡森 井上 岡本 清島 里見 大木 鶴山 大里 竹林 笹川 青木 福元 森山 山木 梅谷 大森 平沼 松村 西富 西村 中山 高山 宮川 清水 今村 井田 前村 三村 山口'.split(' '),
  吳: '梅村 安藤 朝光 梅里 吳正 矢口 清水 中山 姬本 宮野 森山 長峯 今井 田村 河山 西垣 安田 延岡 德盛 龍西 金光 永源 豐田 後藤 德富 竹林 松本 泰山 清木 淺川 川岡 篠原 朝生 大島 長岡 南鄉 福星 日高 大山 大岩 中川 中江 水原 梅島 宮永 萩原 山內 新井'.split(' '),
  劉: '金子 泉川 中山 金岡 金本 大山 大島 安川 武田 宮本 樺山 清村 宮田 富永 幸田 西川 龍岡 竹田 香田 大浦 金田 宮村 東條 吉田 石井 伊原 高嶺 竹岡 金光 德江 春野 金森 中村 松村 金澤 松島 清林 金村 大濱 豐岡 天野 高山 泉 松井 高田 岡野 山本 上原 中城 金山 吉岡 金川'.split(' '),
  蔡: '吉本 齋藤 神田 佐井 豐田 中田 山添 竹林 清水 高森 松野 永井 和田 芝山 松村 佐村 佐山 柳澤 小林 德山 平山 香山 齋田 中原 稻田 蒲田 三浦 白水 前川 小野 美谷 榎本 益田 佐藤'.split(' '),
  何: '河本 和田 河村 河元 川村 宮岡 石川 大河 滋賀 峯崎 三河 島岡 山河'.split(' '),
  蔣: '松井 石岡 石田'.split(' '), 謝: '天川 大倉 市村 安田 有田 石原 橘 安本 東山 金子 大和 金井 木下 田安 谷安 蓮田 安村 金澤 福富 高藤 福村'.split(' '),
  鄭: '平島 平戶 大木 久松 田川 大分'.split(' '), 呂: '宮本 宮下 宮田 宮川 星野 宮內 宮崎 宮村'.split(' '),
  郭: '大原 賀來 香久 大倉 河谷 福原 鶴田 水島 秋山 北川 豐田 神島 土井 梅山 岡田'.split(' '),
  江: '江本 江田 江戶 江元 江上 江南 大川 川原 江原 江坂 江川 江島 入江 江峯 生江'.split(' '),
  高: '高山 高野 高島 高森 高田 高峯 高石 高光 高瀨 高本 高井 高嶋 高川'.split(' '),
  賴: '瀨本 廣瀨 瀨上 福原 江崎 安田 青瀨 瀨川 和田 新田 金山 山川 西川 德滿 福山 若村 中島 天野 清瀨 河瀨 瀨戶 永田 竹村 吉田'.split(' '),
  蘇: '安田 和同 安武 生田 平田 富山 岩松 武田 吉村 武岡 武山 大和 松永 金山 原野 山田 十川 香村 石川'.split(' '),
  紀: '飯村 安村'.split(' '), 孫: '中山 石黑 藤林'.split(' '),
  許: '大山 小西 清田 永本 吉永 箕山 中村 中川 高島 石原 吉田 大澤 高原 福島 野村 福澤 福村 長本 清瀨 豐田 菊島 中野 竹內 高橋 高山 清水 富永 清永'.split(' '),
  彭: '吉江 古川 富田'.split(' '), 柯: '松野 青山 泉 秋元 森江 大洲 楠井'.split(' '),
  曾: '八田 增田 曾根 曾山 高田 久木原 曾我 富田 江原 白吉 增山'.split(' '),
  沈: '青海 清原 梅村 水杉 清海'.split(' '), 凌: ['鈴原'], 莊: '本庄 古莊 竹山 成田 福原 岡村 竹澤'.split(' '),
  朱: '福田 前田 牧野 勝元 竹田 國本'.split(' '), 盧: '南鄉 盧田 永田 牧野 山崎 藤山 高田'.split(' '),
  簡: '竹內 竹間 神田 竹本 平野 綠野 大和 福間 高田 竹田 藤村 宮本 竹永'.split(' '),
  徐: '福山 新山 安田 中山 橋本 富山 高野 廣田 大倉 若本'.split(' '),
  范: '高原 平島 高山 宮川 花井'.split(' '), 宋: '梅本 坂垣 山本 宗岡 石木'.split(' '), 柳: ['柳村'],
  王: '王野 大林 兒玉 大川 大山 松原 太田 和田 玉川 大島 馬場 松嶺 原 松崗 田和 平山 武原 田村 玉井 大原 大成 梅澤 岩岡 大岩 梅谷 島村 榎本 鹽田 玉野 伊藤 原田 明本 新岡 光川 永澤 天野 北川'.split(' '),
  楊: '柳川 和泉 柳生 內藤 橫田 北島 新木 富永 田中 新開 下坂 清水 豐田 笹原 柳原 吉本 湯川 雪谷 八尾 立花 三木 德山 小柳'.split(' '),
  葉: '葉山 長田 稻葉 葉室 澤園 笹木 岡野 大葉 千葉 松田 廣川 藤澤 秋原 森川 三井'.split(' '),
  洪: '三井 日比 江本 春島 清水 大川 鴻村 渡江 中山 高峰 福永 山內 西川 宗村 森山 宮原 山本 濱崎'.split(' '),
  邱: '岡本 岡田 岡村 松岡 朝富 井上 長岡 月山 藤山 岡'.split(' '), 蕭: '芳山 朝川 南川 武井 松井 平岡 吉原 北原'.split(' '),
  羅: '德山 吉見 福元 竹田 廣田 岩峯'.split(' '), 錢: ['金井'], 胡: '古月 淡村 兒玉 谷月 生田'.split(' '),
  戴: '田井 松岡 國元 櫻井 富岡 增田'.split(' '), 藍: '藍澤 岸松 堀部'.split(' '), 傅: '傅元 星野 德山 南'.split(' '), 尹: ['伊田'],
  鍾: '中川 重田 金重 香川 金元 高安 芳川 中村 武川 中原 金田'.split(' '),
  潘: '神田 三田 吉田 田川 米田 葉室 日下 岸岡 本庄 米澤 赤田 寺本'.split(' '), 龔: '龍井 佳山'.split(' '),
  顏: '須賀 木村 成田 彥山 大濱 岩永 岩林 小池 大坪'.split(' '), 施: '山田 吉田 德山 施本 布施 山里'.split(' '),
  廖: '新城 南 光安 田南 羽山 廣山 宮永 武井 福永 永山 安川 武倉 中村 田島 安永 豐田 安部 三好 稻垣 武村 福田 大島 河原'.split(' '),
  周: '三橋 和田 大山 吉川 平山 武光 福島 岩永 吉田 吉本 武岡 林田 吉岡 木村 岩岡 月野 田口'.split(' '),
  游: '安村 廣友 松本 游佐 吉本 大川 豐島 吉田 水池'.split(' '), 方: '松芳 緒方 竹中 田方 元方 松方 豐田'.split(' '),
  余: '德山 大田 岡本 水野'.split(' '), 曹: '西本 石川 太田'.split(' '), 趙: '吉林 東岡 武田 豐田 吉村 真崎'.split(' '),
  杜: '森山 美津 森 國本 西本 工藤'.split(' '), 詹: '景山 永田 大江 青山 佐賀'.split(' '), 連: '蓮沼 大石'.split(' '),
  韓: ['千島'], 梁: '梁島 梅本 石山 袖木 尾山'.split(' '), 翁: '竹內 桂 羽野 山本 大林'.split(' '),
  卓: '美代 日木'.split(' '), 石: '石橋 石村 石下 岩下'.split(' '), 唐: '唐澤 唐田'.split(' '), 辜: '高峰 古林'.split(' '),
  孔: ['穗積'], 湯: '湯本 伊佐'.split(' '), 姚: '高松 東山 神田'.split(' '), 康: '廣田 廣永'.split(' '),
  魏: '松田 岡山'.split(' '), 阮: ['江本'], 馬: ['井川'], 馮: ['吉本'], 董: '吉田 朝岡'.split(' '), 崔: ['佳山'],
  饒: '宮崎 赤城 平田'.split(' '), 絲: ['伊藤'], 解: '山田 角双'.split(' '), 乃: ['中村'],
  侯: '橋本 鹿島 川村 德富 宮本'.split(' '), 申: ['神代'], 褚: '今村 原'.split(' '), 文: '文永 綾部'.split(' '),
  歐: '竹元 大倉 武田'.split(' '), 典: ['大山'], 棟: ['大東'], 建: ['金本'], 詠: ['光永'],
  巫: '入江 新島 豐林 平山'.split(' '), 薛: '瀨山 若竹'.split(' '), 溫: '栗山 湯本 高山 大和 豐美 日高'.split(' '),
  鮑: ['星野'], 古: ['古木'], 吾: ['堀江'], 田: ['田村'], 啟: ['若林'], 商: ['上林'], 池: ['池田'],
  尤: '高松 神田'.split(' '), 雷: '和泉 上田 田村'.split(' '), 白: '白山 白吉 白井 白川'.split(' '),
  麥: '廣田 麥原 勝山'.split(' '), 倪: ['兒玉'], 武: ['武田'], 點: ['廣田'], 鍊: ['竹內']
};

const compoundSurnames = ['歐陽', '司馬', '上官', '諸葛'];
const fallbackSurnames = '青木 朝日 川原 東雲 花村 星野 若松 澄川 櫻井 森下 月見 水原 春日 高橋 宮澤'.split(' ');
const fallbackGivenNames = '春子 美子 千代子 文子 花子 和子 靜子 信子 明子 俊雄 恒一 正雄 清一 修平 春夫 直人 和也'.split(' ');
const addedNameCharacters = '子 雄 郎 美 夫 也 人'.split(' ');
const storageKey = 'suzuran-name-registration';

const form = document.querySelector('#name-form');
const input = document.querySelector('#real-name');
const errorMessage = document.querySelector('#form-error');
const resultPanel = document.querySelector('#result-panel');
const originalName = document.querySelector('#original-name');
const convertedName = document.querySelector('#converted-name');
const welcomeTitle = document.querySelector('#welcome-title');
const methodNote = document.querySelector('#method-note');
const copyButton = document.querySelector('#copy-button');
const retryButton = document.querySelector('#retry-button');
const clearButton = document.querySelector('#clear-button');
const copyStatus = document.querySelector('#copy-status');

const pick = (choices) => choices[Math.floor(Math.random() * choices.length)];

function splitName(name) {
  const compound = compoundSurnames.find((surname) => name.startsWith(surname));
  const surname = compound || name.slice(0, 1);
  return { surname, givenName: name.slice(surname.length) };
}

function convertName(name) {
  const { surname, givenName } = splitName(name);
  const choice = surnameMap[surname] && pick(surnameMap[surname]);
  if (choice) return { converted: choice + (givenName || '子'), matched: true, sourceSurname: surname };

  const retained = Array.from(givenName || surname).find((character) => /[\u3400-\u9fff]/u.test(character));
  const fallbackName = retained
    ? pick([retained, retained + pick(addedNameCharacters), pick(fallbackGivenNames)])
    : pick(fallbackGivenNames);
  return { converted: pick(fallbackSurnames) + fallbackName, matched: false, sourceSurname: surname };
}

function showResult(record, shouldScroll = true) {
  originalName.textContent = record.original;
  convertedName.textContent = record.converted;
  welcomeTitle.textContent = `${record.converted}，歡迎來到臺中舊城區`;
  methodNote.textContent = record.matched
    ? `依「${record.sourceSurname}」姓改姓對照，本所本次登記為「${record.converted}」。再次送交可重新抽取其他候選姓氏。`
    : `本所未收錄「${record.sourceSurname}」姓，暫以通用內地式姓名登記；原名一字可能保留、添字，或另行抽取登記名。`;
  resultPanel.hidden = false;
  copyStatus.textContent = '';
  if (shouldScroll) resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const normalized = input.value.replace(/\s+/g, '').trim();
  if (!/^[\u3400-\u9fff]{2,8}$/u.test(normalized)) {
    errorMessage.textContent = '請輸入 2 至 8 個中文字。';
    input.focus();
    return;
  }
  errorMessage.textContent = '';
  const record = { original: normalized, ...convertName(normalized) };
  localStorage.setItem(storageKey, JSON.stringify(record));
  showResult(record);
});

copyButton.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(convertedName.textContent); copyStatus.textContent = '登記名已複製。'; }
  catch { copyStatus.textContent = '無法自動複製，請直接選取登記名。'; }
});
retryButton.addEventListener('click', () => { document.querySelector('#registration-section').scrollIntoView({ behavior: 'smooth' }); input.focus(); });
clearButton.addEventListener('click', () => { localStorage.removeItem(storageKey); resultPanel.hidden = true; input.value = ''; errorMessage.textContent = '本機登記紀錄已清除。'; input.focus(); });

try {
  const saved = JSON.parse(localStorage.getItem(storageKey));
  if (saved?.original && saved?.converted) { input.value = saved.original; showResult(saved, false); }
} catch { localStorage.removeItem(storageKey); }
