from collections import Counter
from flask import Flask, jsonify
from PIL import Image
from pathlib import Path
import re

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
    width, height = img.size

    border_pixels = []
    border_width = min(3, width // 2, height // 2)

    for y in range(height):
        for x in range(width):
            if x < border_width or x >= width - border_width or y < border_width or y >= height - border_width:
                border_pixels.append(img.getpixel((x, y)))

    if not border_pixels:
        img = img.resize((50, 50), resample=Image.Resampling.LANCZOS)
        border_pixels = list(img.getdata())

    def distance_sq(a, b):
        return (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2

    k = min(3, len(border_pixels))
    step = len(border_pixels) // k if k > 0 else 1
    centroids = [tuple(border_pixels[i * step]) for i in range(k)]

    for _ in range(10):
        clusters = [[] for _ in range(k)]
        for pixel in border_pixels:
            best_index = min(range(k), key=lambda i: distance_sq(pixel, centroids[i]))
            clusters[best_index].append(pixel)

        new_centroids = []
        for i in range(k):
            if len(clusters[i]) == 0:
                new_centroids.append(centroids[i]) # Keep old centroid if empty
            else:
                r = sum(p[0] for p in clusters[i]) / len(clusters[i])
                g = sum(p[1] for p in clusters[i]) / len(clusters[i])
                b = sum(p[2] for p in clusters[i]) / len(clusters[i])
                new_centroids.append((r, g, b))

        if all(distance_sq(centroids[i], new_centroids[i]) < 1 for i in range(k)):
            break
        centroids = new_centroids

    largest_cluster_index = max(range(k), key=lambda i: len(clusters[i]) if clusters[i] else 0)
    r, g, b = (int(round(c)) for c in centroids[largest_cluster_index])
    return "#{:02x}{:02x}{:02x}".format(r, g, b)

@app.route("/dominant-color")
def dominant_color():
    color = get_most_common_color(IMAGE_PATH)
    return jsonify(color=color)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)