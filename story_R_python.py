from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/story/video', methods=['GET'])
def get_video():
    # Example: Replace with the actual path to your video file in the database or storage
    video_url = "http://localhost:5000/static/elephant_and_mouse.mp4"
    return jsonify({"videoUrl": video_url})

if __name__ == "__main__":
    app.run(debug=True)
