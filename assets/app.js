import { lapLaSo, napDoSang, GIO } from './laso.js';
import { CHINH_TINH, DO_SANG, PHU_TINH_MENH, THAN_CU, TUONG_SINH } from './mo-ta.js';
import { CONFIG } from './config.js';

const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Vị trí 12 cung trên lưới 4×4 (Tỵ góc trên trái, đi thuận chiều kim đồng hồ).
const O = { 'Tỵ': [1, 1], 'Ngọ': [1, 2], 'Mùi': [1, 3], 'Thân': [1, 4], 'Dậu': [2, 4], 'Tuất': [3, 4],
  'Hợi': [4, 4], 'Tý': [4, 3], 'Sửu': [4, 2], 'Dần': [4, 1], 'Mão': [3, 1], 'Thìn': [2, 1] };
const SANG = new Set(['M', 'V', 'Đ']);

// ---- Form ---------------------------------------------------------------------------
function dungForm() {
  const sel = $('#gio');
  GIO.forEach((g) => sel.append(new Option(`Giờ ${g.chi} (${g.khoang})`, g.hour)));
  sel.value = '12';
  const nx = $('#nam-xem'), y = new Date().getFullYear();
  for (const n of [y - 1, y, y + 1, y + 2]) nx.append(new Option(n, n));
  nx.value = String(new Date().getMonth() >= 10 ? y + 1 : y);   // cuối năm xem năm sau
  $('#form-laso').addEventListener('submit', (e) => { e.preventDefault(); chay(); });
}

function docForm() {
  const [nam, thang, ngay] = $('#ngay-sinh').value.split('-').map(Number);
  return { ten: $('#ten').value.trim() || 'Đương số', gioi: $('#gioi').value, ngay, thang, nam,
    gio: +$('#gio').value, namXem: +$('#nam-xem').value };
}

// ---- Lá số --------------------------------------------------------------------------
const nhanSao = (s) => `<span class="sao ${s.loai}${SANG.has(s.ds) ? '' : s.ds === 'H' ? ' ham' : ''}" data-sao="${esc(s.ten)}">${esc(s.ten)}${s.ds ? `<sub>${s.ds}</sub>` : ''}</span>`;

function veLaSo(L, inp) {
  const grid = $('#laso'); grid.innerHTML = '';
  for (const c of L.cung) {
    const [r, col] = O[c.chi];
    const o = el('div', `cung${c.isMenh ? ' menh' : ''}${c.isThan ? ' than' : ''}`);
    o.style.gridArea = `${r} / ${col}`;
    o.dataset.cung = c.ten;
    o.innerHTML = `
      <div class="dau"><span class="canchi">${c.can} ${c.chi}</span><span class="dh">${c.daiHan}</span></div>
      <div class="ten-cung">${c.ten}${c.isThan ? ' <em>‹Thân›</em>' : ''}</div>
      <div class="chinh">${c.chinh.length ? c.chinh.map(nhanSao).join('') : '<i>Vô chính diệu</i>'}</div>
      <div class="phu"><div>${c.tot.map(nhanSao).join('')}</div><div>${c.xau.map(nhanSao).join('')}</div></div>
      <div class="chan"><span>${c.trangSinh}</span>${c.laDaiHan ? '<b class="nhan dh">ĐH</b>' : ''}${c.laTieuHan ? '<b class="nhan th">TH</b>' : ''}${c.tuan ? '<b class="nhan tt">Tuần</b>' : ''}${c.triet ? '<b class="nhan tt">Triệt</b>' : ''}</div>`;
    grid.append(o);
  }
  const u = L.info, h = L.han;
  const giua = el('div', 'thien-ban');
  giua.innerHTML = `
    <div class="logo-nho" aria-hidden="true"></div>
    <p class="chu-menh">Chủ mệnh</p>
    <h3>${esc(inp.ten)}</h3>
    <dl>
      <dt>Âm dương</dt><dd>${u.amDuongNamNu}</dd>
      <dt>Dương lịch</dt><dd>${u.solarStr}</dd>
      <dt>Âm lịch</dt><dd>${u.lunarStr.replace('Ngày ', '').replace(' (Thường)', '')}</dd>
      <dt>Can chi</dt><dd>${u.canChiStr}</dd>
      <dt>Mệnh</dt><dd>${u.napAm}</dd>
      <dt>Cục</dt><dd>${u.cuc.name}</dd>
      <dt>Chủ Mệnh · Thân</dt><dd>${u.menhChu} · ${u.thanChu}</dd>
      <dt>Năm xem</dt><dd>${u.viewYear} ${u.viewYearCanChi} · ${h.tuoi} tuổi</dd>
    </dl>`;
  grid.append(giua);
}

