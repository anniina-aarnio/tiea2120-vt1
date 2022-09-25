"use strict";
//@ts-check 
// Joukkueen sarja on viite data.sarjat-taulukossa lueteltuihin sarjoihin
// Joukkueen rastileimausten rastit ovat viitteitä data.rastit-taulukossa lueteltuihin rasteihin

// Kirjoita tästä eteenpäin oma ohjelmakoodisi


/**
  * Taso 1
  * Järjestää leimaustavat aakkosjärjestykseen 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.leimaustavat-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.leimaustavat-taulukosta
*/
function jarjestaLeimaustavat(data) {
  let leimaustavat = Array.from(data.leimaustavat);
  leimaustavat = leimaustavat.sort();
  console.log(data);
  return leimaustavat; // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}


/**
  * Taso 1
  * Järjestää sarjat aakkosjärjestykseen sarjan nimen perustella 
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * Alkuperäistä rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.sarjat-taulukosta
  */
function jarjestaSarjat(data) {
  let sarjat = Array.from(data.sarjat);
  sarjat = sarjat.sort(vertaaNimea);
  return sarjat;  // tässä pitää palauttaa järjestetty kopio eikä alkuperäistä
}


/**
  * Taso 1
  * Lisää uuden sarjan data-rakenteeseen ja palauttaa muuttuneen datan
  * Sarja lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä sarjaa ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    sarjan nimi ei voi olla pelkkää whitespacea. 
  * - Sarjan keston täytyy olla kokonaisluku ja suurempi kuin 0
  *  Uusi sarja tallennetaan data.sarjat-taulukkoon. Sarjan on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // Jokaisella sarjalle oleva uniikki kokonaislukutunniste, pakollinen tieto
  *     "nimi": {String}, // Sarjan uniikki nimi, pakollinen tieto
  *     "kesto": {Number}, // sarjan kesto tunteina, pakollinen tieto
  *     "alkuaika": {String}, // Sarjan alkuaika, oletuksena ""
  *     "loppuaika": {String}, // Sarjan loppuaika, oletuksena ""
  *     "joukkueet": {Array}, // Taulukko sarjaan kuuluvista joukkueista. Oletuksena tyhjä taulukko []
  *  }
  * @param {Object} data - tietorakenne johon sarja lisätään 
  * @param {String} nimi - Lisättävän sarjan nimi
  * @param {String} kesto - Sarjan kesto merkkijonona
  * @param {String} alkuaika - Sarjan alkuaika, ei pakollinen
  * @param {String} loppuaika - Sarjan loppuaika, ei pakollinen
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaSarja(data, nimi, kesto, alkuaika, loppuaika) {

  // luodaan uusi uniikki id-numero
  let id = uusiId(data.sarjat);

  // luodaan nimi, tarkistetaan että uniikki
  let kaikkiKunnossa = onkoNimiSopiva(data.sarjat, nimi);

  // luodaan kesto tunteina, muunnetaan numeroksi ennen tallennusta
  if (kaikkiKunnossa) {
    kaikkiKunnossa = muuntuukoNumeroksi(kesto);
  }
  if (kaikkiKunnossa) {
    kaikkiKunnossa = (parseInt(kesto) >= 0);
  }

  // alku- ja loppuaika String-muodossa, oletus ""
  // nyt ei tarkistusta että tulee oikeanlaista sisältöä...
  let alku = alkuaika.trim();
  let loppu = loppuaika.trim();
  

  // luodaan tyhjä joukkuelista
  let joukkueet = [];

  // luodaan uusi objekti lisättäväksi
  if (kaikkiKunnossa) {
    let uusiSarja = {
      "id": id,
      "nimi": nimi,
      "kesto": parseInt(kesto),
      "alkuaika": alku,
      "loppuaika": loppu,
      "joukkueet": joukkueet
    };
    let sarjat = data.sarjat;
    sarjat.push(uusiSarja);
    jarjestaSarjat(data);
  }

  return data;
}


/**
 * Tarkistaa, voiko annetun merkkijonon muuntaa numeroksi.
 * @param {String} testattava 
 * @returns {Boolean} jos voi muuntaa kokonaisluvuksi, false jos ei
 */
function muuntuukoNumeroksi(testattava) {
  return /^-{0,1}\d+$/.test(testattava);
}

/**
  * Taso 1
  * Poistaa joukkueen id:n perusteella data-rakenteesta ja palauttaa muuttuneen datan
  * @param {Object} data - tietorakenne josta joukkue poistetaan
  * @param {String} id - poistettavan joukkueen id
  * @return {Object} palauttaa muuttuneen alkuperäisen datan
  */
function poistaJoukkue(data, id) {
  for (let i = 0; i < data.joukkueet.length; i++) {
    if (data.joukkueet[i].id === id) {
      console.log("föffölömöö");
      data.joukkueet.splice(i, 1);
      return data;
    }
  }
  return data;
}

/**
  * Taso 3
  * Järjestää rastit aakkosjärjestykseen rastikoodin perustella siten, että 
  * numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen. Alkuperäistä 
  * rakennetta ei saa muuttaa tai korvata vaan järjestäminen tehdään alkup. taulukon kopiolle.
  * isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukon kopio järjestetään 
  * @return {Array} palauttaa järjestetyn _kopion_ data.rastit-taulukosta
  */
function jarjestaRastit(data) {
  let rastit = Array.from(data.rastit);
  
  rastit = rastit.sort(vertaaRastienKoodeja);

  return rastit; // tässä pitää palauttaa järjestetty kopio
}

/**
 * Ottaa parametrikseen kaksi objektia taulukosta Rastit ja vertaa niitä keskenään.
 * Numeroilla alkavat rastit ovat kirjaimilla alkavien jälkeen.
 * Isoilla ja pienillä kirjaimilla ei ole järjestämisessä merkitystä.
 * @param {Object} a 
 * @param {Object} b 
 * @returns {Number} palauttaa -1 jos a tulee taulukkoon ensin, 1 jos b ja 0 jos sama nimi
 */
function vertaaRastienKoodeja(a, b) {
  
  // alkaako a numerolla
  if (alkaakoNumerolla(a.koodi)) {
    // alkaako myös b numerolla
    if (alkaakoNumerolla(b.koodi)) {
      if (a.koodi < b.koodi) {
        return -1;
      }
      if (b.koodi < a.koodi) {
        return 1;
      }
      return 0;
    }
    // a alkoi, b ei, joten b tulee ensin
    return 1;
  }

  // alkaako vain b numerolla
  if (alkaakoNumerolla(b.koodi)) {
    return -1;
  }

  if (a.koodi < b.koodi) {
    return -1;
  }
  if (b.koodi < a.koodi) {
    return 1;
  }
  return 0;
}


/**
 * Ottaa parametrikseen yhden String:n ja tarkistaa, alkaako numerolla.
 * @param {String} testattava
 * @returns {Boolean} true jos String alkaa numerolla, false jos ei
 */
function alkaakoNumerolla(testattava) {
  return /^\d/.test(testattava);
}


/**
  * Taso 3
  * Lisää joukkueen data-rakenteeseen ja palauttaa muuttuneen datan
  * Joukkue lisätään vain jos kaikki seuraavat ehdot täyttyvät:
  *  - Toista samannimistä joukkuetta ei ole olemassa. Nimien vertailussa
  *    ei huomioida isoja ja pieniä kirjaimia tai nimen alussa ja lopussa välilyöntejä etc. (whitespace)
  *    Joukkueen nimi ei voi olla pelkkää whitespacea. 
  *  - Leimaustapoja on annettava vähintään yksi kappale. Leimaustapojen
  *     on löydyttävä data.leimaustavat-taulukosta
  *  - Jäseniä on annettava vähintään kaksi kappaletta. 
  *  - Saman joukkueen jäsenillä ei saa olla kahta samaa nimeä
  *  - Sarjan id on löydyttävä data.sarjat-taulukon sarjoista
  *
  *  Uusi joukkue tallennetaan data.joukkueet-taulukkoon. Joukkueen on oltava seuraavaa muotoa:
  *  {
  *     "id": {Number}, // jokaisella joukkueella oleva uniikki kokonaislukutunniste
  *     "nimi": {String}, // Joukkueen uniikki nimi
  *     "jasenet": {Array}, // taulukko joukkueen jäsenien nimistä
  *     "leimaustapa": {Array}, // taulukko joukkueen leimaustapojen indekseistä (data.leimaustavat)
  *     "rastileimaukset": {Array}, // taulukko joukkueen rastileimauksista. Oletuksena tyhjä eli []
  *     "sarja": {Object}, // viite joukkueen sarjaan, joka löytyy data.sarjat-taulukosta
  *     "pisteet": {Number}, // joukkueen pistemäärä, oletuksena 0
  *     "matka": {Number}, // joukkueen kulkema matka, oletuksena 0
  *     "aika": {String}, // joukkueen käyttämä aika "h:min:s", oletuksena "00:00:00"
  *  }
  * @param {Object} data - tietorakenne johon joukkue lisätään 
  * @param {String} nimi - Lisättävän joukkueen nimi
  * @param {Array} leimaustavat - Taulukko leimaustavoista
  * @param {String} sarja - Joukkueen sarjan id-tunniste
  * @param {Array} jasenet - joukkueen jäsenet
  * @return {Object} palauttaa muutetun alkuperäisen data-tietorakenteen
  */
function lisaaJoukkue(data, nimi, leimaustavat, sarja, jasenet) {
  let kaikkiKunnossa = true;

  // luodaan uusi joukkue ja sille indeksi
  let uusi = {
    "id": uusiId(data.joukkueet)
  };

  // tarkistetaan, että nimi on sopiva
  // jos on niin lisätään se joukkueeseen
  kaikkiKunnossa = onkoNimiSopiva(data.joukkueet, nimi);
  if (kaikkiKunnossa) {
    uusi.nimi = nimi;
  }

  // tarkistetaan, että leimaustavat ovat sopivat ja tallennetaan niiden indeksit taulukkoon
  if (kaikkiKunnossa) {
    let vastaus = onkoLeimaustavatSopivat(data.leimaustavat, leimaustavat);
    kaikkiKunnossa = vastaus.onko;
    if (kaikkiKunnossa) {
      uusi.leimaustapa = vastaus.indeksit;
    }
  }

  // tarkistetaan onko jäsenien listassa jäsenet sopivia
  if (kaikkiKunnossa) {
    kaikkiKunnossa = onkoJasenetSopivat(jasenet);
    uusi.jasenet = jasenet;
  }

  // tarkistetaan että annettu sarjan id löytyy data.sarjasta ja luodaan viitesarjaan
  if (kaikkiKunnossa) {
    let tarkistettu = loytyykoId(data.sarjat, sarja);
    kaikkiKunnossa = tarkistettu.loytyikoId;
    if (tarkistettu.loytyikoId) {
      uusi.sarja = tarkistettu.viiteSarjaan;
    }
  }

  // jos kaikki on edelleen kunnossa, lisätään loput tiedot ja lisätään alkuperäiseen dataan
  if (kaikkiKunnossa) {
    uusi.rastileimaukset = [];
    uusi.pisteet = 0;
    uusi.matka = 0;
    uusi.aika = "00:00:00";

    data.joukkueet.push(uusi);
  }

  // palautetaan data
  return data;
}

/**
 * Tarkistaa, onko nimi sopiva:
 * nimi on uniikki huomioimatta isoja ja pieniä kirjaimia ("kissa" ja "Kissa" eivät molemmat käy)
 * nimi ei ole tyhjä (pelkkää whitespacea)
 * @param {Array} taulukko jossa alkioita, joilla kenttä nimi
 * @param {String} nimi 
 * @returns {Boolean} true, jos uniikki sopiva nimi, false jos tyhjä tai nimi on jo
 */
function onkoNimiSopiva(taulukko, nimi) {
    // onko tyhjä nimi?
    nimi = nimi.trim().toLowerCase();
    if (nimi.length < 1) {
      return false;
    }
  
    // onko uniikki?
    for (let alkio of taulukko) {
      if (alkio.nimi.toLowerCase() === nimi) {
        return false;
      }
    }
    return true;
}

/**
 * Tarkistaa jäsenlistan:
 * - vähintään 2 jäsentä
 * - jäsenet ovat erinimisiä
 * - jäsenen nimen täytyy olla sopiva
 * @param {Array} jasenet 
 * @returns {Boolean} true, jos jäseniä 2 tai enemmän eikä samannimisiä
 */
function onkoJasenetSopivat(jasenet) {

  // poistetaan tyhjällä nimellä olevat jäsenet
  poistaTyhjat(jasenet);

  // onko vähintään 2 jäsentä
  if (jasenet.length < 2) {
    return false;
  }

  // onko joukkueen jäsenet keskenään erinimiset
  for (let i = 0; i < (jasenet.length-1); i++) {
    for (let j = i + 1; j < jasenet.length; j++) {
      if (jasenet[i] == jasenet[j]) { // nyt "Kissa" ja "kissa" on eri nimet
        return false;
      }
    }
  }

  return true;
}

/**
 * Poistaa taulukosta tyhjät arvot alkuperäisestä taulukosta
 * @param {Array} taulukko jossa String:ejä
 */
function poistaTyhjat(taulukko) {
  // etsitään tyhjien indeksit
  let poistettavat = [];
  for (let i = 0; i < taulukko.length; i++) {
    if (taulukko[i].trim().length == 0) {
      poistettavat.push(i);
    }
  }

  // poistetaan indeksit
  for (let poistettava of poistettavat) {
    taulukko.splice(poistettava, poistettava);
  }
}

/**
 * Tarkistaa että leimaustapa-taulukossa on vähintään yksi leimaustapa.
 * Leimaustavat löytyvät data.leimaustavat-taulukosta.
 * Tallentaa löytyneiden leimaustapojen indeksit annettuun taulukkoon.
 * @param {Array} leimaustavat jossa täytyy alemman taulukon alkiot löytyä
 * @param {Array} annetutTaulukkona jonka alkiot täytyy löytyä leimaustavoista
 * @param {Array} leimaustapojenIndeksit johon lisätään kaikki löydetyt indekseinä
 * @returns {Object} vastaus.onko jossa true jos on sopivat ja vastaus.indeksit taulukko, jossa haettujen indeksit
 */
function onkoLeimaustavatSopivat(leimaustavat, annetutTaulukkona) {

  // luodaan vastausobjekti
  let vastaus = {
    "onko": false,
    "indeksit": []
  };

  // tyhjä taulukko ei käy
  if (annetutTaulukkona.length === 0) {
    return vastaus;
  }



  // tarkistaa, onko kaikki taulukon leimaustavat datan leimaustavoissa
  for (let tapa of annetutTaulukkona) {
    let loytyiko = false;

    for (let i = 0; i < leimaustavat.length; i++) {
      if (tapa === leimaustavat[i]) {
        loytyiko = true;
        vastaus.indeksit.push(i);
        break;
      }
    }

    if (!loytyiko) {
      return vastaus;
    }
  }

  vastaus.onko = true;
  return vastaus;
}

/**
 * Tutkii, löytyykö id annetusta taulukosta
 * alkio.id voi olla numero tai string
 * @param {Array} taulukko jonka alkioilla on tunniste "id"
 * @param {String} id
 * @return {Boolean} true, jos id löytyy taulukosta
 */
function loytyykoId(taulukko, id) {
  let tarkistettu = {
    "loytyikoId": false
  };

  for (let alkio of taulukko) {
    if (alkio.id == id) {
      tarkistettu.loytyikoId = true;
      tarkistettu.viiteSarjaan = alkio;
      return tarkistettu;
    }
  }
  return tarkistettu;
}

/**
 * Tarkistaa taulukon alkioista sen hetken suurimman id:n,
 * ottaa sen talteen ja suurentaa yhdellä.
 * Palauttaa keksityn luvun.
 * @param {Array} taulukko jonka alkioilla on "id"
 * @returns {Number} uusi id
 */
function uusiId(taulukko) {
  let suurin = 0;
  for (let alkio of taulukko) {
    let id = alkio.id;
    if (id > suurin) { // pitäisikö olla tarkistus, onko nro vai ei?
      suurin = id;
    }
  }
  suurin += 1;
  return suurin;
}

/**
  * Taso 3
  * Laskee joukkueen käyttämän ajan. Tulos tallennetaan joukkue.aika-ominaisuuteen.
  * Käytä merkkijonoa, jossa aika on muodossa "hh:mm:ss". Esim. "07:30:35"
  * Aika lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeAika(joukkue) {
  if (joukkue.rastileimaukset.length == 0) {
    return joukkue;
  }
  // etsitään joukkue.rastileimauksista LAHTO ja sen aika
  let alku = etsiAika(joukkue.rastileimaukset, "LAHTO");

  // etsitään joukkue.rastileimauksista MAALI ja sen aika
  let loppu = etsiAika(joukkue.rastileimaukset, "MAALI");

  // lasketaan erotus ja laitetaan paikalleen String-muodossa
  joukkue.aika = aikojenErotus(alku, loppu);

  if (joukkue.aika == "00:00:00") {
    joukkue.aika = "";
  }
  return joukkue;
}

/**
 * Etsii koodinimen perusteella leimausajan ja palauttaa sen
 * @param {Array} rastileimaukset, josta etsitään leimaus, jossa etsittävä koodi 
 * @param {String} etsittava koodi jota etsitään
 * @return {String} etsitty kellonaika "vvvv-kk-pp hh:mm:ss"-muodossa tai tyhjän merkkijonon
 */
function etsiAika(rastileimaukset, etsittava) {

  for (let leimaus of rastileimaukset) {
    if (leimaus.rasti !== undefined && (leimaus.rasti).koodi === etsittava) {
      return leimaus.aika;
    }
  }

  return "";
}

/**
 * Laskee "vvvv-kk-pp hh:mm:ss"-merkkijonomuodossa olevan alku- ja loppuajan erotuksen
 * @param {String} alku 
 * @param {String} loppu 
 * @returns {String} palauttaa merkkijonon, jossa kerrottu aika "hh:mm:ss"-muodossa tai "00:00:00" jos virhe
 */
function aikojenErotus(alku, loppu) {
  let erotus = "";
  // tarkistetaan että alku ja loppu sopivaa muotoa tai ainakin sopivan kokoinen...
  if (alku.length != 19 || loppu.length != 19) {
    return erotus;
  }

  // tarkistetaan että alku on ennen loppua
  if (alku >= loppu) {       // tarkista että toimii oikein!
    return erotus;
  }

  if (alku === loppu) {
    return erotus;
  }

  // muodostetaan jokaisesta osasta int-muotoiset vastineet, joilla lasketaan
  // oletuksena toistaiseksi että jokainen on oikeassa muodossa...
  let alun = [
    parseInt(alku.substring(0,4)),   // vuosi
    parseInt(alku.substring(5,7)),   // kk
    parseInt(alku.substring(8,10)),  // pv
    parseInt(alku.substring(11,13)), // tunnit
    parseInt(alku.substring(14,16)), // minuutit
    parseInt(alku.substring(17)),    // sekunnit
  ];

  let lopun = [
    parseInt(loppu.substring(0,4)),   // vuosi
    parseInt(loppu.substring(5,7)),   // kk
    parseInt(loppu.substring(8,10)),  // pv
    parseInt(loppu.substring(11,13)), // tunnit
    parseInt(loppu.substring(14,16)), // minuutit
    parseInt(loppu.substring(17)),    // sekunnit
  ];

  // lasketaan kellonaikojen erotus
  let vahennetty = [];

  for (let i = 0; i < alun.length; i++) {
    vahennetty[i] = lopun[i] - alun[i];
  }

  erotus = teeAjaksi(vahennetty);

  // palautetaan merkkijono, jossa kerrottu aika "hh:mm:ss"-muodossa
  return erotus;
}

/**
 * Käy läpi vähennetyn osat:
 * indeksissä 0 = vuosi, 1 = kk, 2 = pv
 * indeksissä 3 = tunnit, 4 = minuutit, 5 = sekunnit
 * Palauttaa näistä muodostetun ajan
 * @param {Array} vahennetty lista int-muodossa
 * @return {String} "hh:mm:ss" -muodossa aika
 */
function teeAjaksi(vahennetty) {
  for (let i = vahennetty.length - 1; i > 0; i--) {
    if (vahennetty[i] < 0) {
      vahennetty[i-1] = vahennetty[i-1]-1;
      if (i == 5 || i == 4) {
        vahennetty[i] = 60 + vahennetty[i];
      }
      else if (i == 3) {
        vahennetty[i] = 24 - vahennetty[i];
      }
    }
  }

  let osat = {
    tunnit: String(vahennetty[3]).padStart(2,"0"),
    minuutit: String(vahennetty[4]).padStart(2,"0"),
    sekunnit: String(vahennetty[5]).padStart(2,"0")
  };
  return osat.tunnit + ":" + osat.minuutit + ":" + osat.sekunnit;
}

/**
  * Taso 3 ja Taso 5
  *  Järjestää joukkueet järjestykseen haluttujen tietojen perusteella
  *  järjestetään ensisijaisesti kasvavaan aakkosjärjestykseen 
  *  Järjestäminen on tehtävä alkuperäisen taulukon kopiolle.
  *  Alkuperäistä ei saa muuttaa tai korvata.
  *  mainsort-parametrin mukaisen tiedon perusteella.
  *  mainsort voi olla nimi, sarja, matka, aika tai pisteet
  *  Joukkueen jäsenet järjestetään aina aakkosjärjestykseen.
  *  Alkuperäisen joukkueobjektin jäsenten järjestys ei saa muuttaa.
  *  Joukkueen leimaustavat järjestetään myös aina aakkosjärjestykseen leimaustapojen nimien mukaan
  *  Isoilla ja pienillä kirjaimilla ei ole missään järjestämisissä
  *  merkitystä eikä myöskään alussa tai lopussa olevalla whitespacella
  *  sortorder-parametrin käsittely vain tasolla 5
  *  jos sortorder-parametrina on muuta kuin tyhjä taulukko, käytetään 
  *  sortorderin ilmoittamaa järjestystä eikä huomioida mainsort-parametria: 
  *  ensisijaisesti järjestetään taulukon ensimmäisen alkion tietojen perusteella, 
  *  toissijaisesti toisen jne.
  *  sortorder-taulukko sisältää objekteja, joissa kerrotaan järjestysehdon nimi (key),
  *  järjestyssuunta (1 = nouseva, -1 = laskeva) ja järjestetäänkö numeerisesti (true)
  *  vai aakkosjärjestykseen (false)
  *  Toteuta sortorder-taulukon käsittely siten, että taulukossa voi olla vaihteleva määrä rivejä
  *  Sarja täytyy huomioida erikoistapauksena
  *	 sortorder = [
  *	 {"key": "sarja", "order": 1, "numeric": false},
  *	 {"key": "nimi", "order": 1, "numeric": false},
  *	 {"key": "matka", "order": -1, "numeric": true},
  *	 {"key": "aika", "order": 1, "numeric": false},
  *	 {"key": "pisteet", "order": -1, "numeric": true}
  *	]
  * @param {Object} data - tietorakenne, jonka data.rastit-taulukko järjestetään 
  * @param {String} mainsort - ensimmäinen (ainoa) järjestysehto, joka voi olla nimi, sarja, matka, aika tai pisteet  TASO 3
  * @param {Array} sortorder - mahdollinen useampi järjestysehto TASO 5
  * @return {Array} palauttaa järjestetyn ja täydennetyn _kopion_ data.joukkueet-taulukosta
  */
function jarjestaJoukkueet(data, mainsort="nimi", sortorder=[] ) {
/*   let joukkueet = Array.from(data.joukkueet); */
  let joukkueet = Array.from(data.joukkueet, function(obj) {   // deep copy, jottei muuta järjestyksiä alkuperäisessä...
    return {
      "aika": obj.aika,
      "id": obj.id,
      "jasenet": Array.from(obj.jasenet),
      "leimaustapa": Array.from(obj.leimaustapa),
      "matka": obj.matka,
      "nimi": obj.nimi,
      "pisteet": obj.pisteet,
      "rastileimaukset": obj.rastileimaukset,
      "sarja": obj.sarja
    };
  });

  if (mainsort === "nimi") {
    joukkueet = joukkueet.sort(vertaaNimea);
  }
  if (mainsort === "sarja") {
    joukkueet = joukkueet.sort((a, b) => 
      vertaaMerkkijonoja(a.sarja.nimi,b.sarja.nimi));
  }
  if (mainsort === "matka") {
    joukkueet = joukkueet.sort((a,b) => a.matka - b.matka);
  }
  if (mainsort === "aika") {
    joukkueet = joukkueet.sort((a,b) => vertaaAikaa(a.aika, b.aika));
  }
  if (mainsort === "pisteet") {
    joukkueet = joukkueet.sort((a,b) => a.pisteet - b.pisteet);
  }


  // järjestetään joukkueen jäsenet nimen perusteella järjestykseen
  for (let joukkue of joukkueet) {
    let leimaustavat = Array.from(data.leimaustavat);
    joukkue.jasenet = joukkue.jasenet.sort(vertaaMerkkijonoja);
    joukkue.leimaustapa = jarjestaLeimaustavatJEE(joukkue.leimaustapa, leimaustavat);

  }

  console.log(joukkueet);
  return joukkueet;
}

function jarjestaLeimaustavatJEE(indeksilista, leimaustapanimilista) {
  let jarjestetty = indeksilista.sort((a,b) =>
    vertaaMerkkijonoja(leimaustapanimilista[a], leimaustapanimilista[b]));
  return jarjestetty;
}

/**
 * Vertaa kahden objektin objekti.nimi tietoja keskenään siten ettei aakkosten koolla ole väliä
 * @param {Object} a 
 * @param {Object} b 
 * @returns -1 jos a tulee ensin, 1 jos b tulee ensin ja 0 jos samat
 */
function vertaaNimea(a, b) {
  return vertaaMerkkijonoja(a.nimi, b.nimi);
}

/**
 * Vertaa kahden objektin merkkijonon tietoja keskenään siten ettei aakkosten koolla ole väliä
 * @param {String} a 
 * @param {String} b 
 * @returns -1 jos a tulee ensin, 1 jos b tulee ensin ja 0 jos samat
 */
function vertaaMerkkijonoja(a, b) {
  let verrattavaA = a.toUpperCase().trim();
  let verrattavaB = b.toUpperCase().trim();
  if (verrattavaA < verrattavaB) {
    return -1;
  }
  if (verrattavaB < verrattavaA) {
    return 1;
  }
  return 0;
}

/**
 * Käy läpi a:n ja b:n:
 * ensin vertaa tunnit, jos ne samat niin
 * vertaa minuutit, jos nekin samat niin 
 * vertaa sekunnit
 * @param {String} a 
 * @param {String} b 
 * @returns -1 jos a on pienempi, 1 jos b on pienempi ja 0 jos samat
 */
function vertaaAikaa(a, b) {
  let an = {
    tunnit: parseInt(a.substring(0,2)),
    minuutit: parseInt(a.substring(3,5)),
    sekunnit: parseInt(a.substring(6))
  };
  let bn = {
    tunnit: parseInt(b.substring(0,2)),
    minuutit: parseInt(b.substring(3,5)),
    sekunnit: parseInt(b.substring(6))
  };
  if (an.tunnit < bn.tunnit) {
    return -1;
  }
  else if (bn.tunnit < an.tunnit) {
    return 1;
  }
  if (an.minuutit < bn.minuutit) {
    return -1;
  }
  else if (bn.minuutit < an.minuutit) {
    return 1;
  }
  if (an.sekunnit < bn.sekunnit) {
    return -1;
  }
  else if (bn.sekunnit < an.sekunnit) {
    return 1;
  }
  return 0;
}

/**
  * Taso 5
  * Laskee joukkueen kulkeman matkan. Matka tallennetaan joukkue.matka-ominaisuuteen liukulukuna
  * Laske kuinka pitkän matkan kukin joukkue on kulkenut eli laske kunkin rastivälin
  * pituus ja laske yhteen kunkin joukkueen kulkemat rastivälit. Jos rastille ei löydy
  * sijaintitietoa (lat ja lon), niin kyseistä rastia ei lasketa matkaan mukaan. Matka
  * lasketaan viimeisestä LAHTO-rastilla tehdystä leimauksesta alkaen aina
  * ensimmäiseen MAALI-rastilla tehtyyn leimaukseen asti. Leimauksia jotka tehdään
  * ennen lähtöleimausta tai maalileimauksen jälkeen ei huomioida.
  * Käytä annettua apufunktiota getDistanceFromLatLonInKm
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskeMatka(joukkue) {
  return joukkue;
}

/**
  * Taso 5
  * Laskee joukkueen saamat pisteet. Pistemäärä tallennetaan joukkue.pisteet-ominaisuuteen
  * Joukkue saa kustakin rastista pisteitä rastin koodin ensimmäisen merkin
  * verran. Jos rastin koodi on 9A, niin joukkue saa yhdeksän (9) pistettä. Jos rastin
  * koodin ensimmäinen merkki ei ole kokonaisluku, niin kyseisestä rastista saa nolla
  * (0) pistettä. Esim. rasteista LÄHTÖ ja F saa 0 pistettä.
  * Samasta rastista voi sama joukkue saada pisteitä vain yhden kerran. Jos
  * joukkue on leimannut saman rastin useampaan kertaan lasketaan kyseinen rasti
  * mukaan pisteisiin vain yhden kerran.
  * Rastileimauksia, jotka tehdään ennen lähtöleimausta tai maalileimauksen jälkeen, ei
  * huomioida.
  * Maalileimausta ei huomioida kuin vasta lähtöleimauksen jälkeen.
  * Jos joukkueella on useampi lähtöleimaus, niin pisteet lasketaan vasta
  * viimeisen lähtöleimauksen jälkeisistä rastileimauksista.
  * Joukkue, jolla ei ole ollenkaan rastileimauksia, saa 0 pistettä
  * @param {Object} joukkue
  * @return {Object} joukkue
  */
function laskePisteet(joukkue) {
  return joukkue;
}



// apufunktioita tasolle 5
/**
  * Laskee kahden pisteen välisen etäisyyden
  */
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(lat2-lat1);  // deg2rad below
  let dLon = deg2rad(lon2-lon1);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}
/**
   Muuntaa asteet radiaaneiksi
  */
function deg2rad(deg) {
  return deg * (Math.PI/180);
}

