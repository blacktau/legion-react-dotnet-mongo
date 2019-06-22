# Legion

## What is Legion?

Legion is a small project to experiment with different technologies to build the same basic application, being a small personal photography portfolio site with an admin area. 
This is similar to [http://todomvc.com/](todomvc) but with server side and database components.

I do this to build something useful with a tech stack so as to better understand the normal use case. 

Unit tests are normally not included as I've found them to hinder my discovery process while learning, since its difficult to write a test when you don't know how the code needs to be used. 

## What is this version

This version is using React (and its friends), aspnet core 2.2 web api and mongdo db. 

## Environment variables / User Secrets

Variable | Description
--- | ---
LEGION_ROOT_DATABASE_PASSWORD | The mongo root / admin password (username is LegionRoot)
LEGION_Mongo__WebPassword | The password for the mongo user account used for the LegionDatabase (username is LegionWeb)
LEGION_Authentication__TokenSecret | The secret used to generate and validate JWT tokens
LEGION_Authentication__DefaultAdminPassword | The default password used to create the Legion admin account. (username is admin)

all of these variables can be created in a .env file in the root of the project and will be picked up by vscode and docker-compose



