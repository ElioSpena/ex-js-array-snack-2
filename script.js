const books = [
  {
    title: "React Billionaire",
    pages: 250,
    author: {
      name: "Alice",
      age: 35,
    },
    available: false,
    price: "101€",
    tags: ["advanced", "js", "react", "senior"],
  },
  {
    title: "Advanced JS",
    pages: 500,
    author: {
      name: "Bob",
      age: 20,
    },
    available: true,
    price: "25€",
    tags: ["advanced", "js", "mid-senior"],
  },
  {
    title: "CSS Secrets",
    pages: 320,
    author: {
      name: "Alice",
      age: 17,
    },
    available: true,
    price: "8€",
    tags: ["html", "css", "junior"],
  },
  {
    title: "HTML Mastery",
    pages: 200,
    author: {
      name: "Charlie",
      age: 50,
    },
    available: false,
    price: "48€",
    tags: ["html", "advanced", "junior", "mid-senior"],
  },
];

/* Snack 1 - Filtra e Modifica
Crea un array (longBooks) con i libri che hanno più di 300 pagine;
Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
Stampa in console ogni titolo nella console. */

const longBooks = books.filter((b) => b.pages > 300);
console.log(longBooks);

const longBooksTitles = longBooks.map((l) => l.title);
console.log(longBooksTitles);

/* Snack 2 - Il primo libro scontato
Creare un array (availableBooks) che contiene tutti i libri disponibili.
Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi). */

const availableBooks = books.filter((b) => b.available);
console.log(availableBooks);

const discountedBooks = availableBooks.map((a) => {
  const price = parseFloat(a.price.replace("€", ""));
  const discountedPrice = (price * 0.8).toFixed(2);
  const newPrice = discountedPrice.replace(".00", "");
  return { ...a, price: `${newPrice}€` };
});

console.log(discountedBooks);

const fullPricedBook = discountedBooks.find((d) => {
  const price = parseFloat(d.price.replace("€", ""));
  return Number.isInteger(price);
});

console.log(fullPricedBook);

/* 
Snack 3 - Ordinare gli Autori
Creare un array (authors) che contiene gli autori dei libri.
Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente) */

const authors = books.map((b) => b.author);

const areAuthorsAdult = authors.every((a) => a.age >= 18);

console.log(areAuthorsAdult);

authors.sort((a, b) => (a.age - b.age) * (areAuthorsAdult ? 1 : -1));

console.log(authors);

/* Snack 4 - Calcola l’età media
Creare un array (ages) che contiene le età degli autori dei libri.
Calcola la somma delle età (agesSum) usando reduce.
Stampa in console l’età media degli autori dei libri. */

const ages = authors.map((a) => a.age);

console.log(ages);

const sumAges = ages.reduce((acc, curr) => {
  return acc + curr;
}, 0);

console.log(sumAges / ages.length);

/* Snack 5 (Bonus) - Raccogli i libri
Usando la l'API http://localhost:3333/books/{id} usa la combinazione di .map() e Promise.all(),
 per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] . */

async function getBooks(ids) {
  const promisedBook = await Promise.all(
    ids.map((id) =>
      fetch(`http://localhost:3333/books/${id}`).then((resp) => resp.json()),
    ),
  );

  return promisedBook;
}
(async () => {
  const newBooks = await getBooks([2, 13, 7, 21, 19]);
})();

/* Snack 6 (Bonus) - Ordina i libri
Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
Ordina l’array booksByPrice in base alla disponibilità (prima quelli disponibili), senza creare un nuovo array. */

const areThereAvailableBooks = books.some((b) => b.available);
console.log(areThereAvailableBooks);

const booksByPrice = [...books].sort(
  (a, b) => parseFloat(a.price) - parseFloat(b.price),
);

console.log(booksByPrice);

booksByPrice.sort((a, b) =>
  a.available === b.available ? 0 : a.available ? -1 : 1,
);

/* Snack 7 (Bonus) - Analizza i tag
Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri. */

const tagCounts = books.reduce((acc, b) => {
  b.tags.forEach((tag) => {
    if (acc[tag]) {
      acc[tag]++;
    } else {
      acc[tag] = 1;
    }
  });
  return acc;
}, {});

console.log(tagCounts);
