import json
import os

def load_herbs():
    file_path = os.path.join(os.path.dirname(__file__), '../../herbs.json')
    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            herbs = json.load(f)
        return herbs if herbs else []  # If empty, LLM improvises
    return []