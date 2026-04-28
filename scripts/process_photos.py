#!/usr/bin/env python3
"""Strip ALL metadata, downsize for web, save as clean JPG.

- Reads every .jpg/.JPEG/.png in src/assets/photos
- Honors EXIF orientation (so portrait shots render upright)
- Strips ALL metadata (no GPS, no camera info, no timestamps)
- Resizes longest edge to 2400px max
- Re-saves as JPG at quality 88
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src" / "assets" / "photos"
OUT = SRC  # in-place
MAX_EDGE = 2400
QUALITY = 88

EXTS = {".jpg", ".jpeg", ".png"}


def process(path: Path) -> None:
    img = Image.open(path)
    img = ImageOps.exif_transpose(img)  # apply rotation, drop EXIF orientation
    img = img.convert("RGB")

    w, h = img.size
    if max(w, h) > MAX_EDGE:
        if w >= h:
            new_w, new_h = MAX_EDGE, int(h * MAX_EDGE / w)
        else:
            new_w, new_h = int(w * MAX_EDGE / h), MAX_EDGE
        img = img.resize((new_w, new_h), Image.LANCZOS)

    # New clean image with no metadata
    clean = Image.new("RGB", img.size)
    clean.putdata(list(img.getdata()))

    # Always output as .jpg
    out_path = path.with_suffix(".jpg")
    # Save with NO exif/icc/xmp
    clean.save(out_path, format="JPEG", quality=QUALITY, optimize=True)

    # If we changed extension (e.g. .PNG → .jpg) remove original
    if out_path != path:
        path.unlink()

    size_kb = out_path.stat().st_size // 1024
    print(f"  ✓ {out_path.name}  {clean.size[0]}×{clean.size[1]}  {size_kb} KB")


def main() -> None:
    files = sorted(p for p in SRC.iterdir() if p.suffix.lower() in EXTS and p.is_file())
    if not files:
        print(f"No images found in {SRC}")
        return
    print(f"Processing {len(files)} files in {SRC}\n")
    for f in files:
        process(f)
    print("\nDone.")


if __name__ == "__main__":
    main()
