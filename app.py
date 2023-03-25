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
    sit_mapping = {0: '坤  ☷', 1: '乾  ☰', 2: '兑  ☱', 3: '离  ☲', 4: '震  ☳', 5: '巽  ☴', 6: '坎  ☵', 7: '艮  ☶'}
    phase_mapping = {0: '上', 1: '初', 2: '二', 3: '三', 4: '四', 5: '五'}
    result_a = sit_mapping[int(a) % 8]
    result_b = sit_mapping[int(b) % 8]
    result_c = phase_mapping[int(c) % 6]
    return jsonify({'result_a': result_a, 'result_b': result_b, 'result_c': result_c})


if __name__ == '__main__':
    app.run(host='0.0.0.0')