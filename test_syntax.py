import re
from html.parser import HTMLParser

class ScriptParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_script = False
        self.script_data = ""

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            self.in_script = True

    def handle_endtag(self, tag):
        if tag == "script":
            self.in_script = False

    def handle_data(self, data):
        if self.in_script:
            self.script_data += data

with open('portofolio-tuffahati.html', 'r', encoding='utf-8') as f:
    content = f.read()

parser = ScriptParser()
parser.feed(content)

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(parser.script_data)

