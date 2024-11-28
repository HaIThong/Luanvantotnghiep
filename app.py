from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Dữ liệu giả lập cho tin nhắn
messages = []

# API: Lấy danh sách tin nhắn
@app.route('/api/messages/<int:user_id>/<int:partner_id>', methods=['GET'])
def get_messages(user_id, partner_id):
    relevant_messages = [
        msg for msg in messages if
        (msg['sender_id'] == user_id and msg['receiver_id'] == partner_id) or
        (msg['sender_id'] == partner_id and msg['receiver_id'] == user_id)
    ]
    return jsonify(relevant_messages)

# API: Gửi tin nhắn
@app.route('/api/messages', methods=['POST'])
def send_message():
    data = request.json
    new_message = {
        "id": len(messages) + 1,
        "sender_id": data['sender_id'],
        "receiver_id": data['receiver_id'],
        "content": data['content'],
        "timestamp": datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    }
    messages.append(new_message)
    socketio.emit('chat_message', new_message, room=data['receiver_id'])
    return jsonify(new_message), 201

# WebSocket: Tham gia phòng
@socketio.on('join')
def on_join(data):
    user_id = data['user_id']
    join_room(user_id)
    print(f"User {user_id} joined room.")

# WebSocket: Rời phòng
@socketio.on('leave')
def on_leave(data):
    user_id = data['user_id']
    leave_room(user_id)
    print(f"User {user_id} left room.")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
