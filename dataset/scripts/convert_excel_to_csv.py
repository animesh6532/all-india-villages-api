import pandas as pd
import os

input_folder = "../raw/"
output_folder = "../cleaned/"

os.makedirs(output_folder, exist_ok=True)

for file in os.listdir(input_folder):
    if file.endswith(".xls") or file.endswith(".xlsx"):
        file_path = os.path.join(input_folder, file)

        df = pd.read_excel(file_path)

        csv_name = file.replace(".xls", ".csv").replace(".xlsx", ".csv")

        df.to_csv(os.path.join(output_folder, csv_name), index=False)

        print(f"Converted {file} to CSV")