// ---- Luận sơ lược: Tổng quan · Thiên bàn · Bản thân -----------------------------------
const doSangChung = (c) => {
  const ds = c.chinh.map((s) => s.ds).filter(Boolean);
  if (!ds.length) return '';
  if (ds.every((d) => d === 'H')) return DO_SANG.xau;
  if (ds.every((d) => SANG.has(d))) return DO_SANG.tot;
  return '';
};
const tenSao = (ds) => ds.map((s) => `<b>${esc(s.ten)}${s.ds ? ` (${s.ds})` : ''}</b>`).join(', ');

function moTaCung(L, c, khoa) {
  const muon = !c.chinh.length;
  const nguon = muon ? L.xungChieu(c) : c;
  const y = nguon.chinh.map((s) => CHINH_TINH[s.ten]?.[khoa]).filter(Boolean);
  const dau = muon
    ? `Vô chính diệu, mượn ${tenSao(nguon.chinh)} từ cung ${nguon.ten} chiếu sang`
    : tenSao(c.chinh);
  let txt = `${dau}: ${y.join('; ')}.`;
  const sang = doSangChung(nguon);
  if (sang) txt += ` ${sang}`;
  if (muon) txt += ' Cung vô chính diệu chịu ảnh hưởng hoàn cảnh nhiều hơn, tốt xấu tùy cung xung chiếu.';
  if (c.triet) txt += ' Có Triệt: cả mặt tốt lẫn mặt xấu đều bị chặn bớt, rõ nhất trước khoảng 30 tuổi.';
  else if (c.tuan) txt += ' Có Tuần: cả mặt tốt lẫn mặt xấu đều giảm bớt, rõ hơn từ khoảng 30 tuổi.';
  return { cung: [c.ten, nguon.ten], sao: nguon.chinh.map((s) => s.ten), txt };
}

