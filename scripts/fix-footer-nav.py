#!/usr/bin/env python3
"""Fix footer navigation links across all HTML pages."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

PRODUCT_LINKS = [
    ("jewelry.html", "ジュエリー"),
    ("bag.html", "バッグ"),
    ("watch.html", "時計"),
    ("misc.html", "雑貨/その他"),
    ("accessory.html", "アクセサリー"),
]

SERVICE_LINKS = [
    ("sales/index.html", "ジュエリー販売"),
    ("repair/index.html", "ジュエリー修理"),
    ("buyback/index.html", "買取"),
    ("watch-repair/index.html", "時計修理"),
    ("reform/index.html", "ジュエリーリフォーム"),
]

STORE_LINKS = [
    "ジュエルグランスエムネ本店",
    "フレスポ三次プラザ店",
    "ゆめタウン吉田店",
    "ザ・ビッグ庄原店",
    "ゆめタウン黒瀬店",
    "イオン三原店",
    "アクト神辺店",
    "フジグラン尾道店",
]


def depth_of(html_path: Path) -> int:
    return len(html_path.relative_to(ROOT).parts) - 1


def prefix(depth: int) -> str:
    return "../" * depth if depth else ""


def product_hrefs(html_path: Path, p: str) -> list[tuple[str, str]]:
    if html_path.parent.name == "products" and html_path.parent.parent == ROOT:
        return list(PRODUCT_LINKS)
    return [(f"{p}products/{name}", label) for name, label in PRODUCT_LINKS]


def recruit_block(html_path: Path, p: str) -> str:
    rel = html_path.relative_to(ROOT)
    parts = rel.parts

    if parts[0] == "recruit" and len(parts) == 2:
        rp = "./"
        return f"""          <nav class="jgs-footer__nav-col jgs-footer__nav-recruit" aria-label="採用情報">
            <div class="jgs-footer__block"><a href="{rp}index.html">採用トップ</a></motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block"><a href="{rp}recruitment/index.html">採用情報</a></motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">募集要項</h2>
              <ul class="jgs-footer__sub">
                <li><a href="{rp}recruitment/index.html#parttime">アルバイト</a></li>
                <li><a href="{rp}recruitment/index.html#fulltime">正社員</a></li>
              </ul>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading"><a href="{rp}childcare/index.html">子育て両立応援支援</a></h2>
              <ul class="jgs-footer__sub">
                <li><a href="#worker-support">子育てワーカー応援できる理由</a></li>
                <li><a href="#appeal">グランスエムネの魅力</a></li>
                <li><a href="#flow">お仕事の流れ</a></li>
                <li><a href="#interview">従業員インタビュー</a></li>
              </ul>
            </motion>
          </nav>"""

    if parts[0] == "recruit" and len(parts) >= 3:
        rp = "../" * (len(parts) - 2)
        return f"""          <nav class="jgs-footer__nav-col jgs-footer__nav-recruit" aria-label="採用情報">
            <div class="jgs-footer__block">
              <a href="{rp}index.html">採用トップ</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <motion class="jgs-footer__block">
              <a href="{rp}recruitment/index.html">採用情報</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">募集要項</h2>
              <ul class="jgs-footer__sub">
                <li><a href="{rp}recruitment/index.html#parttime">アルバイト</a></li>
                <li><a href="{rp}recruitment/index.html#fulltime">正社員</a></li>
              </ul>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading"><a href="{rp}childcare/index.html">子育て両立応援支援</a></h2>
              <ul class="jgs-footer__sub">
                <li><a href="{rp}index.html#worker-support">子育てワーカー応援できる理由</a></li>
                <li><a href="{rp}index.html#appeal">グランスエムネの魅力</a></li>
                <li><a href="{rp}index.html#flow">お仕事の流れ</a></li>
                <li><a href="{rp}index.html#interview">従業員インタビュー</a></li>
              </ul>
            </motion>
          </nav>"""

    rp = f"{p}recruit/"
    return f"""          <nav class="jgs-footer__nav-col jgs-footer__nav-recruit" aria-label="採用情報">
            <div class="jgs-footer__block">
              <a href="{rp}index.html">採用トップ</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <a href="{rp}recruitment/index.html">採用情報</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">募集要項</h2>
              <ul class="jgs-footer__sub">
                <li><a href="{rp}part-time/index.html">アルバイト</a></li>
                <li><a href="{rp}full-time/index.html">正社員</a></li>
              </ul>
            </motion>
            <hr class="jgs-footer__rule" />
            <motion class="jgs-footer__block">
              <h2 class="jgs-footer__heading"><a href="{rp}childcare/index.html">子育て両立応援支援</a></h2>
              <ul class="jgs-footer__sub">
                <li><a href="{rp}index.html#worker-support">子育てワーカー応援できる理由</a></li>
                <li><a href="{rp}index.html#appeal">グランスエムネの魅力</a></li>
                <li><a href="{rp}index.html#flow">お仕事の流れ</a></li>
                <li><a href="{rp}index.html#interview">従業員インタビュー</a></li>
              </ul>
            </motion>
          </nav>"""


def footer_cta(html_path: Path, p: str) -> tuple[str, str]:
    rel = html_path.relative_to(ROOT)
    parts = rel.parts

    contact = f"{p}contact/index.html"

    if parts[0] == "recruit" and len(parts) >= 3:
        entry = "../" * (len(parts) - 2) + "entry/index.html"
    else:
        entry = f"{p}recruit/entry/index.html"

    return contact, entry


def build_primary_nav(html_path: Path, p: str) -> str:
    products = "\n".join(
        f'                <li><a href="{href}">{label}</a></li>'
        for href, label in product_hrefs(html_path, p)
    )
    services = "\n".join(
        f'                <li><a href="{p}services/{href}">{label}</a></li>'
        for href, label in SERVICE_LINKS
    )
    stores = "\n".join(
        f'                <li><a href="{p}shop-list/index.html">{name}</a></li>' for name in STORE_LINKS
    )

    privacy_href = (
        "index.html"
        if html_path.parent.name == "privacy" and html_path.parent.parent == ROOT
        else f"{p}privacy/index.html"
    )

    return f"""          <nav class="jgs-footer__nav-col jgs-footer__nav-primary" aria-label="サイトマップ（主要）">
            <div class="jgs-footer__block">
              <a href="{p}index.html">トップページ</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <a href="{p}company/index.html">会社概要</a>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">取扱商品</h2>
              <ul class="jgs-footer__sub">
{products}
              </ul>
            </motion>
            <hr class="jgs-footer__rule" />
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">サービス内容</h2>
              <ul class="jgs-footer__sub">
{services}
              </ul>
            </motion>
            <hr class="jgs-footer__rule jgs-footer__utility jgs-footer__utility--sp" />
            <div class="jgs-footer__block jgs-footer__utility jgs-footer__utility--sp">
              <a href="{p}news/index.html">お知らせ</a>
            </motion>
            <hr class="jgs-footer__rule jgs-footer__utility jgs-footer__utility--sp" />
            <div class="jgs-footer__block jgs-footer__utility jgs-footer__utility--sp">
              <a href="{privacy_href}">プライバシーポリシー</a>
            </motion>
          </nav>

          <nav class="jgs-footer__nav-col jgs-footer__nav-stores" aria-label="店舗・お知らせ">
            <div class="jgs-footer__block">
              <h2 class="jgs-footer__heading">店舗</h2>
              <ul class="jgs-footer__sub">
{stores}
              </ul>
            </motion>
            <hr class="jgs-footer__rule jgs-footer__utility jgs-footer__utility--pc" />
            <div class="jgs-footer__block jgs-footer__utility jgs-footer__utility--pc">
              <a href="{p}news/index.html">お知らせ</a>
            </motion>
            <hr class="jgs-footer__rule jgs-footer__utility jgs-footer__utility--pc" />
            <div class="jgs-footer__block jgs-footer__utility jgs-footer__utility--pc">
              <a href="{privacy_href}">プライバシーポリシー</a>
            </motion>
