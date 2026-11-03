#!/usr/bin/env python3
"""SIGNAL LOOP icons: 16x16 1-bit pixel art (PAPER on transparent, 1px stroke), shown at exactly 4x (64px)
with image-rendering: pixelated inside a 104px INK box. Writes assets/ico16-<name>.png.

    python tools/make_icons.py
"""
from pathlib import Path
from PIL import Image

A = Path(__file__).resolve().parent.parent / "assets"
PAPER = (240, 246, 240, 255)
# 01 INTERCEPT: headphones with a dot-dash between the cups
# 02 ANALYZE: magnifier over a morse line
# 03 COMMAND: telegraph key with outgoing signal arcs
# 04 TUNE: radio set with antenna, frequency scale + needle, two knobs
ICONS = {}
ICONS['intercept']="""
................
.....######.....
...##......##...
..#..........#..
.#............#.
.#............#.
.#............#.
.#............#.
###..........###
####........####
####........####
####.#.##.#.####
####........####
###..........###
................
................"""
ICONS['analyze']="""
................
....#####.......
...#.....#......
..#.......#.....
.#..#.###..#....
.#.........#....
.#..###.#..#....
.#.........#....
..#.......#.....
...#.....###....
....#####.###...
...........###..
............###.
.............##.
................
................"""
ICONS['command']="""
................
...........##...
.............#..
..##.......#..#.
.####.......#.#.
.####.......#.#.
..##............
..##............
.###########....
.........##.....
.........##.....
################
#..............#
################
.##..........##.
................"""
ICONS['tune']="""
............#...
...........#....
..........#.....
################
#.......#......#
#.#.#.#.#.#.#..#
#.......#......#
#.############.#
#..............#
#.###.####.###.#
#.###......###.#
#.###.####.###.#
#..............#
################
.##..........##.
................"""

def main():
    for name, art in ICONS.items():
        rows = art.strip("\n").split("\n")
        assert len(rows) == 16 and all(len(r) == 16 for r in rows), name
        im = Image.new("RGBA", (16, 16), (0, 0, 0, 0))
        for y, row in enumerate(rows):
            for x, c in enumerate(row):
                if c == "#":
                    im.putpixel((x, y), PAPER)
        im.save(A / f"ico16-{name}.png", optimize=True)


if __name__ == "__main__":
    main()
