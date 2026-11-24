# GitHub Actions CI/CD Demo

Basit bir React (Vite) uygulaması + GitHub Actions ile **Test → Build → Deploy** pipeline'ı.
Her `main` push'unda uygulama otomatik test edilir, derlenir ve GitHub Pages'e yayınlanır.

## Lokal çalıştırma
```bash
npm install
npm run dev     # geliştirme sunucusu
npm test        # testler
npm run build   # production build (dist/)
```

## Pipeline
Dosya: `.github/workflows/ci-cd.yml`

| Aşama | Ne yapar | Ne zaman |
|---|---|---|
| 🧪 Test | `npm ci` + `npm test` | Her push ve PR |
| 📦 Build | `npm run build`, çıktıyı artifact olarak saklar | Test geçerse |
| 🚀 Deploy | GitHub Pages'e yayınlar | Sadece `main`'e push |

## İlk kurulum
1. GitHub'da yeni bir repo aç ve projeyi push'la.
2. Repo → **Settings → Pages → Source: GitHub Actions** seç.
3. **Actions** sekmesinde pipeline'ı izle. Bitince site: `https://<kullanici>.github.io/<repo>/`

## Sunum demo senaryosu
1. **Başarılı akış:** `src/App.jsx` içinde başlığı değiştir (testteki metni de güncelle) → push → Actions'ta 3 job'un sırayla yeşil olmasını göster → sitede yeni başlık ve yeni commit hash'i görünür.
2. **Hatalı akış:** Sadece `App.jsx`'teki başlığı değiştir, testi güncelleme → push → Test job'u kırmızı olur, Build ve Deploy **hiç çalışmaz**. Canlı site bozulmaz.
3. **Pull Request:** Yeni branch'te değişiklik yap, PR aç → Test ve Build çalışır, Deploy atlanır; PR sayfasında check sonuçları görünür.
