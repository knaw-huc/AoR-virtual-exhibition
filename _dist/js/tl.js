

var timelineStartDate = 500;
var timelineEndDate = 1500;
var timelineMarkerUnit = 100;
var timelineMargin = 100;
var markerHeight = 10;

var tlColor = 'rgba(0, 0, 0, 0.4)';
var tlStrokeWidth = 0.5;
var tlTxtDistance = 40;
var tlItemHeight = 20;
var tlItemGutter = 2;

var timelineDataAor = {
  "timelineItems": [
    {
        "shelfmark": "Arundel MS 348",
        "title": "Marcus Tullius Cicero, De Inventione; Pseudo-Cicero, Rhetorica ad Herennium; Thierry of Chartres, Commentary on Cicero's De Inventione; Boethius, Commentary on Aristotle's De Interpretatione",
        "date-s1": 1100,
        "date-s2": 1200,
        "date-e1": "",
        "date-e2": "",
        "origin": "Southern France",
        "location": "London",
        "material": "Parchment",
        "dimensions": "210 x 125 mm",
        "foliation": "f. 1 + ff. 276 + f.1",
        "contents": "ff. 1r-51v: Marcus Tullius Cicero, De Inventione (On Invention). ff. 51v-101v: Pseudo-Cicero, Rhetorica ad Herennium (The Rhetoric to Herennius). ff. 102r-179v: Thierry of Chartres, Commentary on Cicero's De Inventione, ending imperfect. ff. 180r-276v: Boethius, Commentary on Aristotle's De Interpretatione (About Interpretation)",
        "codicologicalUnits": "This is a composite manuscript made up of three originally separate parts (ff. 1-101v; 102r-179v; 180r-276v)",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "Burney 275",
        "title": "Scholastic Miscellany",
        "date-s1": 1309,
        "date-s2": 1316,
        "date-e1": "",
        "date-e2": "",
        "origin": "Paris",
        "library": "British Library",
        "location": "London",
        "material": "Parchment",
        "dimensions": "405 x 290 mm",
        "foliation": "ff.561",
        "contents": "Priscian, Cicero, and Pseudo-Cicero, Institutiones, De inventione, Rhetorica ad Herennium; Boethius, Aristotle, Euclid, and others, Boethius's translation of Aristotle's Priora and Posteriora Analytica and other works; De musica; Elementa (in the translation attributed to Adelard of Bath), and other texts; Ptolemy, translated by Gerard of Cremona, Almagest (ff. 390v-560v)",
        "script": "Gothic",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "Codex MS 315(605)",
        "title": "Boethius, Isagoge",
        "date-s1": 900,
        "date-s2": 1000,
        "date-e1": "",
        "date-e2": "",
        "origin": "Einsiedeln",
        "library": "Stiftsbibliothek",
        "location": "Einsiedeln",
        "material": "Parchment",
        "dimensions": "220 x 160 mm",
        "foliation": "170 pp",
        "contents": "Boethius, Isagoge",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "Cod. Sang. 251",
        "title": "Assorted works of natural history by the Venerable Bede",
        "date-s1": 800,
        "date-s2": 900,
        "date-e1": "",
        "date-e2": "",
        "origin": "St. Gall",
        "library": "Stiftsbibliothek",
        "location": "St. Gallen",
        "material": "Parchment",
        "dimensions": "365 x 260 mm",
        "foliation": "186 pp",
        "contents": "Copies of assorted works of natural history by the Venerable Bede (De natura rerum; De temporum ratione; the closing portion of De temporibus), produced as early as the 9th century in the Cloister of St. Gall. In addition, this codex contains, among other items, computistic and calendar texts and tables, and at the end, schematic diagrams of the organization of the scientific disciplines as well as quill tests.",
        "language": "Latin, German",
        "type": "manuscript"
    },
    {
        "shelfmark": "St. Peter perg. 92",
        "title": "Breviculum ex artibus Raimundi Lulli electum",
        "date-s1": 1321,
        "date-s2": "",
        "date-e1": "",
        "date-e2": "",
        "origin": "Northern France",
        "library": "Badische Landesbibliothek",
        "location": "Karlsruhe",
        "material": "Parchment",
        "dimensions": "345 x 280 mm",
        "foliation": "45 pp",
        "contents": "Miniatures about the life of Raymundus Llullu (1v), Breviculum ex Artibus Raimundi electum (13v), Raimundus Lullus Ars Brevis (40r)",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 25",
        "title": "Libri Missalis fragmenta. – Boethii in Aristotelem de Interpretatione Commentarius. – L. Apuleius Madaurensis de Interpretatione",
        "date-s1": 900,
        "date-s2": 1000,
        "date-e1": "",
        "date-e2": "",
        "origin": "Southern Netherlands",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "325 x 225 mm",
        "foliation": "43 ff",
        "contents": "Commentary on Aristotle's De interpretatione (Peri hermeneias) / Boethius (f.2r-38r) and De interpretatione / Apuleius (?) (f.38r-41v)",
        "script": "littera carolina",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 84",
        "title": "Severini Boethii Opera. – Alcuinus de Dialectica",
        "date-s1": 1000,
        "date-s2": 1100,
        "date-e1": "",
        "date-e2": "",
        "origin": "Italy?",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "264 x 152 mm",
        "foliation": "103 ff",
        "contents": "De divisione / Boethius (f.1r-8v) De definitione / pseudo-Boethius (f.9r-16v), De syllogismo hypothetico / Boethius (f.17-44v) De syllogismo categorico / Boethius (f.45r-67r) Antepraedicamenta / Boethius (f.67v-89v) De dialectica / Alcuin of York (f.90r-103v)",
        "script": "littera carolina",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 88",
        "title": "de Martiano Capella et de Alphabeto graeco. - Martianus Capella de Nuptiis Philologiae et Mercurii. - Tractatus theologici fragmentum",
        "date-s1": 800,
        "date-s2": 900,
        "date-e1": "",
        "date-e2": "",
        "origin": "Reims",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "255 x 232 mm",
        "foliation": "182 ff",
        "contents": "De nuptiis Philologiae et Mercurii (Books I-VIII) / Martianus Capella (ff. 1-167) De nuptiis Philologiae et Mercurii (Book IX) / Martianus Capella (ff.168-181) Theological treatise (f. 182)",
        "codicologicalUnits": "Composite Manuscript made up of three parts (ff. 1-167; 168-181;182)",
        "script": "littera carolina, littera cursiva,",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 139B",
        "title": "De syllogismis categoricis and other text(s)",
        "date-s1": 975,
        "date-s2": 1025,
        "date-e1": "",
        "date-e2": "",
        "origin": "Fleury",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "ca. 222 x 174 mm",
        "foliation": "46 ff",
        "contents": "De syllogismis categoricis (ff. 1-30) / Abbo of Fleury - Peri hermeneias (ff. 30 and 32-39)/ Apuleius (?) - Isagoge in Categorias Aristotelis / Porphyrius (ff. 40-46)",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 144",
        "title": "De consolatione philosophiae and other text(s)",
        "date-s1": 1150,
        "date-s2": 1200,
        "date-e1": "",
        "date-e2": "",
        "origin": "Netherlands",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "227 x 155 mm",
        "foliation": "94 ff",
        "contents": "De consolatione philosophiae / Boethius (ff.1r-52r), De nuptiis Philologiae et Mercurii (Books I-II) / Martianus Capella (ff. 52v-84v), De nuptiis Philologiae et Mercurii (Book VIII, chs. 814-887) / Martianus Capella (ff. 85v-93v), Commentary on Cicero's Somnium Scipionis / Macrobius (f.94)",
        "codicologicalUnits": "Composite Manuscript made up of two parts (ff. 1-93v, f.94)",
        "script": "littera textualis,",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BPL 1925",
        "title": "Ilias Latina and other text(s). 12th and 13th centuries",
        "date-s1": 1100,
        "date-s2": 1300,
        "date-e1": "",
        "date-e2": "",
        "origin": "France",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "ca. 140 x 100 mm",
        "foliation": "175 ff",
        "contents": "Ilias Latina / Homer (adaptation by Beabius Italicus). 12th century (f.1r-10v), Letters / Ivo of Chartres. 12th and/or 13th century (f.11r-94v), Excerpts from papal bulls and decretals. 12th century (f.94v-96v), Satyrae / Aulus Persius Flaccus. 12th century (f.97r-104r), l' Art des amours / Ovid, Jakes d'Amiens. second half 13th century (f.105r-111r), Noctes Atticae / Aulus Gellius. 12th century (f.111r-117r), Isagoge in Categorias Aristotelis / Porphyrius. 12th century (f.121r-128v), De interpretatione / Aristotle. 12th century (f.128v-138v), Categoriae / Aristotle. 12th century (f.139-153), De differentiis topicis / Boethius. 12th century (f.153r-175v)",
        "script": "littera carolina, littera prae-gothica",
        "language": "Latin, French",
        "type": "manuscript"
    },
    {
        "shelfmark": "GRO 22",
        "title": "De inventione and other text(s)",
        "date-s1": 1100,
        "date-s2": 1150,
        "date-e1": "",
        "date-e2": "",
        "origin": "France",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "224 x 149 mm",
        "foliation": "112 ff",
        "contents": "De inventione / Cicero (f.1r-50v), Letter to Aristotle / pseudo-Alexander the Great (f.50v-58v), Rhetorica ad Herennium / pseudo-Cicero (f.59r-112v)",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "VLF 48",
        "title": "Martianus Capella, De nuptiis and other texts",
        "date-s1": 840,
        "date-s2": "",
        "date-e1": "",
        "date-e2": "",
        "origin": "Auxerre",
        "library": "Universiteitsbibliotheek Leiden",
        "location": "Leiden",
        "material": "Parchment",
        "dimensions": "307 x 250 mm",
        "foliation": "95 ff",
        "contents": "Sermon / Ratherius of Verona (f.1-r),De nuptiis Philologiae et Mercurii / Martianus Capella (f.2r-91v), De duodecim abusivis saeculi (introduction) / pseudo-Cyprian of Carthage (f.92v), Commentary on the Canticles of Deborah (Jud 5,1) / pseudo-Jerome (f.93r-94v),Treatise on lent (f.94v-95r), Hebrew names of the months (f.95r), Note on chronology (f.95r),",
        "script": "littera carolina,",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 11127",
        "title": "Commentarium Boetii in periermenias librum Aristotelis – S. X",
        "date-s1": 900,
        "date-s2": 1000,
        "date-e1": "",
        "date-e2": "",
        "origin": "Echternach?",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "dimensions": "245 x 170 mm",
        "foliation": "215 ff",
        "contents": "\"Comment. Boetii in periermenias librum Aristotelis. Liber periermenias Apuleii (f.53). Oratio Ciceronis in Salustium (f.58v). Oratio Salustii in Ciceronem (f.61r). Controversia Deoderici, Metensis episcopi, in Karolum (f.62r); Gerbertus ex persona Karoli (f.62v). Boetii liber divisionis (f.64v). Liber ejusdem de topicis differentiis (f.74r). Communis speculatio de rethoricae cognatione (f.101r). [Boetii introductio ad categoricos syllogismos] (f.105r). Boetii libri tres de hypotheticis syllogismis (f.145v). Liber Igini [de imaginibus coeli] (f.170v). Epistola Alexandri regis ad Aristotelem, etc. (f.201r). Verba Dandami, brachmanorum summi (f.209r). Commonitorium Pallidii [ad Karolum Magnum]\" (f.215r).",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 12949",
        "title": "Aristotelis periermeniae and other texts",
        "date-s1": 900,
        "date-s2": "",
        "date-e1": "",
        "date-e2": "",
        "origin": "N. France",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "dimensions": "280 x 230 mm",
        "foliation": "81 ff.",
        "contents": "Aristotelis periermeniae. Augustini dialectica (f.12r). Prologus Alchuini ad Karolum super cathegorias Augustini (f.24r.). Categoriae Aristotelis, ab Augustino de graeco in latinum mutatae (f.24r). Notes et fragments, parmi lesquels une note sur le sens du mot Cerauna (f.39r), des tables de comput (f.41r), dont l'une faite en 896 par frater Johannis Scotti Aldelmus (f.42r), des règles sur la grosseur des tuyaux sonores (f.43r). Ysagogae Porphyrii (f.46r). Boetii libri de Trinitate (f.53r), ad Johannem diaconum (f.57v), adversus Nestorium (f.62v). Apuleii periermeniae (f.71r), cum Boetii commentariis (f.80v).",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 13386",
        "title": "Tractatus Peregrini [Vincentii Lirin.] contra hereticos. And other texts",
        "date-s1": 700,
        "date-s2": 900,
        "date-e1": "",
        "date-e2": "",
        "origin": "Northern France",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "dimensions": "190 x 150 mm",
        "foliation": "219 ff.",
        "contents": "Tractatus Peregrini [Vincentii Lirin.] contra hereticos (f.1r) Epistulae Pascalis Theophili episcopi (f.42v). Epistula Epyfanii (f.98r). Epistula S. Hieronimi (f.98v). Homilia S. Augustini (f.100v). Johannis [Scoti] liber de praedestinatione (f.103r). Prisciani solutiones eorum de quibus dubitavit Chosroes (f.160r). Libellus sacerdotalis quem Lios monocus heroico metro composuit (f.208r).",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 14614",
        "title": "Petrus Abaelardus, Dialectica and other texts",
        "date-s1": 1100,
        "date-s2": 1400,
        "date-e1": "",
        "date-e2": "",
        "origin": "Paris",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "foliation": "204 ff",
        "contents": "Clemens IV (pape ; 1200?-1268). Auteur de lettres, \n Copia plurimum litterarum quorumdam paparum, principaliterClementis IV ; Petrus Abaelardus, Dialectica",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 16598",
        "title": "Porphyrius and other texts",
        "date-s1": 1200,
        "date-s2": 1300,
        "date-e1": "",
        "date-e2": "",
        "origin": "France",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "foliation": "98 ff",
        "contents": "Porphyrius. (f.1r), Sex principia (f.11). Ciceronis logica, (f.20). Joh. Damasceni logica (f.34). Augustini dialectica (f.60). Augustini categorie, cum prologo Alcuini (f.70v).",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 17806",
        "title": "Aristoteles, Praedicamenta and other texts",
        "date-s1": 1250,
        "date-s2": 1275,
        "date-e1": "",
        "date-e2": "",
        "origin": "England, perhaps Oxford",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "foliation": "259 ff",
        "contents": "Aristoteles, Praedicamenta (f.1r-4r), Periermenias (f.4v-15r). - Liber sex principium (f.15v-f.23v). - Boethius, De divisione (f.24-f.35v), Topica (f.36-f.68v). Aristoteles, De sophisticis elenchis (f.69-f.92v), Topica (f.93-f.164), Analytica priora (f.164v-f.217v), Analytica posteriora (f.218-f.249v), Praedicamenta (f.250-f.259v).",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 2788",
        "title": "Boethius, opuscula sacra and other texts",
        "date-s1": 850,
        "date-s2": 900,
        "date-e1": "",
        "date-e2": "",
        "origin": "Fleury?",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment?",
        "dimensions": "220 x 145 mm",
        "foliation": "28 ff?",
        "contents": "F. 1 Fragment sur les muses, F. 1-28 BOETHIUS [Opuscula sacra cum glossis REMIGIO AUTISSIODORENSIS], F. 28 « De duodecim lapidibus preciosis. Primus jaspis viridis... », F. 28v « ΦPONECIC id est prudentia... »",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF lat. 7900A",
        "title": "Publius Terentius Afer and other texts",
        "date-s1": 875,
        "date-s2": 1025,
        "date-e1": "",
        "date-e2": "",
        "origin": "Northern Italy, perhaps Milan?",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "dimensions": "340 x 270 mm",
        "foliation": "155 ff",
        "contents": "I. Publius Terentius Afer, Comoediae sex (f. 1-26). — II. Quintus Horatius Flaccus, Opera (f. 27-56). — III. M. Annaeus Lucanus, Pharsalia (f. 57-94). — Juvenalis, Satyrae (f. 95-111). — IV. Martianus Capella, De nuptiis Mercuri et Philologiae (f. 112-155).",
        "codicologicalUnits": "Composite, 3 parts",
        "script": "caroline",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "BnF nal. 239",
        "title": "Léandre (Règle de saint) and other texts",
        "date-s1": 900,
        "date-s2": 1100,
        "date-e1": "",
        "date-e2": "",
        "origin": "Spain",
        "library": "Bibliothèque nationale de France",
        "location": "Parijs",
        "material": "Parchment",
        "foliation": "83 ff",
        "contents": "Léandre (Règle de saint), suivie d'opuscules des pères et de vies de saints. Ms. visigothique du Xe ou du XIe siècle.",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "Valenciennes BM ms 404",
        "title": "Isidorus Hispalensis: De Retorica et dialectica and other texts",
        "date-s1": 800,
        "date-s2": 900,
        "date-e1": "",
        "date-e2": "",
        "origin": "St. Amand?",
        "library": "Valenciennes. Bibliothèque municipale",
        "location": "Valenciennes",
        "material": "Parchment",
        "dimensions": "219 x 148 mm",
        "foliation": "118 ff",
        "contents": "Isidorus Hispalensis: De Retorica et dialectica. Alcuinus Flaccus: Disputatio Caroli et Albini de retorica et virtutibus. Tractatus de computo",
        "language": "Latin",
        "type": "manuscript"
    },
    {
        "shelfmark": "Valenciennes BM ms 406",
        "title": "Recueil de traités de logique et de rhétorique",
        "date-s1": 900,
        "date-s2": 1000,
        "date-e1": "",
        "date-e2": "",
        "origin": "St. Amand?",
        "library": "Valenciennes. Bibliothèque municipale",
        "location": "Valenciennes",
        "material": "Parchment",
        "dimensions": "290 x 224 mm",
        "foliation": "149 ff",
        "contents": "Recueil de traités de logique et de rhétorique",
        "language": "Latin",
        "type": "manuscript"
    }
]
}


