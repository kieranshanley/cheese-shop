# cheese-shop

This repo contains a "partial" implementation of a cheese shop.

The solution is implemented in 3 containers:

1. A mongodb container (using vanilla dockerhub mongodb container)
2. A nodejs REST API (cheese_api)
3. A nodejs react UI

- Advantages of containerisation

Separating the solution into multiple containers has the advantage of being able to update and vary any one of the containers and isolates other parts of the solution from the changes. For example we might be able to upgrade the version of mongodb without having to rebuild the other two containers. Another advantage of containerisation is security - each container only allows access via the minimal set of ports exposed - vulnerabilites from open ports are minimized which reduces the attack surface.

There is a docker-compose.yml file that orchestrates the three containers. No need for K8 as evverything is being developed on the one server. 

- Scripts directory
The scripts directory contains scripts to build the api and view containers. There is a script to build all the containers and a script to start and stop the environment. I should have written a script to execute the unit tests but I ran out of time.

- Unit tests
I did manage to write some very simple unit tests for the REST API - there were many more additional test cases that should have been written.

- UI
My UI skills are way rustier than i had hopped and the React UI part of the excercise took me too long and I didnt get as far as I should have. The UI only lists the cheeses - I used manual postman tests to create and remove the data. If I had more time I would have fleshed out the UI to allow rows to be removed and added.

- Image handling
I also left out the handling of image data. It would have been nice to screen scrape the provided website  URL to provide a comprehensive test dataset. I have forgotten how to upload binary data over REST api so I skipped over that bit.

I spent way too much time on this solution - and didnt get as far as I would like.