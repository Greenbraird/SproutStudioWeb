#!/usr/bin/env python3
"""
Image pipeline used for the 1-bit redesign (run on any machine with Pillow; originals are never modified).

    pip install pillow
    python tools/convert_images.py

- <name>.png  -> <name>.webp  (lossless for 2-colour / few-colour pixel art, quality 86 for screenshots)
- hero-battlefield.png -> hero-1bit.png/.webp (half-size Floyd–Steinberg dither in INK/PAPER)
- sprout-logo.png -> sprout-logo-1bit.png, sprout-mark-1bit.png (native 1x pixel grid, INK/PAPER)
- spr-sniper.png -> spr-sniper-cut.png/.webp (white background flood-filled from the edges to alpha 0,
  anti-aliased edge un-mixed into INK + partial alpha; interior PAPER untouched)
- trailer-src.jpg (YouTube hqdefault of KcvhLI1SKCk) -> trailer-thumb.png/.webp (16:9 crop, INK/PAPER threshold)
The original PNGs stay in assets/ (press-kit downloads link to them).
"""
from pathlib import Path
from collections import deque
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


def cutout(src):
    im=src.convert("RGB"); W,H=im.size; px=im.load()
    bg=[[False]*W for _ in range(H)]
    q=deque()
    def light(x,y): return min(px[x,y])>=248
    for x in range(W):
        for y in (0,H-1):
            if light(x,y) and not bg[y][x]: bg[y][x]=True; q.append((x,y))
    for y in range(H):
        for x in (0,W-1):
            if light(x,y) and not bg[y][x]: bg[y][x]=True; q.append((x,y))
    while q:
        x,y=q.popleft()
        for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
            nx,ny=x+dx,y+dy
            if 0<=nx<W and 0<=ny<H and not bg[ny][nx] and light(nx,ny):
                bg[ny][nx]=True; q.append((nx,ny))
    # distance (chebyshev) to background, up to 3
    out=Image.new("RGBA",(W,H)); op=out.load()
    for y in range(H):
        for x in range(W):
            if bg[y][x]: op[x,y]=(255,255,255,0); continue
            r,g,b=px[x,y]
            near=False
            for dy in range(-2,3):
                for dx in range(-2,3):
                    nx,ny=x+dx,y+dy
                    if 0<=nx<W and 0<=ny<H and bg[ny][nx]: near=True;break
                if near: break
            if near and abs(g-r)<4 and abs(g-b)<4:
                lum=(r+g+b)/3
                a=max(0.0,min(1.0,(255-lum)/(255-34.33)))
                op[x,y]=INK + (round(a*255),)
            else:
                op[x,y]=(r,g,b,255)
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

    sn = cutout(Image.open(A / "spr-sniper.png"))
    sn.save(A / "spr-sniper-cut.png", optimize=True)
    sn.save(A / "spr-sniper-cut.webp", lossless=True, method=6)

    if (A / "trailer-src.jpg").exists():
        t = trailer_thumb(A / "trailer-src.jpg")
        t.save(A / "trailer-thumb.png", optimize=True)
        t.save(A / "trailer-thumb.webp", lossless=True, method=6)
    print("done")


if __name__ == "__main__":
    main()
