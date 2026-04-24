import subprocess
import os

repo_dir = r"c:\Users\kalmengor\Documents\Desarrollos\invitacion-main"
try:
    # Restaurar archivos modificados
    res1 = subprocess.run(["git", "restore", "index.html", "style.css", "script.js"], cwd=repo_dir, capture_output=True, text=True)
    print("Restore stdout:", res1.stdout)
    print("Restore stderr:", res1.stderr)
    
    # Eliminar copy.py si existe
    copy_script = os.path.join(repo_dir, "copy.py")
    if os.path.exists(copy_script):
        os.remove(copy_script)
        print("deleted copy.py")
        
    print("Restauración completada.")
except Exception as e:
    print("Error:", str(e))
