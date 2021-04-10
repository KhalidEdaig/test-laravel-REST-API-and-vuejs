Creation d’un admin panel pour gérer les entreprises (mini CRM):

Basic Laravel Auth: possibilité de se connecter en tant qu'administrateur
Utilisez des seeds de base de données pour créer le premier utilisateur avec l'email admin@admin.com et le mot de passe «mot de passe»
Fonctionnalité CRUD (Create / Read / Update / Delete) pour deux éléments de menu: Entreprises et Employés.
La table de base de données des entreprises comprend les champs suivants: Name (required), email, logo (minimum 100×100), website
La table de base de données des employés comprend les champs suivants: First name (required), last name (required), Company (foreign key to Companies), email, phone
Utilisez les migrations de bases de données pour créer ces schémas ci-dessus
Stockez les logos des entreprises dans le dossier storage/app/public et rendez-les accessibles du public
Utilisez les contrôleurs de ressources Laravel de base avec les méthodes par défaut - indexer, créer, stocker, etc.
Utilisez la pagination de Laravel pour afficher la liste des entreprises / employés, N entrées par page
Utilisez Laravel make:auth comme thème de conception basé sur Bootstrap par défaut, mais supprimez la possibilité de s’inscrire
Rendre le projet multilingue (en utilisant le dossier resources/lang)
Tests de base avec phpunit
Utiliser la technologie Vuejs/Nuxtjs afin de créer une application front-end en integrant les fonctionnalités décris ci-joint.