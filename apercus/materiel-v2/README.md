# G1X — aperçu matériel, logo et budget

Proposition isolée du 24 septembre 2026. L’accueil public, son logo actuel, sa navigation et les autres pages ne sont pas modifiés. La page d’aperçu reprend leur structure et ajoute un visuel extérieur, un visuel de réception locale et un accès à G1X Budget.

## Images

Visuels conceptuels produits avec l’outil intégré de génération d’images, puis convertis en WebP pour le site. Ils illustrent une architecture plausible, pas des modèles commerciaux exacts, une certification d’étanchéité ou un prototype déjà assemblé.

- `station-lora.webp` : balise LoRa sur mât ancré dans un paysage boréal, avec boîtier fermé, antenne verticale, panneau solaire, colliers et abri de capteur. Aucun ordinateur à l’extérieur.
- `reception-locale.webp` : poste de travail inspiré de la photo du propriétaire : écran panoramique, deux écrans superposés, GPU externe, module ESP32 LoRa compact relié au Pi 5 par USB, mini-PC, calcul en périphérie et stockage. Les papiers et le contenu personnel des écrans ne sont pas reproduits. L’antenne radio discrète représentée est conceptuelle; la liaison USB ne remplace pas une antenne LoRa. Le grand boîtier gris a été retiré à la demande de l’utilisateur.

Base technique de la description de la carte radio : documentation officielle T-Beam (ESP32, LoRa, GPS), https://wiki.lilygo.cc/products/t-beam-series/t-beam/ . Aucun produit n’a été acheté ni son adéquation validée.

## Animation

Le logo officiel existant est réutilisé sans modification graphique. Une trace lumineuse monte dans l’arbre, un reflet passe ensuite sur le nom. Mouvement limité à quelques pixels sur le matériel au pointeur fin. Transmission illustrative déclenchée par bouton, aucune télémétrie réelle. Pause manuelle et préférence système de réduction des animations prises en compte.

## G1X Budget

Démo autonome FR/EN, non connectée au K12, aux comptes bancaires ou au budget personnel du propriétaire. Montants fictifs, fournisseurs vides et librement personnalisables. Calculs en cents, calendrier réel, fréquence hebdomadaire, aux deux semaines, deux fois par mois, mensuelle, trimestrielle et annuelle. Pour les paiements deux fois par mois, deux jours distincts entre 1 et 28 évitent les ambiguïtés de fin de mois. Les paiements mensuels au 29, 30 ou 31 sont ramenés au dernier jour d’un mois plus court.

Le solde d’ouverture concerne le mois sélectionné et doit être renseigné pour ce mois. Les échéances utilisent une date repère récurrente, sans date de fin de contrat. Les jours fériés, les heures de dépôt, les intérêts et les soldes des dettes ne sont pas modélisés. Les provisions sont comptabilisées comme allocations de budget, pas comme vrais débits bancaires.

Les données restent dans le navigateur; sauvegarde locale sur demande et export JSON. Aucune vente ni tarification commerciale activée.

## Vérification

`node --test budget/engine.test.cjs`

Les tests couvrent cinq paies hebdomadaires dans un mois, la différence avec les deux autres rythmes, les années bissextiles, les fins de mois, les calculs monétaires et le rejet d’entrées invalides.
