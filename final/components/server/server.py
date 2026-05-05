from collections import Counter
from flask import Flask, jsonify
from PIL import Image
from pathlib import Path
import re
import numpy as np
from sklearn.cluster import KMeans
import colorsys

app = Flask(__name__)

EXHIBIT_DATA_PATH = Path(__file__).resolve().parent.parent / "ExhibitData.js"
IMAGE_PATH = None

with EXHIBIT_DATA_PATH.open("r", encoding="utf-8") as f:
    exhibit_text = f.read()

match = re.search(r"img:\s*['\"](.+?)['\"]", exhibit_text)
if match:
    relative_image_path = match.group(1)
    IMAGE_PATH = (EXHIBIT_DATA_PATH.parent / relative_image_path).resolve()
else:
    raise RuntimeError("Could not find img path in ExhibitData.js")

if not IMAGE_PATH.exists():
    raise RuntimeError(f"Image file not found: {IMAGE_PATH}")


def get_most_common_color(image_path: Path) -> str:
    img = Image.open(image_path).convert("RGB")

    pixels = np.array(img).reshape(-1, 3)

    kmeans = KMeans(n_clusters=10, n_init=10, random_state=42)
    labels = kmeans.fit_predict(pixels)
    colors = kmeans.cluster_centers_.astype(int)

    counts = np.bincount(labels)
    valid = []
    for count, color in zip(counts, colors):
        r, g, b = color
        h, s, v = colorsys.rgb_to_hsv(r / 255.0, g / 255.0, b / 255.0)

        if v >= 0.2 and s >= 0.2:
            valid.append((count, color))

    if valid:
        dominant_color = max(valid, key=lambda item: item[0])[1]
    else:
        dominant_color = colors[np.argmax(counts)]

    r, g, b = dominant_color
    return "#{:02x}{:02x}{:02x}".format(r, g, b)

@app.route("/dominant-color")
def dominant_color():
    color = get_most_common_color(IMAGE_PATH)
    return jsonify(color=color)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)