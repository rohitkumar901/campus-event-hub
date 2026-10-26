"""
Campus Event Hub (CampusVibe)
Run this file directly in PyCharm to start the local server and open the web portal.
"""

import http.server
import socketserver
import webbrowser
import os
import threading
import time

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def open_browser():
    time.sleep(1.2)
    url = f"http://localhost:{PORT}"
    print(f"\n[+] Opening browser at: {url}")
    webbrowser.open(url)

def main():
    print("=" * 65)
    print("   🎓 CAMPUS EVENT HUB (CampusVibe) - LOCAL SERVER")
    print("=" * 65)
    print(f"[*] Serving files from: {DIRECTORY}")
    print(f"[*] Local URL: http://localhost:{PORT}")
    print("[*] Press Ctrl+C in PyCharm Terminal / Run window to stop server.")
    print("=" * 65)

    threading.Thread(target=open_browser, daemon=True).start()

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n[-] Server stopped.")

if __name__ == "__main__":
    main()
