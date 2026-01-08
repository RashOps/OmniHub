## Structure des Données (Le "Contrat")
Pour que ton Back-end et ton Front-end communiquent bien, vous devez vous mettre d'accord sur la forme des objets. Voici une proposition de schéma simple :
- Contact : { id, nom, prenom, telephone, email }
- Note : { id, titre, contenu, dateCreation }
- To-Do : { id, texte, isCompleted (boolean) }