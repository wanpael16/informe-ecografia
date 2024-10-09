const contextBridge = require('electron').contextBridge;
const ipcRender = require('electron').ipcRenderer;

const ipc = {
    'render': {
        'send': [
            'login',
            'logout',
            'invitado',
            'addBook',
            'updateBook',
            'deleteBook',
            'consultBook',
            'consultCarreras'
        ],
        'sendReceive': [
            'getCarreras',
            'getUserData',
            'getBooks',
            'getBook',
            'confirmAddBook',
            'confirmUpdateBook',
            'confirmDeleteBook'
        ]
    }
};

contextBridge.exposeInMainWorld(
    'ipcRender', {
    send: (channel, args) => {
        let validChannels = ipc.render.send;

        if (validChannels.includes(channel)) {
            ipcRender.send(channel, args);
        }
    },
    invoke: (channel, args) => {
        let validChannels = ipc.render.sendReceive;

        if (validChannels.includes(channel)) {
            return ipcRender.invoke(channel, args);
        }
    }
});










// const { contextBridge, ipcRenderer } = require("electron");


// contextBridge.exposeInMainWorld(
//     'electronApi',
//     {
//       doThing: (ab,callback) =>  ipcRenderer.invoke('login',ab),
//       myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
//       anAsyncFunction: async (a) => console.log(a),
//     }
//   )


//   contextBridge.exposeInMainWorld(
//     'electron',
//     {
//       doThing: () => ipcRenderer.send('do-a-thing'),
//       myPromises: [Promise.resolve(), Promise.reject(new Error('whoops'))],
//       anAsyncFunction: async () => 123,
//       data: {
//         myFlags: ['a', 'b', 'c'],
//         bootTime: 1234
//       },
//       nestedAPI: {
//         evenDeeper: {
//           youCanDoThisAsMuchAsYouWant: {
//             fn: () => ({
//               returnData: 123
//             })
//           }
//         }
//       }
//     }
//   )