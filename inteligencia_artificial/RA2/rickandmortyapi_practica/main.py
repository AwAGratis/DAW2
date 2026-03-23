import requests
import pandas as pd
import os
import time

BASE_URL = "https://rickandmortyapi.com/api/character"

headers = {
    "User-Agent": "Mozilla/5.0"
}


# 1. DESCARGAR PERSONAJES

url = BASE_URL
characters = []

print("Descargando personajes...")

while url:

    print("Consulta:", url)

    response = requests.get(url, headers=headers, timeout=10)

    # (Parece que la ip del insti esta medio baneada de la api asi que he hecho
    # una logica para manejar el rate limit
    if response.status_code == 429:
        print("Rate limit, pausa de 5 secs")
        time.sleep(5)
        continue

    if response.status_code != 200:
        print("Error HTTP:", response.status_code)
        print(response.text[:200])
        break

    data = response.json()

    characters.extend(data["results"])

    url = data["info"]["next"]

    time.sleep(0.3)  # pequeña pausa para evitar rate limit


print("Total personajes descargados:", len(characters))


# 2. CREAR DATAFRAME

if len(characters) == 0:
    print("No se pudieron descargar personajes. Abortando.")
    exit()

df = pd.DataFrame(characters)

df = df[
    [
        "id",
        "name",
        "status",
        "species",
        "gender",
        "episode",
    ]
]


# 3. EXPLODE EPISODES

df = df.explode("episode")


# 4. ID COMO ÍNDICE

df.set_index("id", inplace=True)


# 5. GUARDAR CSV

csv_file = "rick_morty_characters.csv"

df.to_csv(csv_file, encoding="utf-8")

print("CSV guardado:", csv_file)


# 6. LEER CSV

df = pd.read_csv(csv_file, encoding="utf-8", index_col="id")

print("CSV cargado correctamente")


# 7. CREAR CARPETA IMÁGENES

if not os.path.exists("images"):
    os.makedirs("images")


# 8. DESCARGAR IMÁGENES

characters_to_search = [
    "Mel Gibson",
    "Johnny Depp",
    "Pickle Rick"
]

print("\nDescargando imágenes...")

for name in characters_to_search:

    url = f"{BASE_URL}/?name={name}"

    response = requests.get(url, headers=headers, timeout=10)

    if response.status_code != 200:
        print(f"No se pudo buscar {name}")
        continue

    data = response.json()

    if "results" not in data:
        print(f"{name} no encontrado")
        continue

    character = data["results"][0]

    image_url = character["image"]

    img = requests.get(image_url)

    filename = name.replace(" ", "_") + ".jpg"

    with open(f"images/{filename}", "wb") as f:
        f.write(img.content)

    print("Imagen guardada:", filename)


# 9. CONTAR APARICIONES

print("\nContando apariciones...")

birdperson = df[df["name"] == "Birdperson"]
squanchy = df[df["name"] == "Squanchy"]
meeseeks = df[df["name"] == "Mr. Meeseeks"]

print("Birdperson:", len(birdperson))
print("Squanchy:", len(squanchy))
print("Mr. Meeseeks:", len(meeseeks))