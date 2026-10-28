const fs=require('node:fs'),path=require('node:path');
const root=__dirname;fs.mkdirSync(path.join(root,'dist'),{recursive:true});
for(const name of ['app.js','index.html','memories.html','message.html','style.css','themes.css','refined.css'])fs.copyFileSync(path.join(root,'src',name),path.join(root,'dist',name));
for(const name of ['content.js','nakai.css'])fs.copyFileSync(path.join(root,'src',name),path.join(root,'dist',name));
fs.cpSync(path.join(root,'src','images'),path.join(root,'dist','images'),{recursive:true});
console.log('Static Site built, including images.');
