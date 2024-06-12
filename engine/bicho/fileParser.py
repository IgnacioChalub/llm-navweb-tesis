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

def resolve_imports(imports, base_path):
    resolved_imports = []
    for imp in imports:
        import_path = os.path.join(base_path, imp)
        if not import_path.endswith(('.ts', '.tsx')):
            import_path_ts = import_path + '.ts'
            import_path_tsx = import_path + '.tsx'
            if os.path.isfile(import_path_ts):
                import_path = import_path_ts
            elif os.path.isfile(import_path_tsx):
                import_path = import_path_tsx
            else:
                continue
        if os.path.isfile(import_path):
            resolved_imports.append(imp)
            nested_imports = collect_import_lines(import_path)
            resolved_imports.extend(resolve_imports(nested_imports, base_path))
    return resolved_imports

def components_paths(file_path, base_path):
    initial_imports = collect_import_lines(file_path)
    all_imports = resolve_imports(initial_imports, base_path)
    return all_imports

def main():
    entry_file = "next-sandbox/test-app/src/app/page.tsx"
    base_path = load_file_path_from_parent_of_root("next-sandbox/test-app")
    file_path = load_file_path_from_parent_of_root(entry_file)
    print(components_paths(file_path, base_path))

if __name__ == "__main__":
    main()


