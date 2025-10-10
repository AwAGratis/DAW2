# 1) Que son
# Les tuples son estructures de dades que permeten emmagatzemar
# una col·leccio. 
# Son similars a les llistes, pero IMMUTABLES (no es poden modificar).

# 2) Que fan
# Emmagatzemen diversos valors de tipus diferent (int, float, str...),
# permetent accedir-hi per índex com si fos una llista, permeten valors duplicats.

# 3) Per a que serveixen
# S’utilitzen quan volem garantir que les dades no canviaran,
# per exemple, per retornar diversos valors d’una funcio o representar coordenades.

# 4) Diferencia amb les llistes:
# Les tuples son IMMUTABLES (no es poden canviar, afegir ni eliminar elements).
# Les llistes són MUTABLES (es poden modificar).
# Les tuples utilitzen (), mentre que les llistes utilitzen [].

# Creacio normal
tupla_1 = (1, 2, 3, 4)
print("Tupla 1:", tupla_1)

# Creacio amb tipus diferents
tupla_2 = ("Anna", 25, True, 3.14)
print("Tupla 2:", tupla_2)

# Creacio amb la classe tuple()
tupla_3 = tuple([5, 6, 7])
print("Tupla 3:", tupla_3)


# El metode count() compta quantes vegades apareix un valor
print("Comptes del 2:", tupla_1.count(2))

# El metode index() retorna la posicio de la primera aparicio
print("Index del valor 3:", tupla_1.index(3))

# El metode len() retorna la longitud de la tupla
print("Longitud de la tupla_2:", len(tupla_2))


# Convertir una tupla en llista
llista = list(tupla_1)
print("Tupla convertida a llista:", llista)

# Convertir una llista en tupla
tupla_nova = tuple(llista)
print("Llista convertida a tupla:", tupla_nova)


# Per a que les utilitzaria?
# Les utilitzaria quan necessito dades constants,
# com configuracions o valors que no vull que es puguin modificar.