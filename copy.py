import os
import shutil

src = os.path.join(os.path.expanduser('~'), '.gemini', 'antigravity', 'brain', 'c509a84b-da5b-4f11-b711-34d6cdf102c3')
dest = 'public'

files = {
    'fondo_selva_1776869589858.png': 'fondo_selva.png',
    'dino_trex_1776869601900.png': 'dino_trex.png',
    'dino_triceratops_1776869617451.png': 'dino_triceratops.png',
    'dino_brachiosaurus_1776869631513.png': 'dino_brachiosaurus.png',
    'nino_explorador_1776870463130.png': 'nino_explorador.png',
    'dino_pterodactyl_1776870476472.png': 'dino_pterodactyl.png',
    'portada_frame_1776870949356.png': 'portada_frame.png'
}

for f_src, f_dest in files.items():
    src_path = os.path.join(src, f_src)
    dest_path = os.path.join(dest, f_dest)
    if os.path.exists(src_path):
        shutil.copy(src_path, dest_path)
        print(f"Copied {f_src}")
