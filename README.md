# Le jeu du bouche à oreille

## Setup

Pour setup le projet il faut ce munir de la clef API IBM et de choisir une clef
de cryptage pour les json web tokens. Avec c'est deux clef il faut creer un .env
a la racine de bao_api/
```
$ pwd
/bao_api/
$ cat .env
SECRETKEY={la clef de cryptage jwt}
IBM_APIKEY={la clef de l'api IBM}
FILE_NAME={chemin du fichier a telecharger par l'api IBM}.wav
```

## Sujet

Votre mission, si vous l'acceptez, sera de se marrer un bon coup en manipulant les API [text to speech](https://www.ibm.com/watson/services/text-to-speech/) et [speech to text](https://www.ibm.com/watson/services/speech-to-text/) d'IBM.
Vous allez devoir éprouver ces services en recréant le jeu du bouche à oreille, en mixant les langues. 
Il y a des chances qu'on observe de belles choses ! :D

### Déroulement d'une partie

- Au début de la partie un nombre de tour est décidé par l'utilisateur.
- L'utilisateur écrit également une phrase / paragraphe, qui servira de point de départ.
- Le tour est composé :
  - D'un [text to speech](https://www.ibm.com/watson/services/text-to-speech/) dans une langue autre que le français.
  - Puis d'un [speech to text](https://www.ibm.com/watson/services/speech-to-text/) en français.
- À chaque tour, le texte généré, ainsi qu'une note comparative (sur l'échelle de votre choix, avec l'algorithme de votre choix) par rapport au texte précédent, et le fichier audio doivent être sauvegardés sur un serveur distant (db, fichier plat, jpg, comme vous voulez :))
- En fin de partie, un récapitulatif des tours devra être affiché, ainsi que la note globale.

### Exemple

Simulons ensemble le premier tour :

- Texte de départ : "Coucou toi comment ça va"
- Ce texte est ensuite "parlé" par la voix `Allison (en-US)` grâce au [text to speech](https://www.ibm.com/watson/services/text-to-speech/). Un fichier audio est généré.
- Le fichier audio est passé au [speech to text](https://www.ibm.com/watson/services/speech-to-text/) avec la voix française, ce qui donne "Quand aux contrôles et m chambas". 
- La note générée pour ce tour est de 6.1/20.

[Lien vers le projet expo publié qui devrait marcher](https://expo.io/@dragma/app)

## Consignes

### Variantes sur la règle du jeu

Vous devrez tout faire pour que ces services se comprennent le moins possible si jamais les résultats sont trop parfaits (parce que sinon ça sera pas marrant ! **=]** ).

### Technos

Les technologies à utiliser sont (évidemment)  a minima :

- `react-native`
- `nodejs`

Libre à vous ensuite d'utiliser la manière que vous voulez pour stocker les état et résultats.

L'aspect graphique n'est pas très important. Cela dit, si vous avez des envies créatrices, ne vous privez pas :D !

La performance et l'optimisation est un plus pas (du tout) obligatoire. Le but est que je puisse voir comment vous codez / commitez sur un thème, qui, je l'espère, sera aussi décalé que sympathique.

L'exercice sera à me remettre sur un repo github ou gitlab au choix !

### API

Le pricing de cette API autorise une utilisation gratuite [jusqu'à 500 minutes par mois](https://www.ibm.com/cloud/watson-speech-to-text/pricing). Il faut simplement se créer un compte.

[Documentation text-to-speach](https://cloud.ibm.com/apidocs/text-to-speech?code=node)
[Documentation speech-to-text](https://cloud.ibm.com/apidocs/speech-to-text?code=node)

---

Bon courage !

[![Bon chance](https://img.youtube.com/vi/7OGpsoJ1kwk/0.jpg)](https://www.youtube.com/watch?v=7OGpsoJ1kwk)

