/* 
* File system wrappers for Phonegap/Apache Cordova
* by Anthony W. Hursh, tony.hursh@gmail.com
* Copyright 2013 by Contraterrene eLearning Group, LLC
* Made available under the terms of the Apache 2.0 license
* (the same license as Phonegap/Cordova itself). See the NOTICE
* file for details.
*/
var QuickFile = {
		extractDirectory: function(path){
		var dirPath;
		var lastSlash = path.lastIndexOf('/');
		if(lastSlash == -1){
			dirPath = "/";
		}
		else{
			dirPath = path.substring(0,lastSlash);
			if(dirPath == ""){
				dirPath = "/";
			}
		}
		return dirPath;
	},

	extractFilename: function(path){
		var lastSlash = path.lastIndexOf('/');
		if(lastSlash == -1){
			return path;
		}
		var filename =  path.substring(lastSlash + 1);
		return filename;
	},

	appendFile: function(fullpath,data,success,fail){
		this.llWriteFile(fullpath,data,success,fail,true);
	},
	
	writeFile: function(fullpath,data,success,fail){
		this.llWriteFile(fullpath,data,success,fail,false);
	},
	
	llWriteFile: function(fullpath,data,success,fail,append){
		window.resolveLocalFileSystemURL(QuickFile.extractDirectory(fullpath),
		function(dirEntry){
			dirEntry.getFile(QuickFile.extractFilename(fullpath), {create: true}, 
			function(fileEntry){
					var fileURL = fileEntry.toURL();
					fileEntry.createWriter(
						function(writer){
							writer.onwrite = function(evt){
								success(fileURL);
							};
							writer.onerror = function(evt){ 
								fail(evt.target.error);
							};
							if(append == true){
								writer.seek(writer.length);
							}
							writer.write(data);
					},fail);
			},fail);
		},fail);
	},
	readFile: function(fullpath,asText,success,fail){
		window.resolveLocalFileSystemURL(QuickFile.extractDirectory(fullpath),
		function(dirEntry){
			dirEntry.getFile(QuickFile.extractFilename(fullpath), {create: false}, 
			function(fileEntry){
				fileEntry.file(function(file){
					var reader = new FileReader();
					reader.onloadend = function(evt) {
						success(evt.target.result);
					};
					reader.onerror =  function(evt){
						fail();
					}
					if(asText){
						reader.readAsText(file);
					}
					else{
						reader.readAsDataURL(file);
					}
				},fail);
			},fail);
		},fail);
	},
	
	deleteFile: function(fullpath,success,fail){
		window.resolveLocalFileSystemURL(QuickFile.extractDirectory(fullpath),
			function(dirEntry){
				dirEntry.getFile(QuickFile.extractFilename(fullpath), {create: false}, 
				function(fileEntry){
					fileEntry.remove(success,fail);
				},fail);
			},fail);
	},
	readDirectory: function(dirName,success,fail){
		window.resolveLocalFileSystemURL(dirName,
			function(dirEntry){
				var directoryReader = dirEntry.createReader();
				directoryReader.readEntries(
					function(entries){
						var flist = [];
						for(var i = 0; i < entries.length; i++){
							flist.push(entries[i].name);
						}
						success(flist);
					},fail);
			},fail);    
	},
	mkDirectory: function(dirFullPath,success,fail){
		var existPath = extractDirectory(dirFullPath);
		var createPath = "";

		function shiftPath(e, fail) {
			if (e.code == FileError.NOT_FOUND_ERR) {
				existPath = extractDirectory(existPath);
				createPath = dirFullPath.replace(existPath, "");
				createPath = extractDirectory(existPath);
				createPath.shift();
				getEntry(existPath);
			} else {
				fail(e);
			}
		};
		function finish(entry) {
			if (createPath == "") {
				return;
			}
		    entry.getDirectory(createPath, {create: true, exclusive: false}, success, fail);
		};
		function getEntry(path) {
			window.resolveLocalFileSystemURL(path, finish, shiftPath);
		};
		getEntry(dirFullPath);
	},
	rmDirectory: function(dirFullPath,success,fail){
        window.resolveLocalFileSystemURL(dirFullPath,
				function(dirEntry){
					dirEntry.removeRecursively(success,fail);
				},fail);
	},

	fileExists: function(fullpath,success,fail){
		var dirName = this.extractDirectory(fullpath);
		var fileName = this.extractFilename(fullpath);
		this.readDirectory(dirName,function(flist){
			for(var i = 0; i < flist.length; i++ ){
				if(flist[i].match(fileName)){
					success(true);
					return;
				}
			}
			success(false);
		},fail); 
	},
	errorToString: function(e) {
		var msg = 'UNKNOWN_ERROR';

		for (name in FileError) {
			if (e.code === FileError[name])
				msg = name;
		}
		return msg;
	}
};

