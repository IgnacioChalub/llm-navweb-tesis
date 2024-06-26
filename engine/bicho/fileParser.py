import os
import re
from common import load_file_path_from_parent_of_root

def collect_import_lines(file_path):
    import_lines = []
    entire_file_content = ""

    try:
        with open(file_path, 'r') as file:
            entire_file_content = file.read()
            for line in entire_file_content.split('\n'):
                line = line.strip()
                if line.startswith("import"):
                    match = re.search(r'\'(src/app/[^\'\"]*?)(?<!\.scss)(?<!\.css)(?<!\.sass)\'', line) or \
                            re.search(r'\"(src/app/[^\'\"]*?)(?<!\.scss)(?<!\.css)(?<!\.sass)\"', line)
                    if match:
                        import_lines.append(match.group(1))
    except FileNotFoundError:
        print(f"The file {file_path} does not exist.")
    except Exception as e:
        print(f"An error occurred while reading {file_path}: {e}")

    return entire_file_content, import_lines

def resolve_imports(imports, base_path, visited):
    resolved_imports = []
    file_contents = []

    for imp in imports:
        import_path = os.path.join(base_path, imp)
        if not import_path.endswith(('.ts', '.tsx')):
            import_path_ts = import_path + '.ts'
            import_path_tsx = import_path + '.tsx'
            import_path = import_path_ts if os.path.isfile(import_path_ts) else import_path_tsx

        if os.path.isfile(import_path) and import_path not in visited:
            visited.add(import_path)
            resolved_imports.append(imp)
            entire_file_content, nested_imports = collect_import_lines(import_path)
            file_contents.append(entire_file_content)
            nested_contents = resolve_imports(nested_imports, base_path, visited)
            file_contents.extend(nested_contents)

    return file_contents

def get_components(file_path, base_path):
    visited = set()
    initial_file_content, initial_imports = collect_import_lines(file_path)
    all_contents = [initial_file_content]
    all_contents.extend(resolve_imports(initial_imports, base_path, visited))
    return all_contents

def main():
    entry_file = "next-sandbox/test-app/src/app/(authRoutes)/dashboard/page.tsx"
    base_path = load_file_path_from_parent_of_root("next-sandbox/test-app")
    file_path = load_file_path_from_parent_of_root(entry_file)

    components = get_components(file_path, base_path)
    for component in components:
        print("---------------------------------------------------")
        print(component)

if __name__ == "__main__":
    main()

