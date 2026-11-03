#!/usr/bin/env python3
"""
Re-create the subset Galmuri web fonts in assets/fonts/.

Needs:  pip install fonttools brotli
Source: Galmuri 2.40.3 TTFs (npm package "galmuri", SIL OFL 1.1) — pass the folder that
        contains Galmuri11.ttf / Galmuri11-Bold.ttf / Galmuri14.ttf:
    python tools/subset_fonts.py path/to/galmuri/dist

Character set = ASCII/Latin-1/punctuation + all 2,350 KS X 1001 Hangul syllables + kana +
every character used in index.html, 404.html and i18n/strings.json (so new kanji are picked up
when you re-run this after editing text).
"""
import sys
from pathlib import Path
from fontTools import subset

ROOT = Path(__file__).resolve().parent.parent


def ksx1001_hangul():
    out = set()
    for hi in range(0xB0, 0xC9):
        for lo in range(0xA1, 0xFF):
            try:
                out.add(bytes([hi, lo]).decode("euc-kr"))
            except UnicodeDecodeError:
                pass
    return out


def charset():
    chars = set(chr(c) for c in range(0x20, 0x7F))
    chars |= set(chr(c) for c in range(0xA0, 0x100))
    chars |= set(chr(c) for c in range(0x2010, 0x2060))
    chars |= set(chr(c) for c in range(0x2190, 0x21A0))
    chars |= set(chr(c) for c in range(0x3000, 0x3040))
    chars |= set(chr(c) for c in range(0x3040, 0x3100))  # hiragana + katakana
    chars |= set(chr(c) for c in range(0x3131, 0x318F))  # Hangul compatibility jamo
    chars |= set(chr(c) for c in range(0xFF01, 0xFF5F))
    chars |= {"·", "−", "×", "©", "→", "↓", "▶", "…"}
    chars |= ksx1001_hangul()
    for name in ["index.html", "404.html", "i18n/strings.json"]:
        p = ROOT / name
        if p.exists():
            chars |= set(p.read_text(encoding="utf-8"))
    return "".join(sorted(c for c in chars if c.isprintable() or c == " "))


def main(src_dir):
    src = Path(src_dir)
    text = charset()
    jobs = {
        "Galmuri14.ttf": "Galmuri14.subset.woff2",
        "Galmuri11.ttf": "Galmuri11.subset.woff2",
        "Galmuri11-Bold.ttf": "Galmuri11-Bold.subset.woff2",
    }
    for ttf, woff2 in jobs.items():
        out = ROOT / "assets" / "fonts" / woff2
        opts = subset.Options()
        opts.flavor = "woff2"
        opts.layout_features = ["*"]
        opts.name_IDs = ["*"]
        opts.name_languages = ["*"]
        opts.notdef_outline = True
        opts.drop_tables += ["DSIG"]
        font = subset.load_font(str(src / ttf), opts)
        sub = subset.Subsetter(opts)
        sub.populate(text=text)
        sub.subset(font)
        subset.save_font(font, str(out), opts)
        print(out.relative_to(ROOT), out.stat().st_size, "bytes")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
        sys.exit(1)
    main(sys.argv[1])
