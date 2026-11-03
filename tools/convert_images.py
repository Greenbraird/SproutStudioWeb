#!/usr/bin/env python3
"""
Image pipeline used for the 1-bit redesign (run on any machine with Pillow; originals are never modified).

    pip install pillow
    python tools/convert_images.py

- <name>.png  -> <name>.webp  (lossless for 2-colour / few-colour pixel art, quality 86 for screenshots)
- hero-battlefield.png -> hero-soft.webp (no dither: low-contrast INK->30% PAPER tone ramp, calm decorative photo)
- sprout-logo.png -> sprout-logo-78.png (full logo), sprout-mark-78.png (sprout only) in the ORIGINAL colours,
  native 1x pixel grid (the source is an exact 10x grid, so the NEAREST downscale is lossless);
  sprout-mark-39.png (half-size header mark, box-filtered), favicon.ico, favicon-64.png, apple-touch-icon.png
- wid-logo-clean.png (clean game logo, 556x287, copied as-is) -> .webp, wid-logo-clean-278.png/.webp
  (2:1 majority-vote INK reduction for phones <640px; interim until a native small logo exists)
- wishlist-steam.png (688x48 pixel text, copied as-is) -> .webp, wishlist-steam-2line.png/.webp (same pixels, two rows)
- spr-sniper-sheet.png (copy of the game's SinperAnimations.png, 832x64, 13 frames) -> spr-sniper-64.png/.webp
  (frame 0, 64x64, native pixels + transparency; shown at exact 2x with image-rendering: pixelated)
- trailer-src.jpg (YouTube hqdefault of KcvhLI1SKCk) -> trailer-thumb.png/.webp (16:9 crop, INK/PAPER threshold)
The original PNGs stay in assets/ (press-kit downloads link to them).
"""
from pathlib import Path
from PIL import Image, ImageOps

A = Path(__file__).resolve().parent.parent / "assets"
INK, PAPER = (34, 35, 35), (240, 246, 240)
WEBP = ["wid-logo", "screen-battle", "screen-radio", "screen-clock", "screen-title", "screen-stage",
        "story-room", "char-remarque", "char-anderson", "char-nick", "ico-intercept", "ico-analyze",
        "ico-command", "ico-tune", "spr-scout", "spr-infantry", "spr-sniper"]  # spr-sniper.webp kept for old links


def duo(bitmap):
    out = Image.new("RGB", bitmap.size, INK)
    out.paste(Image.new("RGB", bitmap.size, PAPER), mask=bitmap.convert("L"))
    return out


def tone(gray, hi):
    """Map 0..255 grey onto INK .. INK+hi*(PAPER-INK) (flat colour ramp, no dithering)."""
    luts = [[round(INK[c] + (PAPER[c] - INK[c]) * hi * v / 255) for v in range(256)] for c in range(3)]
    return Image.merge("RGB", [gray.point(luts[c]) for c in range(3)])


def half_ink(im):
    """2:1 reduction of a 2-colour logo: a cell is INK when >=2 of its 4 pixels are INK; PAPER outline re-grown."""
    ink, paper = INK + (255,), PAPER + (255,)
    W, H = im.size
    w, h = W // 2, (H + 1) // 2
    p = im.load()
    m = [[sum(1 for dx in (0, 1) for dy in (0, 1)
              if 2 * x + dx < W and 2 * y + dy < H and p[2 * x + dx, 2 * y + dy] == ink) >= 2
          for x in range(w)] for y in range(h)]
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    o = out.load()
    for y in range(h):
        for x in range(w):
            if m[y][x]:
                o[x, y] = ink
            elif any(0 <= x + dx < w and 0 <= y + dy < h and m[y + dy][x + dx]
                     for dx in (-1, 0, 1) for dy in (-1, 0, 1)):
                o[x, y] = paper
    return out


