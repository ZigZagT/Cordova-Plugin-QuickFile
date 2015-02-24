# Cordova-Plugin-QuickFile
<p>基于GapFile修改而来：https://github.com/tonyhursh/gapfile
配合最新org.apache.cordova.file使用以提高效率。</p>

<p>某一版本后的file插件提供了一些重要的系统路径（https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md#where-to-store-files ），可以直接调用。但是GapFile只能通过设置preference（https://github.com/apache/cordova-plugin-file/blob/master/doc/index.md#ios-persistent-storage-location ）来设置存储路径，很不方便。所以改写了gapfile</p>
<hr>
<h3>用法</h3>
<p>因为整个插件只有一个js文件，所以使用时将quickfile.js复制到www/js目录即可。需要在在index.html中手动引用该文件。
添加了全局对象QuickFile。所有函数调用方法均形如
<pre>QuickFile.readDirectory(dirName, success, fail);</pre>
<b>改写自GapFile的函数</b>：参见GapFile项目的说明：https://github.com/tonyhursh/gapfile <br>
<b>比GapFile新增的函数</b>：<br>
errorToString(e)<br>
参数：<br>
FileError e<br>
返回：代表该错误的字符串。<br>
</p>
