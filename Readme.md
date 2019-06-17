# What is Legion?

Legion is a small project to experiment with different technologies to build the same basic application, being a small personal photography portfolio site with an admin area. 
This is similar to [http://todomvc.com/](todomvc) but with server side and database components

# What is this version

This version is using React (and its friends), aspnet core 2.2 web api and mongdo db. 

# Environment variables / User Secrets

Variable | Description
--- | ---
LEGION_ROOT_DATABASE_PASSWORD | The mongo root / admin password (username is LegionRoot)
LEGION_WEB_PASSWORD | The password for the mongo user account used for the LegionDatabase (username is LegionWeb)
LEGION_TOKEN_SECRET | The secret used to generate and validate JWT tokens




