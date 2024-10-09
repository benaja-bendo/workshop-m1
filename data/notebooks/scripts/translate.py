import os
import ast
import pandas as pd
from deep_translator import GoogleTranslator
from concurrent.futures import ThreadPoolExecutor
import argparse


def translate_batch(strings):
    return GoogleTranslator(source='en', target='fr').translate_batch(strings)


def translate_dict_batch(dicts):
    keys = [key for d in dicts for key in d.keys()]
    translated_keys = translate_batch(keys)
    translated_dicts = []
    for d in dicts:
        translated_dict = {translated_keys.pop(0): value for _, value in d.items()}
        translated_dicts.append(translated_dict)
    return translated_dicts


def translate_column(df, col):
    if isinstance(df.at[0, col], str):
        df[col] = translate_batch(df[col].tolist())
    elif isinstance(df.at[0, col], dict):
        df[col] = translate_dict_batch(df[col].tolist())
    return df


def translate_df(df: pd.DataFrame, columns=['recipe_name', 'ingredients', 'directions', 'recipe_type', 'nutrition']):
    with ThreadPoolExecutor() as executor:
        futures = [executor.submit(translate_column, df, col) for col in columns]
        for future in futures:
            future.result()
    return df


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("csv", type=lambda x: x if os.path.exists(x) else parser.error("Le fichier indiqué n'existe pas"), help="Un csv valide")
    parser.add_argument("--columns", "-c", nargs='?', default=['recipe_name', 'ingredients', 'directions', 'recipe_type', 'nutrition'], type=lambda x: x.split(';'), help="Les colonnes à utiliser comme index lors de la fusion (format : 'column 1;column2')")
    return parser.parse_args()



def main():
    try:
        args = parse_args()
        df = pd.read_csv(args.csv, sep=';')
        for col in ['ingredients', 'nutrition']:
            df[col] = df[col].apply(lambda x: ast.literal_eval(x) if pd.notnull(x) else x)
        df_translated = translate_df(df)
        path_translated = f"{args.csv.split('.csv')[0]}_translated.csv"
        df_translated.to_csv(path_translated, sep=';')
        return 0
    except Exception as e:
        print(f"An error occurred: {e}")
        return 1


if __name__ == "__main__":
    exit(main())
