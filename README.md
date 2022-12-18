# Tabular app

This web application displays changes of elements in tabular form in Web GUI.
It colorizes cells depending on threshold set up:
- `green` if price is higher than threshold
- `red` if price is lower than threshold

Updates are made every 100 ms for 50 elements (by default) and are sent though a web socket.
Update frequency can be changed in Web GUI.

You can sort content by element's name or price.

Server side configuration is stored in [application.yml](src/main/resources/application.yml). It has following parameters:
- `update_frequency_milliseconds` - frequency update in milliseconds
- `elements_per_update` - amount of elements per each update
- `max_price` - maximum possible price that could be generated
- `symbols` - array of symbols

Service is packaged with frontend bundle. So after running it you can go to `http://localhost:8080` in your browser to open Web GUI.

## How to run
Run the following command in project's directory:
```
./gradlew bootRun
```
