# Cordova-Plugin-QuickFile
<p>基于GapFile修改而来：https://github.com/tonyhursh/gapfile
配合最新org.apache.cordova.file使用以提高效率。</p>
<p>某一版本后的file插件提供了一些重要的系统路径（https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md#where-to-store-files ），可以直接调用。但是GapFile只能通过设置preference（https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md#ios-persistent-storage-location ）来设置存储路径，很不方便。所以改写了gapfile</p>
<hr>
<h3>用法</h3>
<p>因为整个插件只有一个js文件，所以使用时将quickfile.js复制到www/js目录即可。需要在在index.html中手动引用该文件。
添加了全局对象QuickFile。所有函数调用方法均形如
<pre>
QuickFile.readDirectory(dirFullPath, success, fail);
    在QuickFile，GapFile中，所有的目录必须以'/'结尾，否则会认为最后一级为文件。
    在QuickFile中，所有的路径均为<b>绝对路径</b>, 以便使用cordova.file.applicationDirectory等属性。形如 file:////var/mobile/Applications/
</pre>
<b>改写自GapFile的函数</b>：<br>参见GapFile项目的说明：https://github.com/tonyhursh/gapfile <br><br>
<b>比GapFile新增的功能</b>：<br>
<pre>
新增：
    QuickFile.errorToString(FileError e)
        返回代表该错误的字符串。
    
    
修改：
    QuickFile.mkDirectory(...)
        可以创建形如 test1/test2/test3/... 的目录
    
    QuickFile.rmDirectory(...)
        递归删除目录及其中的所有内容。GapFile中只能删除空目录。
<pre>
</p>
