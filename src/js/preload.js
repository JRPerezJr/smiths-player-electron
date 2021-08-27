const { contextBridge } = require('electron');

const songs = require('./songData');

contextBridge.exposeInMainWorld('playerData', songs);
