import re

with open('script.js', 'r') as f:
    js = f.read()

# Check for unbalanced backticks
ticks = js.count('`')
print(f"Backticks count: {ticks}")
if ticks % 2 != 0:
    print("Unbalanced backticks detected!")

# Check for unclosed braces or parentheses approximately
braces = js.count('{') - js.count('}')
print(f"Braces balance: {braces}")

parens = js.count('(') - js.count(')')
print(f"Parens balance: {parens}")

