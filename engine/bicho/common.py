import os

def load_file_from_parent_of_root(filename):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    parent_of_root = os.path.abspath(os.path.join(root_dir, os.pardir))
    file_path = os.path.join(parent_of_root, filename)
    with open(file_path, 'r') as file:
        return file.read()
    
def load_file_path_from_parent_of_root(filename):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    parent_of_root = os.path.abspath(os.path.join(root_dir, os.pardir))
    file_path = os.path.join(parent_of_root, filename)
    return file_path