// viewport
var elem = (document.compatMode === "CSS1Compat") ?
document.documentElement :
document.body;
var vpWidth = elem.clientWidth;
var vpHeight = elem.clientHeight;

var tlStartPoint = timelineMargin;
var tlEndPoint = vpWidth - timelineMargin;
var pageMiddle = vpHeight/2;
var tlY = pageMiddle;
var tlLenght = vpWidth - (timelineMargin*2);
var timeLenght = timelineEndDate - timelineStartDate;
var tlTimeUnit = tlLenght/timeLenght;
var tlMarkerWidth = tlTimeUnit*timelineMarkerUnit;
var tlMarkerAmount = tlLenght/tlMarkerWidth;




function pointConverter(dateVal) {
  var pointVal;

  dateMinStart = dateVal - timelineStartDate;
  pointVal = timelineMargin+(dateMinStart*tlTimeUnit);


  return pointVal;
}

// SINGLE POINT
function tlItem_singlePoint(timelineObj) {
  var output;
  output = '<circle cx="'+pointConverter(timelineObj.startDate1)+'" cy="'+tlY+'" r="3" fill="rgb(42, 42, 42)" />';
  return output;
}


// RANGE
function tlItem_range(timelineObj, rowNr) {
  var output, unCerSt, cerSt, unCerEnd, cerEnd;
  var showCertain = true;
  var typeData = getItemTypeProps(timelineObj.type); // get type data

// get the no date available options
  if (timelineObj.startDate2 == '') {// geen onzeker start
    unCerSt = timelineObj.startDate1;
    cerSt = timelineObj.startDate1;
  }else {
    unCerSt = timelineObj.startDate1;
    cerSt = timelineObj.startDate2;
  }

  if (timelineObj.endDate2 == '') {// geen onzeker eind
    unCerEnd = timelineObj.endDate1;
    cerEnd = timelineObj.endDate1;
  }else {
    unCerEnd = timelineObj.endDate2;
    cerEnd = timelineObj.endDate1;
  }

  if ((timelineObj.endDate1 == '') && (timelineObj.endDate2 == '')) {
    unCerSt = timelineObj.startDate1;
    unCerEnd = timelineObj.startDate2;
    showCertain = false;

  }


  var textX = unCerSt+((unCerEnd - unCerSt)/2);



  //uncertain
  output = '<g id="'+removeSpaces(timelineObj.title)+'" class="rangeItem '+timelineObj.type+'">'
  output += '<line x1="'+pointConverter(unCerSt)+'" y1="'+setTlItemRow(rowNr)+'" x2="'+pointConverter(unCerEnd-0.5)+'" y2="'+setTlItemRow(rowNr)+'" ';
  output += 'style="stroke:'+typeData.barFill+'; stroke-width:'+tlItemHeight+';opacity:0.7" stroke-linecap="butt" />'; // opacity:0.5; //'+typeData.barFill+'

  // certain
  if (showCertain) {
    output += '<line x1="'+pointConverter(cerSt)+'" y1="'+setTlItemRow(rowNr)+'" x2="'+pointConverter(cerEnd)+'" y2="'+setTlItemRow(rowNr)+'" ';
    output += 'style="stroke:'+typeData.barFill+'; stroke-width:'+tlItemHeight+'; opacity:1;" />';// opacity:1
  }

  // text
  output += '<text x="'+pointConverter(textX)+'" y="'+setTlItemRow(rowNr)+'" dominant-baseline="middle" text-anchor="middle">'+timelineObj.title+'</text></g>'; //dominant-baseline="middle" text-anchor="middle"

  return output;
}


