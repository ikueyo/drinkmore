import { useState, useMemo } from "react"
import drinksData from "./data/drinks.json"

const BRANDS = drinksData.brands
const DRINKS = drinksData.drinks
const CATEGORIES = ["全部", "純茶", "奶茶", "鮮奶", "特調", "水果茶", "冰淇淋"]
const SWEETNESS = ["正常糖", "少糖", "半糖", "微糖", "無糖"]
const ICE = ["正常冰", "少冰", "微冰", "去冰", "溫", "熱"]

const C = {
  bg: "#FAF7F2",
  card: "#FFFFFF",
  text: "#2C2417",
  sub: "#7A7062",
  muted: "#B5AEA3",
  border: "#E8E3DC",
  accent: "#D4784B",
  green: "#5B8C5A",
  red: "#C45B4A",
}

const BC = {
  "50嵐":    { bg: "#E8F0E4", fg: "#3D6B35", badge: "#4A7D42" },
  "清心福全": { bg: "#FDEAE6", fg: "#A63D2E", badge: "#C24B39" },
  "迷客夏":  { bg: "#E4EDE8", fg: "#2D6644", badge: "#3A7D55" },
}

function DrinkCard({ drink, onSelect }) {
  const bc = BC[drink.brand]
  return (
    <div
      onClick={() => onSelect(drink)}
      className="drink-card"
      style={{
        background: C.card, borderRadius: 14, padding: "18px 16px",
        cursor: "pointer", transition: "all 0.2s ease",
        border: `1.5px solid ${C.border}`, position: "relative",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          background: bc.badge, color: "#fff",
          fontSize: 11, fontWeight: 700, padding: "3px 10px",
          borderRadius: 6, letterSpacing: 0.5,
        }}>{drink.brand}</span>
        <span style={{ fontSize: 12, color: C.muted, fontWeight: 500 }}>{drink.category}</span>
        {drink.hot && (
          <span style={{
            marginLeft: "auto", background: "#FFF0E8", color: C.accent,
            fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
          }}>人氣</span>
        )}
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: C.text, marginBottom: 6, letterSpacing: 0.3, lineHeight: 1.3 }}>{drink.name}</div>
      {drink.desc && <div style={{ fontSize: 13, color: C.sub, marginBottom: 10, lineHeight: 1.6 }}>{drink.desc}</div>}
      {(drink.tags || []).length > 0 && (
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
          {(drink.tags || []).slice(0, 3).map(t => (
            <span key={t} style={{ fontSize: 11, background: bc.bg, color: bc.fg, padding: "3px 8px", borderRadius: 5, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      )}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderTop: `1px solid ${C.border}`, paddingTop: 12, marginTop: 4,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 12, color: C.muted }}>中</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: -0.5 }}>${drink.priceM}</span>
        </div>
        <div style={{ width: 1, height: 18, background: C.border }} />
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 12, color: C.muted }}>大</span>
          <span style={{ fontSize: 22, fontWeight: 900, color: C.text, letterSpacing: -0.5 }}>${drink.priceL}</span>
        </div>
      </div>
    </div>
  )
}

