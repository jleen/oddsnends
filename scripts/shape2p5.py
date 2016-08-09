data = [ 18, 63, 32, 100, 45, 21, 54, 30, 7 ]

DIRECTIONS = [ 'North', 'East', 'South', 'West' ]

def translate(cmd):
    prefix = 'go'
    if cmd & 0b100:
        prefix = 'draw'
        cmd &= 0b011
    print('t.%s%s();' % (prefix, DIRECTIONS[cmd]))

for byte in data:
    translate(byte & 0b00000111)
    translate((byte & 0b00111000) >> 3)
    third = (byte & 0b11000000) >> 6
    if third: translate(third)