// find the ptoperties of a type
function getItemTypeProps(type) {
  var out;
  for (var i = 0; i < itemTypes.length; i++){
    if (itemTypes[i].typeName == type){
      out =itemTypes[i]
    }
  }

  return out;
}

function removeSpaces(inp) {
  var output;
  output = inp.replace(/ /g, "_");
  output = output.replace(/\(/g, "");
  output = output.replace(/\)/g, "");
  return output

}

var itemTypes = [
    { "typeName": "manuscript", "barFill": "hsl(40, 68%, 70%)" },
    { "typeName": "person", "barFill": "hsl(205, 67%, 59%)" }
  ];

var timelineDataArr = [];
// get the original data
var originalTimelineData = timelineDataAor.timelineItems;


function mapTimelineData() {

  var mappingValues = [
    { "newfield": "startDate1",       "oldfield": "date-s1"},
    { "newfield": "startDate2",       "oldfield": "date-s2"},
    { "newfield": "endDate1",         "oldfield": "date-e1"},
    { "newfield": "endDate2",         "oldfield": "date-e2"},
    { "newfield": "type",             "oldfield": "type"},
    { "newfield": "title",            "oldfield": "shelfmark"},
    { "newfield": "label1",           "oldfield": "title"},
    { "newfield": "label2",           "oldfield": "origin"}
  ]

  // go through originalTimelineData and map above values to the original data
  for (var i = 0; i < originalTimelineData.length; i++) {
    timelineDataArr.push({})

    // use mappingValues array to map the filed
    var pushVar ='{';
    for (var j = 0; j < mappingValues.length; j++) {

      timelineDataArr[i][mappingValues[j].newfield] =  originalTimelineData[i][mappingValues[j].oldfield];
    }
  }
}

