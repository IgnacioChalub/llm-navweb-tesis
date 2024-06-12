import os
import re

def load_file_path_from_parent_of_root(filename):
    current_dir = os.path.dirname(os.path.realpath(__file__))
    root_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
    parent_of_root = os.path.abspath(os.path.join(root_dir, os.pardir))
    file_path = os.path.join(parent_of_root, filename)
    return file_path

def collect_import_lines(file_path):
    import_lines = []
    try:
        with open(file_path, 'r') as file:
            for line in file:
                line = line.strip()
                if line.startswith("import"):
                    # Use regex to extract the import path
                    match = re.search(r'\'(src/app/[^\'\"]*?)(?<!\.scss)(?<!\.css)(?<!\.sass)\'', line) or \
                            re.search(r'\"(src/app/[^\'\"]*?)(?<!\.scss)(?<!\.css)(?<!\.sass)\"', line)
                    if match:
                        import_lines.append(match.group(1))
    except FileNotFoundError:
        print(f"The file {file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")

    return import_lines

def main():
    current_path = os.getcwd()
    print(f"Current working directory: {current_path}")

    # Example file path
    file_path = load_file_path_from_parent_of_root("next-sandbox/test-app/src/app/page.tsx")
    print(f"File path: {file_path}")

    if not os.path.isfile(file_path):
        print(f"File not found: {file_path}")
        return

    imports = collect_import_lines(file_path)
    for imp in imports:
        print(f"Import: {imp}")

    print("imports", imports)

if __name__ == "__main__":
    main()