function luanGiai(L) {
  const M = L.theoTen['Mệnh'], than = L.cung.find((c) => c.isThan);
  const m = moTaCung(L, M, 'menh');
  const phu = [...M.tot, ...M.xau].filter((s) => PHU_TINH_MENH[s.ten]);
  const u = L.info, h = L.han;
  const amDuongThuan = (L.info.amDuongNamNu.startsWith('Dương')) === (M.chiIdx % 2 === 0);
  const tsKey = u.tuongSinhText.replace(/ \(.*\)$/, '').replace('Mệnh Cục Bình Hòa', 'Bình Hòa');
  const dh = h.daiHan;
  const bt = [['Quan Lộc', 'quan', 'Công việc'], ['Tài Bạch', 'tai', 'Tiền bạc'], ['Tật Ách', 'tat', 'Sức khỏe']];

  return [
    { so: 1, ten: 'Tổng quan', cung: ['Mệnh', than.ten, ...m.cung],
      sao: [...m.sao, ...phu.map((s) => s.ten)],
      noiDung: [
        ['Tính cách', m.txt],
        phu.length ? ['Sao đi cùng', phu.map((s) => `<b>${esc(s.ten)}</b>: ${PHU_TINH_MENH[s.ten]}`).join('; ') + '.'] : null,
        ['Mệnh – Thân', `${THAN_CU[than.ten] || ''} Mệnh chủ tiền vận, Thân chủ hậu vận (từ khoảng 30 tuổi).`],
      ].filter(Boolean) },
    { so: 2, ten: 'Thiên bàn', cung: [dh ? dh.palaceName : 'Mệnh'], sao: [u.menhChu, u.thanChu],
      noiDung: [
        ['Âm dương', `${u.amDuongNamNu}, Mệnh ở cung ${M.chiIdx % 2 === 0 ? 'dương' : 'âm'}: ${amDuongThuan ? 'âm dương thuận lý, mọi việc dễ xuôi hơn.' : 'âm dương nghịch lý, làm việc hay phải cố gắng hơn người.'}`],
        ['Bản mệnh – Cục', `Mệnh ${u.napAm}, ${u.cuc.name}. ${TUONG_SINH[tsKey] || ''}`],
        ['Chủ Mệnh – Chủ Thân', `Chủ Mệnh <b>${u.menhChu}</b>, Chủ Thân <b>${u.thanChu}</b>.`],
        dh ? ['Đại hạn hiện tại', `${u.viewYear} (${h.tuoi} tuổi) đang ở đại hạn ${dh.tuTuoi}–${dh.denTuoi} tại cung ${dh.palaceName}; ${u.isThuanLy ? 'đại hạn đi thuận' : 'đại hạn đi nghịch'}.`] : null,
      ].filter(Boolean) },
    { so: 3, ten: 'Bản thân', cung: bt.map(([t]) => t), sao: [],
      noiDung: bt.map(([t, k, nhan]) => {
        const r = moTaCung(L, L.theoTen[t], k);
        return [`${nhan} (${t})`, r.txt, r];
      }) },
  ].map((muc) => {
    if (muc.so === 3) muc.sao = muc.noiDung.flatMap(([, , r]) => r.sao);
    return muc;
  });
}

function veLuan(L) {
  const box = $('#luan'); box.innerHTML = '';
  const tabs = el('div', 'tabs'); tabs.setAttribute('role', 'tablist');
  const noi = el('div', 'tab-noi');
  const ds = luanGiai(L);
  const chon = (i) => {
    tabs.querySelectorAll('button').forEach((b, k) => b.setAttribute('aria-selected', String(k === i)));
    const muc = ds[i];
    noi.innerHTML = `<h3><span>${muc.so}</span>${muc.ten}</h3>` + muc.noiDung.map(([t, txt]) => `<section><h4>${t}</h4><p>${txt}</p></section>`).join('');
    sang(muc);
  };
  ds.forEach((m, i) => {
    const b = el('button', null, `<span>${m.so}</span>${m.ten}`);
    b.setAttribute('role', 'tab'); b.addEventListener('click', () => chon(i)); tabs.append(b);
  });
  box.append(tabs, noi);
  chon(0);
}

function sang(muc) {
  document.querySelectorAll('.cung').forEach((c) => {
    c.classList.toggle('noi', c.dataset.cung === muc.cung[0]);
    c.classList.toggle('lien', muc.cung.slice(1).includes(c.dataset.cung) && c.dataset.cung !== muc.cung[0]);
    c.classList.toggle('mo', !muc.cung.includes(c.dataset.cung));
  });
  document.querySelectorAll('.sao').forEach((s) => s.classList.toggle('bat', muc.sao.includes(s.dataset.sao)));
}

function chay() {
  const inp = docForm();
  if (!inp.nam) { $('#ngay-sinh').focus(); return; }
  const L = lapLaSo(inp);
  veLaSo(L, inp);
  veLuan(L);
  $('#ket-qua').hidden = false;
  $('#ket-qua').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ---- Đặt lịch -----------------------------------------------------------------------
function datLich() {
  const a = $('#nut-dat-lich');
  if (CONFIG.datLich) { a.href = CONFIG.datLich; }
  else { a.removeAttribute('href'); a.classList.add('tat'); a.textContent = 'Sắp mở đặt lịch'; }
  $('#gia').textContent = CONFIG.gia || 'Liên hệ';
  $('#ten-co').textContent = CONFIG.tenCoGiao;
}

await napDoSang();
dungForm();
datLich();
