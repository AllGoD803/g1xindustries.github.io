# G1X Atelier — démonstration

Application statique en français, version pilote 0.1. Ouvrir `index.html` depuis le site ou utiliser le fichier HTML autonome téléchargé sur un navigateur compatible.

## Données

Les projets restent dans le `localStorage` de ce navigateur sous `g1x-atelier-v1`. Aucune requête de sauvegarde distante, aucun outil de suivi, aucune API IA. Un export JSON conserve une copie transférable. Effacer les données du navigateur supprime les projets locaux; le site ne peut pas les restaurer.

## Calculs

Chaque ligne est arrondie au cent. Coût prévu = matériaux + heures × coûts horaires internes + sous-traitance + frais affectés + réserve. Prix avant taxes = coût prévu / (1 − marge cible). Les deux taxes sont calculées séparément sur ce prix et démarrent à zéro. L'utilisateur choisit ses taux applicables.

Les données initiales sont fictives. Le document client masque les coûts internes. Cette version produit des soumissions, pas des factures. Le parcours commercial est une demande par courriel; aucun paiement intégré.

## Vérification

Le moteur a passé 7 tests Node : marge vs majoration, exemple complet et taxes, montants nuls, coût réel/perte, arrondi, valeurs invalides, validation import/export. La syntaxe JavaScript, les nouvelles ancres et les traductions FR/EN de la page principale ont été vérifiées. L'interface n'a pas fait l'objet d'un test automatisé dans Safari iOS.

Les éléments de stratégie commerciale du propriétaire ne sont pas inclus dans cette démonstration publique. La branche est proposée pour revue; elle ne doit pas être confondue avec un lancement commercial réalisé.
