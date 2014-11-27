/**
 * Helper module for EasyTimetable Indoor Map. 
 * Contains methods that can be used by the rest of the application
 *
 * @author Franck Mamboue
 */

/**
 * Runs test cases if the application is in developer mode.
 */
function init() {
    if (CONFIG.developerMode) {
        var mapDiv = document.getElementById("map");
        mapDiv.style.height = CONFIG.developerModeMapHeight;
        
        var testboxDiv = document.getElementById("testbox");
        
        testboxDiv.style.display = "block";
        
        validateSetup();
    } else {
            var from = getUrlParameters(CONFIG.fromListId, "", true);
            var to = getUrlParameters(CONFIG.toListId, "", true);
            if (from) {
                chooseNavigationNode(from, CONFIG.fromListId);
            }
            if (to) {
                chooseNavigationNode(to, CONFIG.toListId);
            }
    }
}

/**
 * Source: http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
 * Updates the uri passed as a parameter using key and value also passed as parameters.
 */
function updateQueryStringParameter(uri, key, value) {
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

/**
 * Changes the current url parameters using the key and value passed as parameters.
 */
function changeUrlParam(param, value) {
    var newUrl = updateQueryStringParameter(window.location.href, param, value);
    window.history.replaceState('', '', newUrl);
}

/*
 Function: getUrlParameters
 Description: Get the value of URL parameters either from
 current URL or static URL
 Author: Tirumal
 URL: www.code-tricks.com
 */
function getUrlParameters(parameter, staticURL, decode){
    var currLocation = (staticURL.length)? staticURL : window.location.search,
    pars = currLocation.split("?")[1];
    if (pars) {
        parArr = pars.split("&"),
        returnBool = true;
        
        for(var i = 0; i < parArr.length; i++){
            parr = parArr[i].split("=");
            if(parr[0] == parameter){
                return (decode) ? decodeURIComponent(parr[1]) : parr[1];
                returnBool = true;
            }else{
                returnBool = false;
            }
        }
        
        if(!returnBool) return false;
    }
}

/**
 * Creates and populates Navigation Node Dropdowns.
 * Notes:
 * - It's the developer users' responsibility to make sure the bootstrap library is included in the map's html file.
 */
function createNavigationNodesMenuDropdown(navigationNodeList, dropdownId, buttonId, listId, label) {
    var dropdown = L.DomUtil.create("div", CONFIG.bootstrapDropdown);
    dropdown.setAttribute("id", dropdownId);
    var button = L.DomUtil.create("button", CONFIG.bootstrapDropdownButton);
    button.setAttribute("id", buttonId);
    button.setAttribute("data-toggle", CONFIG.bootstrapDataToggle);
    button.innerHTML = label;
    
    var navigationCaret = L.DomUtil.create("span", CONFIG.bootstrapCaret);
    button.appendChild(navigationCaret);
    
    var list = L.DomUtil.create("ul", CONFIG.bootstrapDropdownList);
    list.setAttribute("id", listId);
    list.setAttribute("role", CONFIG.bootstrapDropdownListRole);
    list.setAttribute("aria-labelledby", buttonId);
    
    if (navigationNodeList && navigationNodeList.length == 0) {
        var listItem = L.DomUtil.create("li");
        listItem.setAttribute("role", CONFIG.bootstrapDropdownListItemRole);
        
        var listItemLink = L.DomUtil.create("a");
        listItemLink.setAttribute("role", CONFIG.bootstrapDropdownListItemLinkRole);
        listItemLink.setAttribute("tabindex", "-1");
        listItemLink.innerHTML = CONFIG.noneAvailable;
        listItem.appendChild(listItemLink);
        list.appendChild(listItem);
    } else {
        navigationNodeList.forEach(function(navigationNode){
            var listItem = L.DomUtil.create("li");
            listItem.setAttribute("role", CONFIG.bootstrapDropdownListItemRole);

            var listItemLink = L.DomUtil.create("a", CONFIG.clickableClass);
            listItemLink.setAttribute("role", CONFIG.bootstrapDropdownListItemLinkRole);
            listItemLink.setAttribute("tabindex", "-1");
            listItemLink.setAttribute("onclick", CONFIG.clickMenuItemLinkAction);
            listItemLink.innerHTML = navigationNode.name;
            listItem.appendChild(listItemLink);
            list.appendChild(listItem);
        });
    }
    dropdown.appendChild(button);
    dropdown.appendChild(list);
    
    return dropdown;
}

/**
 * Sets the label for the dropdown button with the given id.
 */
function setDropdownButtonLabel(id, newLabel) {
    var dropdownButton = document.getElementById(id);
    dropdownButton.innerHTML = newLabel;
}

/**
 * Extracts primitive Navigation Nodes information from Navigation Route data and returns them as an object containing node names and node levels (sorted by name).
 */
function extractNavigationNodes(geoJSONdata, navigationRoutedata) {
    var navigationNodeList = [];

    geoJSONdata.features.forEach(function(feature){
                             var navigationNodeName = feature.properties.relations[0].reltags.name;
                             for (node in navigationRoutedata) {
                                if (node == navigationNodeName) {
                                    navigationNodeList.push({level: navigationRoutedata[node].level, name: node});
                                }
                             }
                             });
    
    navigationNodeList.sort(function(a,b) {
                            if ( a.name < b.name )
                            return -1;
                            if ( a.name > b.name )
                            return 1;
                            return 0;
                            });
    return navigationNodeList;
}

/**
 * Defines actions to be taken when a user selects a different level.
 */
function rerender(e, currentNavigationRoute) {
    if(e.oldLevel != e.newLevel) {
        var polylinesToAdd = [];
        // render navigation route corresponding to the new level
        var routeToBeDeleted = removeNavigationRouteHighlight(currentNavigationRoute);
        for (level in currentNavigationRoute) {
            if (e.newLevel == level) {
                var levelPolylines = currentNavigationRoute[level];
                levelPolylines.forEach(function(polyline) {
                                       polylinesToAdd.push(polyline);
                                       map.addLayer(polyline);
                                   });
            }
        }
        if(isTemp(departureNode)) {
            if(e.newLevel != departureNode.tempContainer.level) {
                map.removeLayer(departureNode.tempContainer.marker);
            } else if (e.newLevel == departureNode.tempContainer.level) {
                map.addLayer(departureNode.tempContainer.marker);
            }
        }
        if(isTemp(destinationNode)) {
            if(e.newLevel != destinationNode.tempContainer.level) {
                map.removeLayer(destinationNode.tempContainer.marker);
            } else if (e.newLevel == destinationNode.tempContainer.level) {
                map.addLayer(destinationNode.tempContainer.marker);
            }
        }
        var rerenderData = {
            "routeToBeDeleted" : routeToBeDeleted,
            "polylinesToAdd" : polylinesToAdd,
        };
        return rerenderData;
    }
}

/**
 * Checks if the node (departure or destination) passed as a parameter is marked on the map using a temporary marker.
 */
function isTemp(node) {
    var isTemp;
    if(node.tempContainer && node.tempContainer.marker && typeof node.tempContainer.level != undefined){
        isTemp = true;
    }
    return isTemp;
}

/**
 * Gets the marker at located at the latitude, longitude, and level passed as parameters if it exists.
 */
function markerContainerAt(lat, lng, level) {
    for(item in markerData) {
        var markerContainer = markerData[item];
        var markerLevel = markerContainer.level;
        if(markerContainer.coordinates.lat == lat && markerContainer.coordinates.lng == lng && markerLevel == level ) {
            return markerContainer;
        }
    }
}

/**
 * Replaces the icon of the marker in the marker container passed as a parameter with the icon also passed as a parameter.
 */
function replaceIcon(markerContainer, icon) {
    var marker = markerContainer.marker;
    marker.setIcon(icon);
    return markerContainer;
}

/**
 * Replaces icons with their original values depending on the group of icons (departure or destination) passed as a parameter.
 */
function resetIcons(groupToReset) {
    for(item in markerData) {
        var markerContainer = markerData[item];
        if(markerContainer.group == groupToReset) {
            replaceIcon(markerContainer, markerContainer.initialIcon);
        }
    }
    if(isTemp(departureNode) && groupToReset == departureNode.tempContainer.group) {
        map.removeLayer(departureNode.tempContainer.marker);
    }
    if(isTemp(destinationNode) && groupToReset == destinationNode.tempContainer.group) {
        map.removeLayer(destinationNode.tempContainer.marker);
    }
}

/**
 * Marks the node passed as a parameter using the icon also passed as a parameter.
 */
function markNode(node, lat, lng, level, icon){
    var markerContainerAtCurrentLocation = markerContainerAt(lat, lng, level);
    resetIcons(node.group);
    
    if (markerContainerAtCurrentLocation) {
        node.tempContainer = {};
        markerContainerAtCurrentLocation.group = node.group;
        node.markerContainer = replaceIcon(markerContainerAtCurrentLocation, icon);
    } else {
        node.markerContainer = {};
        node.tempContainer = {};
        node.tempContainer.level = level;
        node.tempContainer.group = node.group;
        node.tempContainer.marker = L.marker([lat, lng], {icon: icon}).addTo(map);
    }
    levelControl.setLevel(level);
}

/**
 * Defines actions to be taken when a user selects a departure / destination node from the menu.
 */
function chooseNavigationNode(choice, type) {
    if(typeof choice == "object" && choice.innerHTML) {
        var choiceName = choice.innerHTML;
        var choiceType = choice.parentNode.parentNode.id;
        changeUrlParam(choiceType, choiceName);
    } else {
        var choiceName = choice;
        var choiceType = type;
    }
    // extract to processNavigationChoice
    if (choiceType == CONFIG.fromListId) {
        departureNode.name = choiceName;
        if (departureNode.name != destinationNode.name) {
            setDropdownButtonLabel(CONFIG.fromButtonId, choiceName);
            if (destinationNode.name) {
                removeNavigationRouteHighlight(currentNavigationRoute);
                traceRouteHighlight(choiceName, destinationNode.name, navigationRoute, navigationRouteData);
            }
            var departureLat = navigationRouteData[choiceName].coordinates[1];
            var departureLng = navigationRouteData[choiceName].coordinates[0];
            var departureLevel = navigationRouteData[choiceName].level;
            markNode(departureNode, departureLat, departureLng, departureLevel, ICONS.DEPARTURE_NODE_ICON);
        } else {
            alert("You are already at " + departureNode.name + ".");
        }
    } else if (choiceType == CONFIG.toListId) {
        destinationNode.name = choiceName;
        if (destinationNode.name != departureNode.name) {
            setDropdownButtonLabel(CONFIG.toButtonId, choiceName);
            if (departureNode.name) {
                removeNavigationRouteHighlight(currentNavigationRoute);
                traceRouteHighlight(departureNode.name, choiceName, navigationRoute, navigationRouteData);
            }
            var destinationLat = navigationRouteData[choiceName].coordinates[1];
            var destinationLng = navigationRouteData[choiceName].coordinates[0];
            var destinationLevel = navigationRouteData[choiceName].level;
            markNode(destinationNode, destinationLat, destinationLng, destinationLevel, ICONS.DESTINATION_NODE_ICON);
        } else {
            alert("You are already at " + destinationNode.name + ".");
        }
    }
}

/**
 * Traces the navigation route highlight from departure node to destination node.
 */
function traceRouteHighlight(departure, destination, navigationRoute, navigationRouteData) {
    currentNavigationRoute = {};
    var path = navigationRoute.findShortestPath(departure, destination);
    
    var currentPoint, nextPoint, line;
    for (var i=0; i<path.length-1; i++) {
        currentPoint = navigationRouteData[path[i]].coordinates;
        var currentPointLat = currentPoint[1];
        var currentPointLng = currentPoint[0];
        nextPoint = navigationRouteData[path[i+1]].coordinates;
        
        if (nextPoint) {
            var nextPointLat = nextPoint[1];
            var nextPointLng = nextPoint[0];
            var pointA = new L.LatLng(currentPointLat, currentPointLng);
            var pointB = new L.LatLng(nextPointLat, nextPointLng);
            var pointList = [pointA, pointB];
            
            line = new L.Polyline(pointList, {
                                  color: CONFIG.navigationRouteColor,
                                  weight: CONFIG.navigationRouteWeight,
                                  opacity: CONFIG.navigationRouteOpacity,
                                  smoothFactor: CONFIG.navigationRouteSmoothFactor
                                  });
            var nextPointLevel = navigationRouteData[path[i+1]].level;
            if (nextPointLevel == indoorLayer.getLevel()) {
                line.addTo(map);
            }
            if (!currentNavigationRoute[nextPointLevel]) {
                currentNavigationRoute[nextPointLevel] = [];
            }
            currentNavigationRoute[nextPointLevel].push(line);
        }
    }
    
    var currentRouteData = {
        "path":path,
        "currentNavigationRoute":currentNavigationRoute
    };
    return currentRouteData;
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2014            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function distance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
}

/**
 * Extracts graph data from the navigation route object.
 */
function extractGraphData(navigationRouteData) {
    var navigationRoute = {};
    for (node in navigationRouteData) {
        navigationRoute[node] = navigationRouteData[node].graphdata;
    }
    return navigationRoute;
}

/**
 * Removes the navigation route highlight layer from the map.
 */
function removeNavigationRouteHighlight(currentNavigationRoute) {
    var routeToBeDeletedData = [];
    for (level in currentNavigationRoute) {
        var levelPolylines = currentNavigationRoute[level];
        levelPolylines.forEach(function(polyline) {
                                    routeToBeDeletedData.push(polyline);
                                    map.removeLayer(polyline);
                                   });
    }
    return routeToBeDeletedData;
}