</nav>"""


def fix_file(html_path: Path) -> bool:
    original = html_path.read_text(encoding="utf-8")
    if '<footer class="jgs-footer">' not in original:
        return False

    text = original
    d = depth_of(html_path)
    p = prefix(d)

    text = re.sub(
        r'(<a class="jgs-footer__logo-link" href=")[^"]*(")',
        rf"\1{p}index.html\2",
        text,
        count=1,
    )

    text = re.sub(
        r'<nav class="jgs-footer__nav-col jgs-footer__nav-primary"[\s\S]*?</nav>\s*'
        r'<nav class="jgs-footer__nav-col jgs-footer__nav-stores"[\s\S]*?</nav>',
        build_primary_nav(html_path, p),
        text,
        count=1,
    )

    text = re.sub(
        r'<nav class="jgs-footer__nav-col jgs-footer__nav-recruit"[\s\S]*?</nav>',
        recruit_block(html_path, p),
        text,
        count=1,
    )

    contact, entry = footer_cta(html_path, p)
    text = re.sub(
        r'(<a class="jgs-footer__cta jgs-footer__cta--light" href=")[^"]*(">\s*\n\s*<img[^>]*footer-contact_btn)',
        rf"\1{contact}\2",
        text,
        count=1,
    )
    text = re.sub(
        r'(<a class="jgs-footer__cta jgs-footer__cta--dark" href=")[^"]*(">\s*\n\s*<img[^>]*footer_entry_btn)',
        rf"\1{entry}\2",
        text,
        count=1,
    )

    text = text.replace("</motion>", "</div>").replace("<motion ", "<div ")

    if text != original:
        html_path.write_text(text, encoding="utf-8")
        return True
    return False


def main() -> None:
    changed = []
    for html_path in sorted(ROOT.rglob("*.html")):
        if fix_file(html_path):
            changed.append(html_path.relative_to(ROOT))
    print(f"Updated {len(changed)} files:")
    for path in changed:
        print(f"  - {path}")


if __name__ == "__main__":
    main()
