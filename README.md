# Sky's Loot Tool

## Installation

1. Clone the project repository to your local machine:
    ```sh
    git clone <repository_url>
    ```

2. Navigate to the project directory:
    ```sh
    cd <repository_directory>
    ```

3. Open `index.html` with your preferred web browser to start using the Loot Group Maker tool.

4. Optionally, open `groupIncluder.html` with your preferred web browser to use the Group Includer tool.

## Usage

### Loot Group Maker Tool

1. **Add Items**: Click the "Add Item" button to add a new item to the loot group.
2. **Remove Items**: Click the "Remove Item" button to remove the last item from the list.
3. **Item Details**:
    - **Item Template**: Enter the item template name.
    - **Weight**: Enter the weight percentage for the item. The total weight of all items must add up to 100%.
4. **Generate Script**: Click the "Generate Script" button to view the Lua script in the browser.
5. **Generate Lua File**: Click the "Generate Lua File" button to download the Lua script as a file.

### Group Includer Tool

- This tool is designed for use with `custom_scripts`. Simply open `groupIncluder.html` in your web browser to start using it.
1. **Path**: Input the path after groups
	- **Note**: it starts the path at `../custom_scripts/groups/`
2. **Group Includes**: Copy and paste the file names without commas at the end.
	- **Example**
		```
		item1
		item2
		item3
		item4
		```