import os
from urllib.parse import urlparse

from bicho.common import load_file_path_from_parent_of_root


def find_page_tsx(repository_path, url):
    """
    Given a repository path and a URL, find the corresponding page.tsx file
    in a Next.js 13 repository, handling dynamic routes and route groups.

    Parameters:
        repository_path (str): The path to the root of the repository.
        url (str): The URL path to resolve.

    Returns:
        str or None: The relative path to the page.tsx file corresponding to the URL,
                     or None if not found.
    """
    # Parse the URL to extract the path
    parsed_url = urlparse(url)
    path = parsed_url.path
    # Split the path into segments, ignoring leading/trailing slashes and empty segments
    segments = [segment for segment in path.strip('/').split('/') if segment]

    # Define the starting directory (commonly 'app' in Next.js 13)
    app_dir = os.path.join(repository_path + '/src', 'app')
    if not os.path.isdir(app_dir):
        raise FileNotFoundError(f"'app' directory not found in {repository_path}")

    def recursive_search(current_dir, remaining_segments):
        """
        Recursively search for the page.tsx file corresponding to the remaining segments.

        Parameters:
            current_dir (str): The current directory path.
            remaining_segments (list of str): The list of remaining path segments to match.

        Returns:
            str or None: The relative path to the page.tsx file if found, else None.
        """
        # If no more segments to match, look for 'page.tsx' or 'index.tsx' in current_dir
        if not remaining_segments:
            for filename in ['page.tsx', 'index.tsx']:
                candidate = os.path.join(current_dir, filename)
                if os.path.isfile(candidate):
                    return os.path.abspath(candidate)
            return None  # No page.tsx or index.tsx found

        # Current segment to match
        current_segment = remaining_segments[0]
        # Remaining segments after consuming the current one
        next_segments = remaining_segments[1:]

        try:
            # List all subdirectories in the current directory
            subdirs = [d for d in os.listdir(current_dir) if os.path.isdir(os.path.join(current_dir, d))]
        except FileNotFoundError:
            return None  # Current directory does not exist

        for subdir in subdirs:
            subdir_path = os.path.join(current_dir, subdir)

            # Handle route groups: directories enclosed in parentheses (e.g., (group))
            if subdir.startswith('(') and subdir.endswith(')'):
                # Route groups do not correspond to URL segments; recurse without consuming a segment
                matched = recursive_search(subdir_path, remaining_segments)
                if matched:
                    return matched

            else:
                # Handle dynamic routes: directories enclosed in square brackets (e.g., [param])
                if subdir.startswith('[') and subdir.endswith(']'):
                    # Dynamic segments match any single URL segment
                    matched = recursive_search(subdir_path, next_segments)
                    if matched:
                        return matched

                # Handle static routes: exact match with the current URL segment
                elif subdir == current_segment:
                    matched = recursive_search(subdir_path, next_segments)
                    if matched:
                        return matched

        # If no matching subdirectory is found, return None
        return None

    # Start the recursive search from the 'app' directory
    page_tsx = recursive_search(app_dir, segments)

    # Handle the case where the URL is the root path '/'
    if not segments and not page_tsx:
        # Look for 'page.tsx' or 'index.tsx' directly under 'app'
        for filename in ['page.tsx', 'index.tsx']:
            candidate = os.path.join(app_dir, filename)
            if os.path.isfile(candidate):
                page_tsx = os.path.abspath(candidate)

    if page_tsx:
        # Only return the path after /next-sandbox
        return page_tsx.split("/llm-navweb-tesis", 1)[-1]

    return None  # May be None if no matching page.tsx is found

if __name__ == '__main__':
    # Example repository path
    repo_path = load_file_path_from_parent_of_root("next-sandbox/test-app")

    # Example URLs
    urls = [
        "/",
        "/about-next13",
        "/dashboard",
        "/form",
        "/login",
        "/register",
        "/something"
    ]

    for url in urls:
        page_path = find_page_tsx(repo_path, url)
        if page_path:
            print(f"URL '{url}' maps to: {page_path}")
        else:
            print(f"URL '{url}' does not have a corresponding page.tsx file.")