var tlItemsRowY = [{"row": 1, "endpoint": 0}];

//Create all timeline elements and put in main svg tag
function createTimelineSvg() {
  var svg;
  svg += createJustTimeline();
  svg += createTimelineMarkers();

  for (var i = 0; i < timelineDataArr.length; i++) {
    svg += createTimelineItems(timelineDataArr[i], i);
  }
  document.getElementById("theTimeline").innerHTML= svg;

  console.log(tlItemsRowY);
}





// create all points and ranges on the timeline
function createTimelineItems(timelineObj, count) {
  var output;
  if ((timelineObj.startDate2 == '') && (timelineObj.endDate1 == '')) {
    // POINT
    output = tlItem_singlePoint(timelineObj);
  } else {
    // RANGE
    var rowNr = getRowNumber(timelineObj.startDate1);
    output = tlItem_range(timelineObj, rowNr);

    var storeEnddate = timelineObj.endDate1;
    if (timelineObj.endDate2 != '') {
      storeEnddate = timelineObj.endDate2;
    }
    if ((timelineObj.endDate1 == '') && (timelineObj.endDate2 == '')) {
      storeEnddate = timelineObj.startDate2;
    }

    tlItemsRowY.push({"row": rowNr, "endpoint": storeEnddate });
  }
  return output;
}


