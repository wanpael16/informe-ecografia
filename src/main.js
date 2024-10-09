//Main es el proceso principal de electron permite tener conexion a los recursos del sistema operativo(conexion a bd)
const electronApp = require('electron').app;
const electronIpcMain = require('electron').ipcMain;
const electronBrowserWindow = require('electron').BrowserWindow;
const Store = require('electron-store');
const store = new Store();
let path = require('path');
const db = require('./connection.js');
const { Menu  } = require('electron')
let loginWindow;
// --->Ventana dashboard
const createWindowDashboard = () => {
    // Create the browser window.
    window = new electronBrowserWindow({
    //   icon: __dirname + '/assets/images/favicon.ico',
      width: 900,
      height: 600,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        devTools: true,
        preload: path.join(__dirname, 'preload.js')
      }
    });
  
    // and load the index.html of the app.
    window.loadFile(path.join(__dirname, 'views/index.html'));
  
    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    window.webContents.openDevTools();
  };
// <---Fin Ventana dashboard
 
// --->Ventana login
function createWindow(){
    loginWindow= new electronBrowserWindow({
        width: 500,
        height: 500,
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: true, // Habilitar aislamiento
            preload:path.join(__dirname,'preload.js')
        }
    })
    loginWindow.loadFile('src/views/login.html');
    // window.webContents.openDevTools();
}
// <---Fin ventana login

electronApp.on('ready', createWindow);



electronIpcMain.on('login', (event, data) => {
    validateLogin(data);
  });
  
   function validateLogin(data) {
    
    const { email, password } = data;
    const sql = 'SELECT * FROM user WHERE email=? AND password=?';
  
    db.query(sql, [email, password], (error, results, fields) => {
      if (error) {
        console.log(error);
      }
  
      if (results.length > 0) {
        store.set('name', results[0].nombre);
        store.set('email', results[0].email);
        // store.delete('email');
        // console.log(typeof results[0].email); 
        console.log(results[0].nombre); 
        // store.set('email',results[0].email );
        // store.set('permissions', results[0].permiso);
        // store.set('name', results[0].nombre);
        // store.set('image', results[0].imagen);
  
        createWindowDashboard();
        // window.loadFile(path.join(__dirname, 'views/consultar.html'));
        window.maximize();
        window.show();
        loginWindow.close();
        // console.log(results);
      }
    });
  }
  
// --->Inicio logout
  electronIpcMain.on('logout', (event, confirm) => {
    validateLogout(confirm);
  });
  
  function validateLogout(confirm) {
    if (confirm == 'confirm-logout') {
      store.delete('user');
      store.delete('email');
      store.delete('permissions');
      store.delete('name');
      store.delete('image');
  
      store.delete('idCarrera');
      store.delete('nombreCarrera');
  
      /*store.delete('isbn');
      store.delete('nombre');
      store.delete('carrera');
      store.delete('ubicacion');
      store.delete('editorial');*/
  
      store.delete('isbnL');
      store.delete('nombreL');
      store.delete('carreraL');
      store.delete('ubicacionL');
      store.delete('editorialL');
  
      store.delete('confirmAdd');
      store.delete('confirmUpdate');
      store.delete('confirmDelete');
  
      createWindow();
      loginWindow.show();
      window.close();
    }
  }
// <---fin logout

// --->Datos del usuario
electronIpcMain.handle('getUserData', (event) => {
    const data = {  email: store.get('email'),name: store.get('name')};
  
    return data;
  });
// <---Fin Datos del usuario
  
async function procesarDatos() {
  await db.query('SELECT * FROM user', (error, results, fields) => {
    if (error) {
      console.log(error);
    }
   
    return results;

  }
 
 );

}

electronIpcMain.handle('getBooks', async   (event) => {

  try {
    const resultado = await procesarDatos();
    return resultado; // Este valor se devuelve al proceso de renderizado
} catch (error) {
    console.error('Error en la consulta:', error);
    throw error; // Lanza el error para manejarlo en el proceso de renderizado
}
   
  //  console.log(a);
  //  return   "hola";
  // const data = { isbn: store.get('isbn'), nombre: store.get('nombre'), carrera: store.get('carrera'), ubicacion: store.get('ubicacion'), editorial: store.get('editorial') };

  // return data;
});




const templateMenu =[
  {
      label:'File',
      submenu:[
          {
              label:'New Product',
              accelerator:'Ctrl+N',
              click(){
                  alert();
              }
          }
      ]
  }
]


if(process.env.NODE_ENV != 'production'){
  templateMenu.push({
      label:'DevTools',
      submenu:[
          {
              label:'Show/Hide Dev Tools',
              click(item,focusedWindow){
                  focusedWindow.toggleDevTools();
              },
              accelerator:'Ctrl+u',
          },
          {
              role:'reload'
          }
      ]
  })
  electron:path.join(__dirname,'../node_module','.bin','electron')
}



  if(process.env.NODE_ENV != 'production'){
    require('electron-reload')(__dirname)
    electron:path.join(__dirname,'../node_module','.bin','electron')
}








