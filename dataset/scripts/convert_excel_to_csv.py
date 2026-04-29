import os
import pandas as pd

# Get current script directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Define folders
input_folder = os.path.join(BASE_DIR, "../raw")
output_folder = os.path.join(BASE_DIR, "../cleaned")

# Create cleaned folder if not exists
os.makedirs(output_folder, exist_ok=True)

# Process all Excel files
for file in os.listdir(input_folder):

    if file.endswith(".xls") or file.endswith(".xlsx"):

        file_path = os.path.join(input_folder, file)

        print(f"Processing: {file}")

        try:
            df = pd.read_excel(file_path)

            output_file = os.path.join(
                output_folder,
                file.replace(".xls", ".csv").replace(".xlsx", ".csv")
            )

            df.to_csv(output_file, index=False)

            print(f"Converted: {output_file}")

        except Exception as e:
            print(f"Error processing {file}: {e}")

print("All files converted successfully.")