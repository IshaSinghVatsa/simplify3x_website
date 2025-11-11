#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Change to the directory containing the website files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 13000
Handler = http.server.SimpleHTTPRequestHandler

# Custom handler to set proper MIME types
class CustomHandler(Handler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.svg'):
            return 'image/svg+xml'
        elif path.endswith('.webp'):
            return 'image/webp'
        return mimetype

    def log_message(self, format, *args):
        # Enhanced debug logging
        print(f"[DEBUG] {self.address_string()} - {format % args}")
        print(f"[DEBUG] Request path: {self.path}")
        print(f"[DEBUG] Request method: {self.command}")
        print(f"[DEBUG] User agent: {self.headers.get('User-Agent', 'Unknown')}")
        print(f"[DEBUG] Referer: {self.headers.get('Referer', 'None')}")
        print("-" * 50)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.send_response(404)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            try:
                with open('404.html', 'rb') as f:
                    self.wfile.write(f.read())
                self.wfile.flush()
            except Exception:
                self.wfile.write(b"404 Not Found")
        else:
            super().send_error(code, message, explain)

try:
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
        print(f"Server running at http://0.0.0.0:{PORT}/")
        print(f"Access your website at: https://work-1-sxsomvmmktgphyzo.prod-runtime.all-hands.dev")
        print("Debug mode: ENABLED")
        print("Press Ctrl+C to stop the server")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped.")
    sys.exit(0)
except Exception as e:
    print(f"Error starting server: {e}")
    sys.exit(1)