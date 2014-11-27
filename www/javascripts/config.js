/**
 * Configuration file for EasyTimetable Indoor Map.
 *
 * @author Franck Mamboue
 */

/* Word Translations to geoJSON Language */
var TRANSLATOR = {
    navigationNodeCollection : "FeatureCollection",
    navigationNode : "Feature",
    highlight : "",
    departureNode : "",
    destinationNode : "",
    levelSwitchingNodes : "",
    navigationRoute : "",
    mapTiles : "",
    marker : "",
    navigationRoute : "",
    destinationNode : "",
    indoorMap : "",
}

/* Global Configuration Values */
var CONFIG = {
    osmUrl : "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    mapboxUrl : "http://{s}.tiles.mapbox.com/v3/openplans.map-g4j0dszr/{z}/{x}/{y}.png",
    maxZoom: 19,
    minZoom: 18,
    navigationNodeSize: 24,
    developerMode: false,
    developerModeMapHeight: "75%",
    developerModeQUnitMissingError: "Error: Please include QUnit's javascript file into this page's header.",
    iconsFilesLocation: "resources/",
    /* Bootrap */
    bootstrapDropdown: "dropdown",
    bootstrapDropdownButton: "btn btn-default dropdown-toggle",
    bootstrapDataToggle: "dropdown",
    bootstrapCaret: "caret",
    bootstrapDropdownList: "dropdown-menu",
    bootstrapDropdownListRole: "menu",
    bootstrapDropdownListItemRole: "presentation",
    bootstrapDropdownListItemLinkRole: "menuitem",
    /* End of Bootstrap */
    menuDivClass: "menu",
    menuDivId: "menu",
    menuPosition: "topright",
    fromDropdownId: "fromDropdown",
    fromButtonId: "fromButton",
    fromListId: "from",
    fromDropdownLabel: "Navigate From ",
    toDropdownId: "toDropdown",
    toButtonId: "toButton",
    toListId: "to",
    toDropdownLabel: "Navigate To ",
    noneAvailable: "None available",
    clickableClass: "leaflet-clickable",
    clickMenuItemLinkAction: "chooseNavigationNode(this)",
    navigationRouteColor: "green",
    navigationRouteWeight: 3,
    navigationRouteOpacity: 0.5,
    navigationRouteSmoothFactor: 1
}

/* Personal Configuration Values */
var PERSO = {
centerLat: 45.45095,
centerLng: -75.752111,
zoom: 19,
initialLevel: "0",
}

/* Icons Configuration Values */
var ICONS = {
    /* Departure Node Icon */
    DEPARTURE_NODE_ICON : L.icon({
                                     iconName: "DEPARTURE_NODE_ICON",
                                     iconUrl: CONFIG.iconsFilesLocation+"departure-node-icon.png",
                                     iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                     iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                     popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                     }),
    /* Departure Node Icon */
    DEPARTURE_NODE_ICON : L.icon({
                                     iconName: "DEPARTURE_NODE_ICON",
                                     iconUrl: CONFIG.iconsFilesLocation+"departure-node-icon.png",
                                     iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                     iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                     popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                     }),
    
    /* Destination Node Icon */
    DESTINATION_NODE_ICON : L.icon({
                                       iconName: "DESTINATION_NODE_ICON",
                                       iconUrl: CONFIG.iconsFilesLocation+"destination-node-icon.png",
                                       iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                       iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                       popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                       }),
    
    /* Routing Marker Icon */
    ROUTING_MARKER_ICON : L.icon({
                                     iconName: "ROUTING_MARKER_ICON",
                                     iconUrl: CONFIG.iconsFilesLocation+"routing-marker-icon.png",
                                     iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                     iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                     popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                     }),
    
    /* Door Navigation Node Icon */
    DOOR_NAVIGATION_NODE_ICON : L.icon({
                                           iconName: "DOOR_NAVIGATION_NODE_ICON",
                                           iconUrl: CONFIG.iconsFilesLocation+"door-navigation-node-icon.png",
                                           iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                           iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                           popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                           }),
    
    
    /* Floor Switching Node 1 Icon (stairs) */
    FLOOR_SWITCHING_NODE_1_ICON : L.icon({
                                             iconName: "FLOOR_SWITCHING_NODE_1_ICON",
                                             iconUrl: CONFIG.iconsFilesLocation+"floor-switching-node-1-icon.png",
                                             iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                             iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                             popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                             }),
    
    /* Floor Switching Node 2 Icon (elevator) */
    FLOOR_SWITCHING_NODE_2_ICON : L.icon({
                                             iconName: "FLOOR_SWITCHING_NODE_2_ICON",
                                             iconUrl: CONFIG.iconsFilesLocation+"floor-switching-node-2-icon.png",
                                             iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                                             iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                                             popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                                             }),
    
    /* Help Icon (i.e.: information center, help desk, reception) */
    HELP_ICON : L.icon({
                           iconName: "HELP_ICON",
                           iconUrl: CONFIG.iconsFilesLocation+"help-icon.png",
                           iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                           iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                           popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                           }),
    /* Toilet Icon */
    TOILET_ICON : L.icon({
                       iconName: "TOILET_ICON",
                       iconUrl: CONFIG.iconsFilesLocation+"toilet-icon.png",
                       iconSize:     [CONFIG.navigationNodeSize, CONFIG.navigationNodeSize], // size of the icon
                       iconAnchor:   [0, CONFIG.navigationNodeSize], // point of the icon which will correspond to marker's location
                       popupAnchor:  [CONFIG.navigationNodeSize/2, CONFIG.navigationNodeSize * (-1)] // point from which the popup should open relative to the iconAnchor
                       }),
};

/* Global variables declaration */
var tileServerUrl,
geoJSON,
markerData = {},
Graph,
navigationRouteData,
navigationRoute,
menuLayer,
navigationNodeList,
departureNode = {"group": "departure"},
destinationNode = {"group": "destination"},
currentNavigationRoute = {};