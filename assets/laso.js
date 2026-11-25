// Lập lá số trên trình duyệt: gọi lib/ansao.js (chép từ repo tuvi) rồi chuẩn hoá giống
// tools/lap-la-so.mjs bên tuvi: tên sao theo tuvivietnam, độ sáng theo data/do-sang.json,
// tách Tứ hóa thành sao riêng, Quan Phủ (vòng Bác Sĩ) khác Quan Phù (vòng Thái Tuế), can cung.
import { generateTuViChart } from '../lib/ansao.js';
import { CAN, CHI, getCanChiYear } from '../lib/lich.js';

const TEN = { 'Tả Phụ': 'Tả Phù', 'Bác Sĩ': 'Bác Sỹ', 'Lưu Niên Văn Tinh': 'LN Văn Tinh' };
const HOA = { ' [H.Lộc]': 'Hóa Lộc', ' [H.Quyền]': 'Hóa Quyền', ' [H.Khoa]': 'Hóa Khoa', ' [H.Kỵ]': 'Hóa Kỵ' };
export const GIO = CHI.map((c, i) => ({ chi: c, hour: (i * 2) % 24, khoang: `${String((i * 2 + 23) % 24).padStart(2, '0')}h–${String(i * 2 + 1).padStart(2, '0')}h` }));

let DS = null;
export async function napDoSang(url = new URL('../data/do-sang.json', import.meta.url)) {
  DS = await (await fetch(url)).json();
}
const doSang = (n, chi) => (DS && (DS.chinh[n] || DS.phu[n] || DS.da_thay[n] || {})[chi]) || '';

export function lapLaSo({ ten, gioi, ngay, thang, nam, gio, namXem }) {
  const c = generateTuViChart({ name: ten, gender: gioi === 'nu' ? 2 : 1, isSolar: true,
    day: ngay, month: thang, year: nam, hour: gio, minute: 0, viewYear: namXem, isLeapMonth: false });
  const u = c.userInfo, G = c.grid, H = c.han;
  const namAm = +u.lunarStr.match(/\/(\d+) \(/)[1];
  const at = (i) => G.find((g) => g.chiIdx === ((i % 12) + 12) % 12);
  const locTon = G.find((g) => g.phuTinhTot.some((s) => s.name === 'Lộc Tồn'));
  const quanPhuChi = at(locTon.chiIdx + (u.isThuanLy ? -1 : 1)).chiName;
  const canDan = [2, 4, 6, 8, 0][getCanChiYear(namAm).canIdx % 5];
  const sao = (n, chi, loai) => ({ ten: TEN[n] || n, ds: doSang(TEN[n] || n, chi), loai });

  const cung = G.map((g) => {
    const chinh = g.chinhTinh.map((s) => sao(s.name, g.chiName, 'chinh'));
    const tot = [], xau = [];
    const hoa = (s) => s.tuHoa && (s.tuHoa.includes('Kỵ') ? xau : tot).push(sao(HOA[s.tuHoa], g.chiName, 'hoa'));
    g.chinhTinh.forEach(hoa);
    for (const s of g.phuTinhTot) { if (!s.name.startsWith('L.')) tot.push(sao(s.name, g.chiName, 'tot')); hoa(s); }
    let coQuanPhu = false;
    for (const s of g.phuTinhXau) {
      if (s.name === 'Tuần' || s.name === 'Triệt' || s.name.startsWith('L.')) continue;
      let n = s.name;
      if (n === 'Quan Phù' && g.chiName === quanPhuChi && !coQuanPhu) { n = 'Quan Phủ'; coQuanPhu = true; }
      xau.push(sao(n, g.chiName, 'xau')); hoa(s);
    }
    const co = (n) => g.phuTinhXau.some((s) => s.name === n);
    return {
      chi: g.chiName, chiIdx: g.chiIdx, can: CAN[(canDan + ((g.chiIdx - 2 + 12) % 12)) % 10],
      ten: g.palaceName, isMenh: g.isMenh, isThan: g.isThan, chinh, tot, xau,
      trangSinh: g.trangSinh === 'Trường Sinh' ? 'Tràng Sinh' : g.trangSinh, daiHan: g.daiHan,
      tuan: co('Tuần'), triet: co('Triệt'),
      laDaiHan: H.daiHan && H.daiHan.gridIdx === g.gridIdx, laTieuHan: H.tieuHan && H.tieuHan.gridIdx === g.gridIdx,
    };
  });
  return { info: { ...u, namAm }, cung, han: H, theoTen: Object.fromEntries(cung.map((x) => [x.ten, x])),
    theoChi: Object.fromEntries(cung.map((x) => [x.chi, x])),
    xungChieu: (x) => cung.find((k) => k.chiIdx === (x.chiIdx + 6) % 12),
    tamHop: (x) => [4, 8].map((d) => cung.find((k) => k.chiIdx === (x.chiIdx + d) % 12)) };
}