//Handle the row place for the ranges (prevent overlapping)
function getRowNumber(startPoint) {
  var rowNr=0;
  var maxCount=0;

  for (var i = 0; i < tlItemsRowY.length; i++) {
    console.log(startPoint+' gr dan '+tlItemsRowY[i].endpoint);
    maxCount = i;
    if (startPoint >= (tlItemsRowY[i].endpoint-10) ) {

      rowNr = tlItemsRowY[i].row;
      tlItemsRowY[i].endpoint = 10000000000000000000000000;
      break;
    }
  }

  if (rowNr==0) {
    var max = tlItemsRowY.reduce(function (prev, current) { return (prev.row > current.row) ? prev : current });
    rowNr=max.row+1;
  }
  return rowNr;
}


// set the height position of hte items
function setTlItemRow(rowNr) {
  return tlY-(rowNr*(tlItemHeight+tlItemGutter));
}



// timeline, just the line
function createJustTimeline() {
  output = '<line x1="'+tlStartPoint+'" y1="'+tlY+'" x2="'+tlEndPoint+'" y2="'+tlY+'" style="stroke:'+tlColor+'; stroke-width:'+tlStrokeWidth+'" />';
  return output;
}





// Markers
function createTimelineMarkers() {
  var output;
  var yXtra = markerHeight/2;

  for (var i = 0; i < (tlMarkerAmount+1); i++) {
      x = tlStartPoint + (i*tlMarkerWidth);
      output += '<line x1="'+x+'" y1="'+(tlY-yXtra)+'" x2="'+x+'" y2="'+(tlY+yXtra)+'" style="stroke:'+tlColor+'; stroke-width:'+tlStrokeWidth+'" />';
      output += '<text x="'+x+'" y="'+(tlY+tlTxtDistance)+'" >'+(timelineStartDate+(i*timelineMarkerUnit))+'</text>';
  }
  return output;
}



// sort a property of an array
function arrayPropertySort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