def og_image(hero):
    """Refresh assets/og-image.png in place: the title text block (x<780, y<416) is kept, the logo box and the
    bottom photo band are fully redrawn, so re-running gives the same result."""
    og = Image.open(A / "og-image.png").convert("RGB")
    W, H = og.size
    og.paste(INK, (780, 0, W, 416))
    og.paste(PAPER, (800, 54, 1156, 334))  # PAPER plate behind the INK clean logo
    logo = Image.open(A / "wid-logo-clean-278.png").convert("RGBA")
    og.paste(logo, (800 + (356 - logo.width) // 2, 54 + (280 - logo.height) // 2), logo)
    band = hero.resize((W, round(W * hero.height / hero.width)), Image.LANCZOS)
    top = round((band.height - (H - 420)) * 0.6)
    og.paste(band.crop((0, top, W, top + H - 420)), (0, 420))
    og.save(A / "og-image.png", optimize=True)


def trailer_thumb(src):
    im = Image.open(src).convert("L")
    w, h = im.size
    ch = w * 9 // 16
    top = (h - ch) // 2
    im = im.crop((0, top, w, top + ch))  # hqdefault is 4:3 letterboxed
    return duo(im.point(lambda v: 255 if v > 127 else 0).convert("1"))


def main():
    for name in WEBP:
        im = Image.open(A / f"{name}.png")
        colors = im.convert("RGBA").getcolors(4096)
        if colors is not None and len(colors) <= 64:
            im.save(A / f"{name}.webp", "WEBP", lossless=True, method=6)
        else:
            (im.convert("RGBA") if im.mode in ("RGBA", "LA", "P") else im.convert("RGB")).save(
                A / f"{name}.webp", "WEBP", quality=86, method=6)

    h = ImageOps.autocontrast(Image.open(A / "hero-battlefield.png").convert("L"), cutoff=1)
    hero = tone(h, 0.30)  # darkest INK .. 30% toward PAPER: no high-frequency dots, no flicker
    hero.save(A / "hero-soft.webp", quality=82, method=6)

    s = Image.open(A / "sprout-logo.png").convert("RGBA")
    s = s.crop(s.getbbox())
    logo = s.resize((s.width // 10, s.height // 10), Image.NEAREST)  # source art is an exact 10x grid
    logo.save(A / "sprout-logo-78.png", optimize=True)
    mark = s.crop((0, 0, s.width, 660))
    mark = mark.crop(mark.getbbox())
    mark = mark.resize((mark.width // 10, mark.height // 10), Image.NEAREST)  # 78x66
    mark.save(A / "sprout-mark-78.png", optimize=True)
    mark.resize((mark.width // 2, mark.height // 2), Image.BOX).save(A / "sprout-mark-39.png", optimize=True)
    fav = Image.new("RGBA", (64, 64), (0, 0, 0, 0))
    m64 = mark.resize((64, 54), Image.LANCZOS)
    fav.alpha_composite(m64, (0, 5))
    fav.save(A / "favicon-64.png", optimize=True)
    fav.save(A.parent / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
    touch = Image.new("RGBA", (180, 180), PAPER + (255,))  # iOS would fill transparency with black
    touch.alpha_composite(mark.resize((156, 132), Image.NEAREST), (12, 24))  # exact 2x
    touch.convert("RGB").save(A / "apple-touch-icon.png", optimize=True)

    w = Image.open(A / "wid-logo-clean.png").convert("RGBA")
    w.save(A / "wid-logo-clean.webp", lossless=True, exact=True, method=6)
    half = half_ink(w)
    half.save(A / "wid-logo-clean-278.png", optimize=True)
    half.save(A / "wid-logo-clean-278.webp", lossless=True, exact=True, method=6)

    wl = Image.open(A / "wishlist-steam.png").convert("RGBA")
    wl.save(A / "wishlist-steam.webp", lossless=True, exact=True, method=6)
    top, bot = wl.crop((4, 0, 319, wl.height)), wl.crop((352, 0, 680, wl.height))  # "WISHLIST" / "ON STEAM"
    two = Image.new("RGBA", (max(top.width, bot.width), wl.height * 2 + 8), (0, 0, 0, 0))
    two.alpha_composite(top, ((two.width - top.width) // 2, 0))
    two.alpha_composite(bot, ((two.width - bot.width) // 2, wl.height + 8))
    two.save(A / "wishlist-steam-2line.png", optimize=True)
    two.save(A / "wishlist-steam-2line.webp", lossless=True, exact=True, method=6)

    sheet = Image.open(A / "spr-sniper-sheet.png").convert("RGBA")
    sn = sheet.crop((0, 0, 64, 64))  # frame 0 of 13; no resampling
    sn.save(A / "spr-sniper-64.png", optimize=True)
    sn.save(A / "spr-sniper-64.webp", lossless=True, exact=True, method=6)

    og_image(hero)

    if (A / "trailer-src.jpg").exists():
        t = trailer_thumb(A / "trailer-src.jpg")
        t.save(A / "trailer-thumb.png", optimize=True)
        t.save(A / "trailer-thumb.webp", lossless=True, method=6)
    print("done")


if __name__ == "__main__":
    main()