function DrinkModal({ drink, onClose }) {
  const bc = BC[drink.brand]
  const brand = BRANDS[drink.brand]
  const [sw, setSw] = useState("半糖")
  const [ic, setIc] = useState("少冰")
  const [sz, setSz] = useState("L")
  const pill = (active) => ({
    padding: "8px 16px", borderRadius: 10, cursor: "pointer", fontWeight: 600,
    fontSize: 14, transition: "all .2s", border: "none",
    background: active ? bc.badge : "#F5F2ED", color: active ? "#fff" : C.sub,
  })
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(44,36,23,0.45)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16, animation: "fadeIn .2s ease",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: C.bg, borderRadius: 20, padding: "28px 24px",
        maxWidth: 440, width: "100%", maxHeight: "88vh", overflowY: "auto",
        animation: "slideUp .3s ease", boxShadow: "0 20px 60px rgba(0,0,0,.2)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ background: bc.badge, color: "#fff", fontSize: 13, fontWeight: 700, padding: "5px 14px", borderRadius: 8 }}>{brand.logo} {drink.brand}</span>
          <button onClick={onClose} style={{
            background: "#F5F2ED", border: "none", width: 36, height: 36,
            borderRadius: 10, fontSize: 18, cursor: "pointer", color: C.sub,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 8px", color: C.text, lineHeight: 1.2 }}>{drink.name}</h2>
        {drink.desc && <p style={{ color: C.sub, fontSize: 15, margin: "0 0 16px", lineHeight: 1.7 }}>{drink.desc}</p>}
        {(drink.tags || []).length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {(drink.tags || []).map(t => (
              <span key={t} style={{ fontSize: 13, background: bc.bg, color: bc.fg, padding: "5px 12px", borderRadius: 8, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        )}
        <div style={{ background: C.card, borderRadius: 14, padding: 18, marginBottom: 20, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 12 }}>選擇杯型</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ l: "中杯 M", p: drink.priceM, k: "M" }, { l: "大杯 L", p: drink.priceL, k: "L" }].map(s => (
              <button key={s.k} onClick={() => setSz(s.k)} style={{
                flex: 1, padding: "14px 12px", borderRadius: 12, cursor: "pointer", fontWeight: 700,
                border: sz === s.k ? `2px solid ${bc.badge}` : `2px solid ${C.border}`,
                background: sz === s.k ? bc.bg : C.card, color: sz === s.k ? bc.fg : C.sub,
                fontSize: 14, transition: "all .2s", textAlign: "center",
              }}>
                <div>{s.l}</div>
                <div style={{ fontSize: 26, fontWeight: 900, marginTop: 4, color: sz === s.k ? C.text : C.sub }}>${s.p}</div>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>甜度</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SWEETNESS.map(s => <button key={s} onClick={() => setSw(s)} style={pill(sw === s)}>{s}</button>)}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 10 }}>冰量</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {ICE.map(i => <button key={i} onClick={() => setIc(i)} style={pill(ic === i)}>{i}</button>)}
          </div>
        </div>
        <div style={{ background: C.text, color: "#fff", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
          <div style={{ fontSize: 13, opacity: 0.7, marginBottom: 6 }}>您的選擇</div>
          <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.3 }}>{drink.name}（{sz === "M" ? "中杯" : "大杯"}）</div>
          <div style={{ fontSize: 14, marginTop: 6, opacity: 0.8 }}>{sw} ・ {ic}</div>
          <div style={{ fontSize: 32, fontWeight: 900, marginTop: 10 }}>${sz === "M" ? drink.priceM : drink.priceL}</div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [search, setSearch] = useState("")
  const [brandFilter, setBrandFilter] = useState("全部")
  const [categoryFilter, setCategoryFilter] = useState("全部")
  const [sortBy, setSortBy] = useState("default")
  const [selectedDrink, setSelectedDrink] = useState(null)
  const [tab, setTab] = useState("browse")

  const filtered = useMemo(() => {
    let r = DRINKS
    if (brandFilter !== "全部") r = r.filter(d => d.brand === brandFilter)
    if (categoryFilter !== "全部") r = r.filter(d => d.category === categoryFilter)
    if (search.trim()) {
      const q = search.trim().toLowerCase()
      r = r.filter(d =>
        d.name.toLowerCase().includes(q) || d.brand.toLowerCase().includes(q) ||
        (d.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (d.desc && d.desc.toLowerCase().includes(q))
      )
    }
    if (sortBy === "priceAsc") r = [...r].sort((a, b) => a.priceM - b.priceM)
    if (sortBy === "priceDesc") r = [...r].sort((a, b) => b.priceM - a.priceM)
    if (sortBy === "hot") r = [...r].sort((a, b) => (b.hot ? 1 : 0) - (a.hot ? 1 : 0))
    return r
  }, [search, brandFilter, categoryFilter, sortBy])

  const stats = useMemo(() => {
    const m = {}
    DRINKS.forEach(d => {
      if (!m[d.brand]) m[d.brand] = { count: 0, totalM: 0, minM: Infinity, maxM: 0 }
      m[d.brand].count++; m[d.brand].totalM += d.priceM
      m[d.brand].minM = Math.min(m[d.brand].minM, d.priceM)
      m[d.brand].maxM = Math.max(m[d.brand].maxM, d.priceM)
    })
    return m
  }, [])

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700;900&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; font-family:'Noto Sans TC',-apple-system,sans-serif; -webkit-font-smoothing:antialiased; }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        input:focus,select:focus,button:focus { outline:none; }
        .drink-card:hover { border-color:${C.accent} !important; transform:translateY(-3px); box-shadow:0 8px 20px rgba(44,36,23,.1); }
        ::-webkit-scrollbar { height:4px; width:4px; }
        ::-webkit-scrollbar-thumb { background:${C.muted}; border-radius:4px; }
        body { background:${C.bg}; }
      `}</style>

      <div style={{
        background: C.text, padding: "36px 20px 28px", textAlign: "center", position: "relative",
      }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 1px,transparent 12px)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.45)", fontWeight: 500, letterSpacing: 4, marginBottom: 8 }}>KAOHSIUNG DRINKS</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: "0 0 8px", letterSpacing: 2 }}>高雄飲料即時查</h1>
          <p style={{ color: "rgba(255,255,255,.5)", fontSize: 13, fontWeight: 500 }}>50嵐 ・ 清心福全 ・ 迷客夏 ｜ {DRINKS.length} 款飲品</p>
        </div>
      </div>

      <div style={{
        display: "flex", background: C.card, borderBottom: `1.5px solid ${C.border}`,
        position: "sticky", top: 0, zIndex: 100,
      }}>
        {[{ key: "browse", icon: "🔍", label: "飲品瀏覽" }, { key: "stats", icon: "📊", label: "品牌統計" }].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)} style={{
            flex: 1, padding: "14px 0 12px", border: "none", cursor: "pointer", background: "transparent",
            borderBottom: tab === t.key ? `3px solid ${C.accent}` : "3px solid transparent",
            fontSize: 14, fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? C.text : C.muted,
          }}>{t.icon} {t.label}</button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 80px", maxWidth: 720, margin: "0 auto" }}>
        {tab === "browse" && (
          <>
            <div style={{
              background: C.card, borderRadius: 12, padding: "6px 14px",
              marginBottom: 14, display: "flex", alignItems: "center", gap: 10,
              border: `1.5px solid ${C.border}`,
            }}>
              <span style={{ fontSize: 16, color: C.muted }}>🔍</span>
              <input type="text" placeholder="搜尋品名、標籤或描述…" value={search} onChange={e => setSearch(e.target.value)} style={{
                flex: 1, border: "none", fontSize: 15, padding: "10px 0", background: "transparent", color: C.text,
              }} />
              {search && <button onClick={() => setSearch("")} style={{
                background: C.border, border: "none", borderRadius: 8, width: 26, height: 26,
                cursor: "pointer", fontSize: 12, color: C.sub, display: "flex", alignItems: "center", justifyContent: "center",
              }}>✕</button>}
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {["全部", ...Object.keys(BRANDS)].map(b => {
                const active = brandFilter === b
                const bcc = b !== "全部" ? BC[b] : null
                return (
                  <button key={b} onClick={() => setBrandFilter(b)} style={{
                    padding: "8px 16px", borderRadius: 10, whiteSpace: "nowrap",
                    border: active ? "none" : `1.5px solid ${C.border}`,
                    cursor: "pointer", fontWeight: 600, fontSize: 13,
                    background: active ? (bcc ? bcc.badge : C.text) : C.card,
                    color: active ? "#fff" : C.sub,
                  }}>{b === "全部" ? "全部品牌" : `${BRANDS[b].logo} ${b}`}</button>
                )
              })}
            </div>

            <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto", paddingBottom: 4 }}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setCategoryFilter(c)} style={{
                  padding: "7px 14px", borderRadius: 8, whiteSpace: "nowrap",
                  border: categoryFilter === c ? "none" : `1.5px solid ${C.border}`,
                  cursor: "pointer", fontWeight: 600, fontSize: 13,
                  background: categoryFilter === c ? C.accent : C.card,
                  color: categoryFilter === c ? "#fff" : C.sub,
                }}>{c}</button>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 14, color: C.sub, fontWeight: 500 }}>{filtered.length} 款飲品</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
                padding: "7px 12px", borderRadius: 8, border: `1.5px solid ${C.border}`,
                fontSize: 13, color: C.sub, background: C.card, fontWeight: 500,
              }}>
                <option value="default">預設排序</option>
                <option value="priceAsc">價格 低→高</option>
                <option value="priceDesc">價格 高→低</option>
                <option value="hot">人氣優先</option>
              </select>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
              {filtered.map(d => <DrinkCard key={`${d.brand}-${d.name}`} drink={d} onSelect={setSelectedDrink} />)}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 20px", color: C.muted }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🫗</div>
                <div style={{ fontSize: 17, fontWeight: 600, color: C.sub }}>找不到符合的飲品</div>
                <div style={{ fontSize: 13, marginTop: 6 }}>試試其他關鍵字或篩選條件</div>
              </div>
            )}
          </>
        )}

        {tab === "stats" && (
          <div>
            <div style={{ background: C.card, borderRadius: 14, padding: 22, marginBottom: 14, border: `1px solid ${C.border}` }}>
              <h3 style={{ margin: "0 0 18px", fontSize: 18, fontWeight: 800, color: C.text }}>品牌數據總覽</h3>
              <div style={{ display: "grid", gap: 14 }}>
                {Object.entries(stats).map(([brand, s]) => {
                  const bcc = BC[brand]; const b = BRANDS[brand]
                  return (
                    <div key={brand} style={{ background: bcc.bg, borderRadius: 14, padding: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 22 }}>{b.logo}</span>
                          <span style={{ fontSize: 17, fontWeight: 800, color: bcc.fg }}>{brand}</span>
                        </div>
                        <span style={{ background: bcc.badge, color: "#fff", padding: "4px 12px", borderRadius: 8, fontSize: 13, fontWeight: 700 }}>{s.count} 款</span>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center" }}>
                        {[
                          { label: "中杯均價", val: `$${Math.round(s.totalM / s.count)}`, color: bcc.fg },
                          { label: "最低價", val: `$${s.minM}`, color: C.green },
                          { label: "最高價", val: `$${s.maxM}`, color: C.red },
                        ].map(item => (
                          <div key={item.label} style={{ background: "rgba(255,255,255,.7)", borderRadius: 10, padding: "10px 6px" }}>
                            <div style={{ fontSize: 11, color: C.sub, marginBottom: 4 }}>{item.label}</div>
                            <div style={{ fontSize: 22, fontWeight: 900, color: item.color }}>{item.val}</div>
                          </div>
                        ))}
                      </div>
                      {b.note && <div style={{ marginTop: 12, fontSize: 12, color: bcc.fg, opacity: 0.8, lineHeight: 1.5 }}>💡 {b.note}</div>}
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}` }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 800, color: C.text }}>使用說明</h3>
              <div style={{ fontSize: 14, color: C.sub, lineHeight: 2 }}>
                • 各店家自帶環保杯可享折扣優惠<br />
                • 價格僅供參考，以門市實際售價為準<br />
                • 資料更新日期：{drinksData.lastUpdated}<br />
                • 點擊飲品卡片可客製甜度與冰量
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedDrink && <DrinkModal drink={selectedDrink} onClose={() => setSelectedDrink(null)} />}
    </div>
  )
}
