#!/usr/bin/env python3
"""
Image pipeline used for the 1-bit redesign (run on any machine with Pillow; originals are never modified).

    pip install pillow
    python tools/convert_images.py

- <name>.png  -> <name>.webp  (lossless for 2-colour / few-colour pixel art, quality 86 for screenshots)
- hero-battlefield.png -> hero-1bit.png/.webp (half-size Floyd–Steinberg dither in INK/PAPER)
- sprout-logo.png -> sprout-logo-1bit.png, sprout-mark-1bit.png (native 1x pixel grid, INK/PAPER)
- spr-sniper-sheet.png (copy of the game's SinperAnimations.png, 832x64, 13 frames) -> spr-sniper-64.png/.webp
  (frame 0, 64x64, native pixels + transparency; shown at exact 2x with image-rendering: pixelated)
- trailer-src.jpg (YouTube hqdefault of KcvhLI1SKCk) -> trailer-thumb.png/.webp (16:9 crop, INK/PAPER threshold)
The original PNGs stay in assets/ (press-kit downloads link to them).
"""
from pathlib import Path
from PIL import Image, ImageOps, ImageChops

A = Path(__file__).resolve().parent.parent / "assets"
INK, PAPER = (34, 35, 35), (240, 246, 240)
WEBP = ["wid-logo", "screen-battle", "screen-radio", "screen-clock", "screen-title", "screen-stage",
        "story-room", "char-remarque", "char-anderson", "char-nick", "ico-intercept", "ico-analyze",
        "ico-command", "ico-tune", "spr-scout", "spr-infantry", "spr-sniper"]  # spr-sniper.webp kept for old links


def duo(bitmap):
    out = Image.new("RGB", bitmap.size, INK)
    out.paste(Image.new("RGB", bitmap.size, PAPER), mask=bitmap.convert("L"))
    return out


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

    h = Image.open(A / "hero-battlefield.png").convert("L")
    h = ImageOps.autocontrast(h.resize((h.width // 2, h.height // 2), Image.LANCZOS), cutoff=1)
    hero = duo(h.convert("1"))
    hero.save(A / "hero-1bit.png", optimize=True)
    hero.save(A / "hero-1bit.webp", lossless=True, method=6)

    s = Image.open(A / "sprout-logo.png").convert("RGBA")
    alpha = s.split()[3].point(lambda a: 255 if a > 127 else 0)
    light = s.convert("L").point(lambda v: 255 if v > 110 else 0)
    out = Image.new("RGBA", s.size, (0, 0, 0, 0))
    out.paste(Image.new("RGBA", s.size, INK + (255,)), mask=ImageChops.multiply(alpha, ImageOps.invert(light)))
    out.paste(Image.new("RGBA", s.size, PAPER + (255,)), mask=ImageChops.multiply(alpha, light))
    out = out.crop(s.getbbox())
    full = out.resize((out.width // 10, out.height // 10), Image.NEAREST)  # source art is a 10x pixel grid
    full.save(A / "sprout-logo-1bit.png", optimize=True)
    mark = out.crop((0, 0, out.width, 660))
    mark = mark.crop(mark.getbbox())
    mark.resize((mark.width // 10, mark.height // 10), Image.NEAREST).save(A / "sprout-mark-1bit.png", optimize=True)

    sheet = Image.open(A / "spr-sniper-sheet.png").convert("RGBA")
    sn = sheet.crop((0, 0, 64, 64))  # frame 0 of 13; no resampling
    sn.save(A / "spr-sniper-64.png", optimize=True)
    sn.save(A / "spr-sniper-64.webp", lossless=True, exact=True, method=6)

    if (A / "trailer-src.jpg").exists():
        t = trailer_thumb(A / "trailer-src.jpg")
        t.save(A / "trailer-thumb.png", optimize=True)
        t.save(A / "trailer-thumb.webp", lossless=True, method=6)
    print("done")


if __name__ == "__main__":
    main()
