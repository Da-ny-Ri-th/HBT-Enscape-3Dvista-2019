(function(){
    var script = {
 "scrollBarMargin": 2,
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 0.5,
 "children": [
  "this.MainViewer",
  "this.Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709",
  "this.Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
  "this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
  "this.HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132",
  "this.Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C"
 ],
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.syncPlaylists([this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist,this.mainPlayList]); this.playList_DB092B1F_D702_4B1A_41C6_80D5DCF9F28C.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A].forEach(function(component) { component.set('visible', false); }) }",
 "width": "100%",
 "horizontalAlign": "left",
 "layout": "absolute",
 "paddingLeft": 0,
 "defaultVRPointer": "laser",
 "paddingRight": 0,
 "buttonToggleFullscreen": "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "scripts": {
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "registerKey": function(key, value){  window[key] = value; },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "unregisterKey": function(key){  delete window[key]; },
  "existsKey": function(key){  return key in window; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarWidth": 10,
 "minHeight": 20,
 "backgroundPreloadEnabled": true,
 "borderRadius": 0,
 "downloadEnabled": false,
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "top",
 "minWidth": 20,
 "contentOpaque": false,
 "definitions": [{
 "vfov": 180,
 "partial": false,
 "label": "Private Room",
 "hfov": 360,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_t.jpg",
 "id": "panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240",
   "yaw": -40.57,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 43.92
  },
  {
   "panorama": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
   "yaw": -136.04,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 123.65
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "x": 893.37,
   "angle": 1.07,
   "class": "PanoramaMapLocation",
   "y": 587.09
  }
 ],
 "overlays": [
  "this.overlay_C54E6A9C_D6EB_5D2F_41E3_254922495C8E",
  "this.overlay_C5518A9C_D6EB_5D2F_41D4_F70743DE6C56"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 139.43,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB46AB59_D702_4B66_41B1_3F45691918C5"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_camera"
},
{
 "items": [
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 0, 1)",
   "media": "this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 1, 2)",
   "media": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 2, 3)",
   "media": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist, 3, 0)",
   "media": "this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "class": "PlayList"
},
{
 "from": "right",
 "duration": 0,
 "id": "effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "duration": 0,
 "id": "effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8",
 "easing": "linear",
 "class": "SlideOutEffect",
 "to": "right"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 43.96,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB509B62_D702_4B2A_41D9_ECDA7A68AE71"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_camera"
},
{
 "vfov": 180,
 "partial": false,
 "label": "VIP Teller",
 "hfov": 360,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_t.jpg",
 "id": "panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095",
   "yaw": 43.92,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -40.57
  },
  {
   "panorama": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
   "class": "AdjacentPanorama"
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "x": 693.88,
   "angle": 93.53,
   "class": "PanoramaMapLocation",
   "y": 286.93
  }
 ],
 "overlays": [
  "this.overlay_C2DC3C6B_D6EB_55EA_41D2_0CFAB7018302",
  "this.overlay_C2DC6C6B_D6EB_55EA_41E2_40F296C9FB28"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "buttonZoomOut": "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "viewerArea": "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480",
 "class": "MapPlayer",
 "movementMode": "constrained",
 "id": "ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer",
 "buttonZoomIn": "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "player": "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_DB094B1F_D702_4B1A_41DD_D034FDB15731",
 "class": "PlayList"
},
{
 "items": [
  "this.PanoramaPlayListItem_DB0D8B22_D702_4B2A_4190_BBB8534DCA43",
  "this.PanoramaPlayListItem_DB0D2B24_D702_4B2E_41E0_1ACDE4961AB2",
  "this.PanoramaPlayListItem_DB0D7B24_D702_4B2E_41E7_C2E5E8E725E5",
  "this.PanoramaPlayListItem_DB0CDB24_D702_4B2E_41D2_7FD3CC8F7AD1"
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": -136.08,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB2AAB45_D702_4B6E_41DB_DD4A27098A00"
},
{
 "vfov": 180,
 "partial": false,
 "label": "Guest Lounge",
 "hfov": 360,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_t.jpg",
 "id": "panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
   "yaw": -29.46,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": 10.17
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "x": 298.33,
   "angle": 94.4,
   "class": "PanoramaMapLocation",
   "y": 1012.73
  }
 ],
 "overlays": [
  "this.overlay_C4F03AAE_D6EB_BD6B_41E1_92F068A1B2C7"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "displayMovements": [
  {
   "duration": 1000,
   "easing": "linear",
   "class": "TargetRotationalCameraDisplayMovement"
  },
  {
   "duration": 3000,
   "easing": "cubic_in_out",
   "targetPitch": -1.4,
   "class": "TargetRotationalCameraDisplayMovement",
   "targetStereographicFactor": 0
  }
 ],
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": -93.02,
  "class": "PanoramaCameraPosition",
  "pitch": -1.4
 },
 "id": "panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_camera",
 "displayOriginPosition": {
  "stereographicFactor": 1,
  "hfov": 165,
  "yaw": -93.02,
  "class": "RotationalCameraDisplayPosition",
  "pitch": -90
 }
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": -56.35,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB348B4F_D702_4B7A_41B4_EE4C92EFCD9B"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 150.54,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB5CCB6C_D702_4B3E_418D_45D5B981BF50"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": -169.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "camera_DB1C3B3B_D702_4B1A_41BF_5EE5076AADC7"
},
{
 "duration": 0,
 "id": "effect_2745FDF7_ACED_1161_41D1_B5EC4D857875",
 "easing": "linear",
 "class": "SlideOutEffect",
 "to": "right"
},
{
 "maximumZoomFactor": 1.2,
 "label": "Floor Plan",
 "id": "map_F299D27E_B145_5EF5_41B2_3827E5636B60",
 "initialZoomFactor": 1,
 "width": 1116,
 "thumbnailUrl": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_t.png",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60.png",
    "width": 1116,
    "height": 1492,
    "class": "ImageResourceLevel"
   },
   {
    "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_lq.png",
    "width": 221,
    "tags": "preload",
    "height": 296,
    "class": "ImageResourceLevel"
   }
  ]
 },
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "class": "Map",
 "scaleMode": "fit_inside",
 "minimumZoomFactor": 0.5,
 "overlays": [
  "this.overlay_F299927E_B145_5EF5_41C5_3445D3B699E6",
  "this.overlay_F298427F_B145_5EF3_41E5_5401DEA8AFA9",
  "this.overlay_F298527F_B145_5EF3_41D4_9B4FC22491B8",
  "this.overlay_F298627F_B145_5EF3_41D2_6DE679B09CD7"
 ],
 "height": 1492
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "player": "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer",
   "class": "MapPlayListItem"
  }
 ],
 "id": "playList_DB092B1F_D702_4B1A_41C6_80D5DCF9F28C",
 "class": "PlayList"
},
{
 "vfov": 180,
 "partial": false,
 "label": "Private Room Lobby",
 "hfov": 360,
 "hfovMin": "150%",
 "thumbnailUrl": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_t.jpg",
 "id": "panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
 "pitch": 0,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095",
   "yaw": 123.65,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -136.04
  },
  {
   "panorama": "this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62",
   "yaw": 10.17,
   "distance": 1,
   "class": "AdjacentPanorama",
   "backwardYaw": -29.46
  }
 ],
 "class": "Panorama",
 "mapLocations": [
  {
   "map": "this.map_F299D27E_B145_5EF5_41B2_3827E5636B60",
   "x": 681.05,
   "angle": -82.32,
   "class": "PanoramaMapLocation",
   "y": 1157.15
  }
 ],
 "overlays": [
  "this.overlay_C2EA0B09_D6EB_D316_41E1_CC43A047952D",
  "this.overlay_C2EAFB09_D6EB_D316_41E8_C9B6BFFF1B79"
 ],
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072,
      "colCount": 6
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536,
      "colCount": 3
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024,
      "colCount": 2
     },
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512,
      "colCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_t.jpg",
   "class": "CubicPanoramaFrame"
  }
 ],
 "hfovMax": 130
},
{
 "buttonPlayLeft": "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "buttonMoveRight": "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "id": "MainViewerPanoramaPlayer",
 "touchControlMode": "drag_rotation",
 "buttonMoveLeft": "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "buttonMoveUp": "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "mouseControlMode": "drag_acceleration",
 "displayPlaybackBar": true,
 "buttonPause": "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "buttonMoveDown": "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonZoomOut": "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "buttonPlayRight": "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "buttonZoomIn": "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
},
{
 "automaticZoomSpeed": 10,
 "class": "PanoramaCamera",
 "automaticRotationSpeed": 4,
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "id": "panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_camera"
},
{
 "from": "right",
 "duration": 0,
 "id": "effect_2745EDF7_ACED_1161_41CE_8D7449621D35",
 "easing": "linear",
 "class": "SlideInEffect"
},
{
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "id": "MainViewer",
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 50,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 100,
 "playbackBarBackgroundOpacity": 1,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "borderSize": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "transitionDuration": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionMode": "blending",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarLeft": 0,
 "progressBarBorderColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "0.6vw",
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0
},
{
 "id": "Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709",
 "left": "3%",
 "maxWidth": 214,
 "right": "90%",
 "maxHeight": 85,
 "url": "skin/Image_BEE6FED8_AC35_2F20_41D8_34B6B91DA709.png",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "top": "90.97%",
 "bottom": "4%",
 "horizontalAlign": "center",
 "minHeight": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "minWidth": 1,
 "class": "Image",
 "borderSize": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "data": {
  "name": "CMED"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_806973DA_ADB0_EB72_41E1_4BBDAAEB91FF",
 "left": "79.38%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
  "this.Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
  "this.Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2"
 ],
 "scrollBarVisible": "rollOver",
 "right": "1.2%",
 "horizontalAlign": "left",
 "layout": "vertical",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Right Side Container"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0",
 "left": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856"
 ],
 "scrollBarVisible": "rollOver",
 "right": "84.23%",
 "horizontalAlign": "left",
 "layout": "absolute",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "minHeight": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Left Side Container"
 },
 "paddingBottom": 0,
 "gap": 10,
 "visible": false,
 "paddingTop": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_B3A95BF7_AD90_5B11_41E1_AC9050095132",
 "left": "0.05%",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "right": "49.95%",
 "paddingLeft": 20,
 "backgroundOpacity": 0,
 "paddingRight": 20,
 "top": "0%",
 "scrollBarWidth": 10,
 "bottom": "87.72%",
 "minHeight": 1,
 "borderRadius": 0,
 "propagateClick": false,
 "minWidth": 1,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:2.41vw;\"><B>HATTHA KAKSEKAR LIMITED</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vw;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#003366;font-size:1.69vw;\"><B><I>Head Office</I></B></SPAN></SPAN></DIV></div>",
 "class": "HTMLText",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "data": {
  "name": "HTMLText53815"
 },
 "paddingTop": 20,
 "shadow": false,
 "paddingBottom": 20
},
{
 "scrollBarMargin": 2,
 "id": "Container_A797E343_B17D_3EDA_41AB_2CDE4A57AE7C",
 "left": "40%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
  "this.IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
  "this.IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
  "this.Container_A7977343_B17D_3EDA_41C0_F47328C07981",
  "this.IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
  "this.IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
  "this.IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
  "this.IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525"
 ],
 "scrollBarVisible": "rollOver",
 "right": "38.77%",
 "horizontalAlign": "center",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "top": "85.03%",
 "scrollBarWidth": 10,
 "bottom": "0%",
 "minHeight": 20,
 "borderRadius": 0,
 "propagateClick": false,
 "verticalAlign": "middle",
 "contentOpaque": false,
 "minWidth": 20,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "hidden",
 "data": {
  "name": "Middle Control"
 },
 "gap": 4,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "toolTipShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "id": "IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A",
 "paddingTop": 0,
 "toolTipShadowVerticalLength": 0,
 "width": 54,
 "iconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A.png",
 "maxWidth": 128,
 "toolTipShadowColor": "#333333",
 "maxHeight": 128,
 "toolTipFontWeight": "normal",
 "toolTipPaddingRight": 6,
 "horizontalAlign": "center",
 "toolTipBorderSize": 1,
 "paddingLeft": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "pressedIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_pressed.png",
 "backgroundOpacity": 0,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "toolTipShadowOpacity": 1,
 "minHeight": 1,
 "toolTip": "Fullscreen",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "toolTipFontStyle": "normal",
 "mode": "toggle",
 "height": 38,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "verticalAlign": "middle",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_BD225E9E_B273_D96C_41A9_C0F962709F6A_rollover.png",
 "toolTipShadowSpread": 0,
 "class": "IconButton",
 "borderSize": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "transparencyActive": true,
 "toolTipFontSize": 12,
 "cursor": "hand",
 "toolTipPaddingBottom": 4,
 "data": {
  "name": "IconButton1493"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.69,
   "image": "this.AnimatedImageResource_C25E280E_D6EF_FD2A_41D7_359AA23BEAC4",
   "yaw": -40.57,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.83,
   "distance": 100
  }
 ],
 "id": "overlay_C54E6A9C_D6EB_5D2F_41E3_254922495C8E",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240, this.camera_DB2AAB45_D702_4B6E_41DB_DD4A27098A00); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 15.69,
   "yaw": -40.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_1_HS_0_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.24,
   "image": "this.AnimatedImageResource_C25EC80E_D6EF_FD2A_41D4_887D44BF7121",
   "yaw": -136.04,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -32.6,
   "distance": 100
  }
 ],
 "id": "overlay_C5518A9C_D6EB_5D2F_41D4_F70743DE6C56",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97, this.camera_DB348B4F_D702_4B7A_41B4_EE4C92EFCD9B); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 15.24,
   "yaw": -136.04,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_1_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -32.6,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.69,
   "image": "this.AnimatedImageResource_C3AC1D55_D6E9_573E_41E2_9929DF902286",
   "yaw": 131.51,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -29.83,
   "distance": 100
  }
 ],
 "id": "overlay_C2DC3C6B_D6EB_55EA_41D2_0CFAB7018302",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 15.69,
   "yaw": 131.51,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0_HS_0_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -29.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.38,
   "image": "this.AnimatedImageResource_C3ACAD56_D6E9_573A_41D8_40DDB5DF21DE",
   "yaw": 43.92,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -27.75,
   "distance": 100
  }
 ],
 "id": "overlay_C2DC6C6B_D6EB_55EA_41E2_40F296C9FB28",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095, this.camera_DB46AB59_D702_4B66_41B1_3F45691918C5); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.38,
   "yaw": 43.92,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -27.75,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "id": "IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE",
 "paddingTop": 0,
 "width": "9.07%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7973343_B17D_3EDA_41E5_A3FC6227C5CE_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27662"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "id": "ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480",
 "visible": false,
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "playbackBarRight": 0,
 "playbackBarBackgroundColorDirection": "vertical",
 "progressBarBorderSize": 0,
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "playbackBarProgressBorderColor": "#000000",
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipFontFamily": "Arial",
 "height": "100%",
 "playbackBarHeadBorderRadius": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 1,
 "playbackBarBackgroundOpacity": 1,
 "class": "ViewerArea",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "borderSize": 0,
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "transitionDuration": 500,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "toolTipBorderSize": 1,
 "vrPointerColor": "#FFFFFF",
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "paddingRight": 0,
 "progressBorderSize": 0,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionMode": "blending",
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarLeft": 0,
 "progressBarBorderColor": "#000000",
 "displayTooltipInTouchScreens": true,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipShadowSpread": 0,
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, null, null, false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, null, null, false) }",
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "toolTipBorderColor": "#767676",
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#000000",
 "toolTipOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": "0.6vw",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "paddingTop": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "data": {
  "name": "Floor Plan Viewer"
 },
 "paddingBottom": 0
},
{
 "id": "IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525",
 "paddingTop": 0,
 "width": "8.91%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797F343_B17D_3EDA_41E1_5446CB5EC525_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27673"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "media": "this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB0D8B22_D702_4B2A_4190_BBB8534DCA43, this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DB0D8B22_D702_4B2A_4190_BBB8534DCA43"
},
{
 "media": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB0D2B24_D702_4B2E_41E0_1ACDE4961AB2, this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DB0D2B24_D702_4B2E_41E0_1ACDE4961AB2"
},
{
 "media": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB0D7B24_D702_4B2E_41E7_C2E5E8E725E5, this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DB0D7B24_D702_4B2E_41E7_C2E5E8E725E5"
},
{
 "media": "this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240",
 "end": "this.trigger('tourEnded')",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_DB0CDB24_D702_4B2E_41D2_7FD3CC8F7AD1, this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480MapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_DB0CDB24_D702_4B2E_41D2_7FD3CC8F7AD1"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.87,
   "image": "this.AnimatedImageResource_C25F880C_D6EF_FD2E_41EA_BA3C8E34A0D5",
   "yaw": -29.46,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -16.13,
   "distance": 100
  }
 ],
 "id": "overlay_C4F03AAE_D6EB_BD6B_41E1_92F068A1B2C7",
 "data": {
  "label": "Arrow 06"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97, this.camera_DB1C3B3B_D702_4B1A_41BF_5EE5076AADC7); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.87,
   "yaw": -29.46,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_1_HS_1_0_0_map.gif",
      "width": 30,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -16.13,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "map": {
  "width": 44.62,
  "x": 276.02,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_1_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 990.42,
  "offsetY": 0,
  "height": 44.62,
  "class": "HotspotMapOverlayMap"
 },
 "image": {
  "x": 275.81,
  "height": 44.62,
  "class": "HotspotMapOverlayImage",
  "y": 990.21,
  "width": 44.62,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_1.png",
     "width": 44,
     "height": 44,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_F299927E_B145_5EF5_41C5_3445D3B699E6",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 44.62,
  "x": 658.74,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_2_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 1134.84,
  "offsetY": 0,
  "height": 44.62,
  "class": "HotspotMapOverlayMap"
 },
 "image": {
  "x": 658.41,
  "height": 44.62,
  "class": "HotspotMapOverlayImage",
  "y": 1134.65,
  "width": 44.62,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_2.png",
     "width": 44,
     "height": 44,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_F298427F_B145_5EF3_41E5_5401DEA8AFA9",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 44.62,
  "x": 882.14,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_3_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 630.64,
  "offsetY": 0,
  "height": 44.62,
  "class": "HotspotMapOverlayMap"
 },
 "image": {
  "x": 882.14,
  "height": 44.62,
  "class": "HotspotMapOverlayImage",
  "y": 630.64,
  "width": 44.62,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_3.png",
     "width": 44,
     "height": 44,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_F298527F_B145_5EF3_41D4_9B4FC22491B8",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay"
},
{
 "map": {
  "width": 44.62,
  "x": 671.57,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_4_map.gif",
     "width": 16,
     "height": 16,
     "class": "ImageResourceLevel"
    }
   ]
  },
  "offsetX": 0,
  "y": 264.62,
  "offsetY": 0,
  "height": 44.62,
  "class": "HotspotMapOverlayMap"
 },
 "image": {
  "x": 671.32,
  "height": 44.62,
  "class": "HotspotMapOverlayImage",
  "y": 264.42,
  "width": 44.62,
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_F299D27E_B145_5EF5_41B2_3827E5636B60_HS_4.png",
     "width": 44,
     "height": 44,
     "class": "ImageResourceLevel"
    }
   ]
  }
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_F298627F_B145_5EF3_41D2_6DE679B09CD7",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "AreaHotspotMapOverlay"
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.88,
   "image": "this.AnimatedImageResource_C25E780D_D6EF_FD2E_41E2_0F00B4B24B8B",
   "yaw": 123.65,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -22.97,
   "distance": 100
  }
 ],
 "id": "overlay_C2EA0B09_D6EB_D316_41E1_CC43A047952D",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095, this.camera_DB509B62_D702_4B2A_41D9_ECDA7A68AE71); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 11.88,
   "yaw": 123.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_1_HS_0_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -22.97,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.94,
   "image": "this.AnimatedImageResource_C25E180D_D6EF_FD29_41D1_5944803DDF00",
   "yaw": 10.17,
   "class": "HotspotPanoramaOverlayImage",
   "pitch": -20.54,
   "distance": 100
  }
 ],
 "id": "overlay_C2EAFB09_D6EB_D316_41E8_C9B6BFFF1B79",
 "data": {
  "label": "Arrow 04c"
 },
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62, this.camera_DB5CCB6C_D702_4B3E_418D_45D5B981BF50); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 16.94,
   "yaw": 10.17,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_1_HS_1_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ]
   },
   "pitch": -20.54,
   "class": "HotspotPanoramaOverlayMap"
  }
 ]
},
{
 "id": "IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF",
 "paddingTop": 0,
 "width": "11.27%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF.png",
 "height": "29.2%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7971343_B17D_3EDA_41E1_D4B648D50BFF_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27664"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE",
 "paddingTop": 0,
 "width": "8.96%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797A343_B17D_3EDA_41B1_10FF9F1B46EE_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27670"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935",
 "paddingTop": 0,
 "width": "8.99%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7970343_B17D_3EDA_41DF_8CEDA653A935_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27665"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
 "paddingTop": 0,
 "width": "80%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27667"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
 "paddingTop": 0,
 "width": "100%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "toggle",
 "iconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61.png",
 "height": "29.2%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27668"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96",
 "paddingTop": 0,
 "width": "80%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96.png",
 "height": "23.36%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27669"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_A7979343_B17D_3EDA_41BB_92702E290118",
 "paddingTop": 0,
 "width": "11.17%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118.png",
 "height": "29.2%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_A7979343_B17D_3EDA_41BB_92702E290118_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27671"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_F59EA3FC_AC15_152A_41D3_A68AE3523ABE",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "horizontalAlign": "center",
 "layout": "vertical",
 "paddingLeft": 0,
 "borderColor": "#000000",
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 50,
 "height": "69.727%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": true,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 2,
 "overflow": "scroll",
 "data": {
  "name": "Floor Plan Container"
 },
 "gap": 5,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_8F88A174_B17F_DAF3_41E3_9385916D5A3E",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "horizontalAlign": "center",
 "layout": "vertical",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "19.78%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Middle"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_8E56560D_B147_6613_41E3_B9F30B1AF2C2",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_8886944C_AC33_7318_41AB_EB089F4691B5"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "horizontalAlign": "center",
 "layout": "vertical",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "5.25%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Bottom"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856",
 "left": "10%",
 "paddingTop": 10,
 "itemMode": "normal",
 "itemThumbnailShadowOpacity": 0.54,
 "right": "25%",
 "itemLabelFontStyle": "normal",
 "horizontalAlign": "left",
 "itemLabelHorizontalAlign": "center",
 "paddingLeft": 20,
 "itemPaddingRight": 3,
 "backgroundOpacity": 0,
 "itemLabelFontFamily": "Arial",
 "itemBackgroundOpacity": 0,
 "itemHorizontalAlign": "center",
 "minHeight": 20,
 "itemBorderRadius": 0,
 "verticalAlign": "top",
 "propagateClick": false,
 "itemPaddingLeft": 3,
 "itemLabelPosition": "bottom",
 "itemThumbnailBorderRadius": 50,
 "selectedItemLabelFontColor": "#FFCC00",
 "itemThumbnailShadowSpread": 1,
 "minWidth": 20,
 "itemThumbnailShadowVerticalLength": 3,
 "class": "ThumbnailList",
 "borderSize": 0,
 "itemPaddingTop": 3,
 "selectedItemLabelFontWeight": "bold",
 "itemBackgroundColor": [],
 "shadow": false,
 "itemBackgroundColorRatios": [],
 "scrollBarMargin": 2,
 "layout": "vertical",
 "rollOverItemLabelFontWeight": "normal",
 "itemVerticalAlign": "middle",
 "playList": "this.ThumbnailList_B7480756_AD90_6B13_41A9_86B89E4AD856_playlist",
 "rollOverItemBackgroundOpacity": 0,
 "rollOverItemLabelFontSize": "0.78vw",
 "itemLabelTextDecoration": "none",
 "itemThumbnailShadowHorizontalLength": 3,
 "selectedItemLabelFontSize": "0.72vw",
 "paddingRight": 20,
 "itemLabelFontWeight": "normal",
 "top": "12%",
 "itemThumbnailShadowBlurRadius": 8,
 "scrollBarWidth": 10,
 "bottom": "10%",
 "itemThumbnailHeight": 60,
 "itemThumbnailScaleMode": "fit_outside",
 "borderRadius": 5,
 "itemLabelFontColor": "#FFFFFF",
 "itemLabelFontSize": "0.84vw",
 "itemBackgroundColorDirection": "vertical",
 "gap": 5,
 "itemLabelGap": 9,
 "itemThumbnailShadow": true,
 "itemThumbnailOpacity": 1,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "ThumbnailList35762"
 },
 "itemPaddingBottom": 3,
 "scrollBarVisible": "rollOver",
 "scrollBarColor": "#FFFFFF",
 "itemOpacity": 1,
 "itemThumbnailShadowColor": "#000000",
 "paddingBottom": 10
},
{
 "scrollBarMargin": 2,
 "id": "Container_A7977343_B17D_3EDA_41C0_F47328C07981",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_A7975343_B17D_3EDA_41BF_8955CDC2EDAB",
  "this.IconButton_A7974343_B17D_3EDA_41D5_38B6E5F68E61",
  "this.IconButton_A797B343_B17D_3EDA_41CA_0171986F3D96"
 ],
 "scrollBarVisible": "rollOver",
 "width": "11.36%",
 "horizontalAlign": "center",
 "layout": "vertical",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 20,
 "borderRadius": 0,
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 20,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "hidden",
 "data": {
  "name": "Container27666"
 },
 "gap": 4,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C25E280E_D6EF_FD2A_41D7_359AA23BEAC4",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_1_HS_0_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C25EC80E_D6EF_FD2A_41D4_887D44BF7121",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C54E3A9C_D6EB_5D2F_41EA_0E2D9ED53095_1_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C3AC1D55_D6E9_573E_41E2_9929DF902286",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0_HS_0_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C3ACAD56_D6E9_573A_41D8_40DDB5DF21DE",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2DCDC6A_D6EB_55EA_41E1_74BCCCAE1240_0_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C25F880C_D6EF_FD2E_41EA_BA3C8E34A0D5",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C4F18AAE_D6EB_BD6B_41D5_1FD6088B4A62_1_HS_1_0.png",
   "width": 420,
   "height": 330,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C25E780D_D6EF_FD2E_41E2_0F00B4B24B8B",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_1_HS_0_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "frameCount": 21,
 "id": "AnimatedImageResource_C25E180D_D6EF_FD29_41D1_5944803DDF00",
 "frameDuration": 41,
 "class": "AnimatedImageResource",
 "rowCount": 6,
 "levels": [
  {
   "url": "media/panorama_C2EA5B09_D6EB_D316_41DE_AE95CD3FCA97_1_HS_1_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "colCount": 4
},
{
 "scrollBarMargin": 2,
 "id": "Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
  "this.Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "horizontalAlign": "center",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "100%",
 "creationPolicy": "inAdvance",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Contact Us Compo"
 },
 "gap": 3,
 "visible": false,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_8886944C_AC33_7318_41AB_EB089F4691B5",
 "scrollBarOpacity": 0,
 "children": [
  "this.IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
  "this.Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
  "this.Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E"
 ],
 "scrollBarVisible": "rollOver",
 "width": "100%",
 "horizontalAlign": "center",
 "layout": "horizontal",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Button CU and FP"
 },
 "gap": 5,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E",
 "paddingTop": 0,
 "width": "81.529%",
 "maxWidth": 900,
 "maxHeight": 616,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E.png",
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_217F3EB5_ACF5_33E4_41E2_608DADB8CC7E_rollover.png",
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, null, null, false) }",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Contact"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "id": "Container_23BF7E02_AC1D_72AA_41DA_22E1695AF185",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
  "this.IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
  "this.IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300"
 ],
 "scrollBarVisible": "rollOver",
 "width": "20%",
 "horizontalAlign": "center",
 "layout": "vertical",
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "contentOpaque": false,
 "class": "Container",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "overflow": "scroll",
 "data": {
  "name": "Left Contact Us"
 },
 "gap": 12,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829",
 "paddingTop": 0,
 "width": "13%",
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_pressed_rollover.png",
 "minHeight": 0,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829.png",
 "height": "100%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 0,
 "rollOverIconURL": "skin/IconButton_91D696C6_B1C5_2631_41D0_5016C4C73829_rollover.png",
 "click": "if(!this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0.get('visible')){ this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_BC8D06B7_B143_E72C_41CA_E1C4F81682F0, false, 0, null, null, false) }",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Button27669"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "textDecoration": "none",
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 1,
 "id": "Button_B5551DB1_A8AE_1192_41E0_9815EC3E8FD9",
 "pressedFontSize": "1vw",
 "paddingTop": 0,
 "iconWidth": 0,
 "width": "44.1%",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "horizontalAlign": "center",
 "rollOverShadow": false,
 "layout": "horizontal",
 "paddingLeft": 0,
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "borderColor": "#FFFFFF",
 "backgroundOpacity": 0.15,
 "paddingRight": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "iconBeforeLabel": true,
 "minHeight": 1,
 "pressedRollOverBackgroundColor": [
  "#003366"
 ],
 "borderRadius": 5,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "height": "85.65%",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "fontSize": "1vw",
 "pressedBackgroundColorRatios": [
  0
 ],
 "label": "CONTACT US",
 "fontStyle": "normal",
 "pressedBackgroundColor": [
  "#003366"
 ],
 "click": "if(!this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9.get('visible')){ this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, true, 0, this.effect_2745EDF7_ACED_1161_41CE_8D7449621D35, 'showEffect', false) } else { this.setComponentVisibility(this.Container_26D3DDC5_AC15_11AC_41E2_6BB5E3BD07D9, false, 0, this.effect_2745FDF7_ACED_1161_41D1_B5EC4D857875, 'hideEffect', false) }",
 "class": "Button",
 "gap": 15,
 "borderSize": 2,
 "data": {
  "name": "Button Contact Info info"
 },
 "fontWeight": "bold",
 "pressedRollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundOpacity": 0.8,
 "cursor": "hand",
 "shadow": false,
 "paddingBottom": 0
},
{
 "textDecoration": "none",
 "backgroundColorDirection": "vertical",
 "pressedBackgroundOpacity": 1,
 "id": "Button_BAFF9AB7_AC6D_3778_41DD_EF9D1C21D15E",
 "rollOverBackgroundColor": [
  "#003366"
 ],
 "paddingTop": 0,
 "iconWidth": 0,
 "width": "44.1%",
 "fontColor": "#FFFFFF",
 "shadowColor": "#000000",
 "fontFamily": "Montserrat",
 "shadowBlurRadius": 15,
 "shadowSpread": 1,
 "horizontalAlign": "center",
 "rollOverShadow": false,
 "layout": "horizontal",
 "paddingLeft": 0,
 "borderColor": "#FFFFFF",
 "backgroundOpacity": 0.15,
 "paddingRight": 0,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "iconHeight": 0,
 "iconBeforeLabel": true,
 "minHeight": 1,
 "borderRadius": 5,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "height": "85.65%",
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "fontSize": "1vw",
 "pressedBackgroundColorRatios": [
  0
 ],
 "label": "FLOOR PLAN",
 "fontStyle": "normal",
 "pressedBackgroundColor": [
  "#003366"
 ],
 "click": "if(!this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, true, 0, this.effect_CCD93AA4_AC7D_17DF_41BE_9DB7786D337B, 'showEffect', false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_86CAAB5A_AC15_150D_41E5_8B8BF4BD3480, false, 0, this.effect_CCD9DAA4_AC7D_17DF_41E2_64CF35750EE8, 'hideEffect', false) }",
 "class": "Button",
 "gap": 5,
 "borderSize": 2,
 "pressedRollOverFontSize": "1vw",
 "fontWeight": "bold",
 "rollOverBackgroundOpacity": 0.8,
 "cursor": "hand",
 "data": {
  "name": "Button Floor Plan"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48",
 "paddingTop": 0,
 "width": "100%",
 "maxWidth": 50,
 "maxHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "pressedRollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_pressed_rollover.png",
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48.png",
 "height": "25%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_D5B1805E_AC13_0F42_41D2_CC3FD0439B48_rollover.png",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Website"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2",
 "paddingTop": 0,
 "width": "100%",
 "maxWidth": 50,
 "maxHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2.png",
 "height": "25%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_D64C3B69_AC13_714E_41C2_32E6C6ABE2F2_rollover.png",
 "click": "this.openLink('https://www.google.com/maps/place/CMED+Construction+Company/@11.5450478,104.9248668,15z/data=!4m5!3m4!1s0x0:0x7e215fce7b5af38c!8m2!3d11.5450478!4d104.9248668', '_blank')",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Map"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "id": "IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300",
 "paddingTop": 0,
 "width": "100%",
 "maxWidth": 50,
 "maxHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "pressedIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_pressed.png",
 "backgroundOpacity": 0,
 "paddingRight": 0,
 "minHeight": 1,
 "borderRadius": 0,
 "mode": "push",
 "iconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300.png",
 "height": "25%",
 "propagateClick": false,
 "verticalAlign": "middle",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_DEE538D8_AC15_3F47_41B7_DF462598A300_rollover.png",
 "click": "this.openLink('https://www.linkedin.com/company/cmedcc/', '_blank')",
 "class": "IconButton",
 "borderSize": 0,
 "transparencyActive": false,
 "cursor": "hand",
 "data": {
  "name": "Linkin"
 },
 "shadow": false,
 "paddingBottom": 0
}],
 "mouseWheelEnabled": true,
 "class": "Player",
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "desktopMipmappingEnabled": false,
 "overflow": "visible",
 "data": {
  "name": "Player3105"
 },
 "gap": 10,
 "paddingTop": 0,
 "shadow": false,
 "paddingBottom": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
