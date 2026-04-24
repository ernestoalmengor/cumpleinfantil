import os
import shutil

src_dir = r"c:\Users\kalmengor\Documents\Desarrollos\invitacion-main"
dest_dir = r"c:\Users\kalmengor\Documents\Desarrollos\invitacion-cumple"

files_to_copy = ['index.html', 'style.css', 'script.js']

for f in files_to_copy:
    src_file = os.path.join(src_dir, f)
    dest_file = os.path.join(dest_dir, f)
    if os.path.exists(src_file):
        shutil.copy2(src_file, dest_file)
        print(f"Copied {f}")

# Copy python script for images to public
copy_script = os.path.join(src_dir, 'copy.py')
if os.path.exists(copy_script):
    shutil.copy2(copy_script, dest_dir)
    print("Copied copy.py")

print("Files copied successfully.")
