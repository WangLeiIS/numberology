from flask import Flask, request, jsonify,render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    a = data['a']
    b = data['b']
    c = data['c']
    table_64 = [
    [2, 12, 45, 35, 16, 20, 8, 23],
    [11, 1, 43, 14, 34, 9, 5, 26],
    [19, 10, 58, 38, 54, 61, 60, 41],
    [36, 13, 49, 30, 55, 37, 63, 22],
    [24, 25, 17, 21, 51, 42, 3, 27],
    [46, 44, 28, 50, 32, 57, 48, 18],
    [7, 6, 47, 64, 40, 59, 29, 4],
    [15, 33, 31, 56, 62, 53, 39, 52]
    ]
    duosit_mapping = {
    1: '䷀  乾',
    2: '䷁  坤',
    3: '䷂  屯',
    4: '䷃  蒙',
    5: '䷄  需',
    6: '䷅  訟',
    7: '䷆  師',
    8: '䷇  比',
    9: '䷈  小畜',
    10: '䷉  履',
    11: '䷊  泰',
    12: '䷋  否',
    13: '䷌  同人',
    14: '䷍  大有',
    15: '䷎  謙',
    16: '䷏  豫',
    17: '䷐  隨',
    18: '䷑  蠱',
    19: '䷒  臨',
    20: '䷓  觀',
    21: '䷔  噬嗑',
    22: '䷕  賁',
    23: '䷖  剝',
    24: '䷗  復',
    25: '䷘  無妄',
    26: '䷙  大畜',
    27: '䷚  頤',
    28: '䷛  大過',
    29: '䷜  坎',
    30: '䷝  離',
    31: '䷞  咸',
    32: '䷟  恆',
    33: '䷠  遯',
    34: '䷡  大壯',
    35: '䷢  晉',
    36: '䷣  明夷',
    37: '䷤  家人',
    38: '䷥  睽',
    39: '䷦  蹇',
    40: '䷧  解',
    41: '䷨  損',
    42: '䷩  益',
    43: '䷪  夬',
    44: '䷫  姤',
    45: '䷬  萃',
    46: '䷭  升',
    47: '䷮  困',
    48: '䷯  井',
    49: '䷰  革',
    50: '䷱  鼎',
    51: '䷲  震',
    52: '䷳  艮',
    53: '䷴  漸',
    54: '䷵  歸妹',
    55: '䷶  豐',
    56: '䷷  旅',
    57: '䷸  巽',
    58: '䷹  兌',
    59: '䷺  渙',
    60: '䷻  節',
    61: '䷼  中孚',
    62: '䷽  小過',
    63: '䷾  既濟',
    64: '䷿  未濟'
    }
    sit_mapping = {0: '坤  ☷', 1: '乾  ☰', 2: '兑  ☱', 3: '离  ☲', 4: '震  ☳', 5: '巽  ☴', 6: '坎  ☵', 7: '艮  ☶'}
    phase_mapping = {0: '上', 1: '初', 2: '二', 3: '三', 4: '四', 5: '五'}
    down_sit = int(a) % 8
    up_sit = int(b) % 8
    result_a = sit_mapping[down_sit]
    result_b = sit_mapping[up_sit]
    result_c = phase_mapping[int(c) % 6]
    sit_64 = table_64[down_sit][up_sit]
    sit_name = duosit_mapping[sit_64]
    return jsonify({'result_a': result_a, 'result_b': result_b, 'result_c': result_c, 'result_d': sit_64, 'result_e': sit_name})


if __name__ == '__main__':
    app.run(host='0.0.0.0')