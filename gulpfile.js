// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json
// gulp getj
// node json


// gulp convHtml
// gulp fc

// gsjson 1k2EgdCT3iSo_8hGwt_dOQvKwEpBcTIFe4wefljkrb5Q >> content/data.json -b

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var handlebars = require('gulp-compile-handlebars');
var useref = require('gulp-useref');
var replace = require('gulp-replace');
var exec = require('child_process').exec;
var each = require('gulp-each');
var dom  = require('gulp-dom');
var mammoth = require("mammoth");
var writeFile = require('write-file');
//var docxHtmlConverter = require('gulp-docx-converter');
var fs = require('fs');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    ignorePartials: true,
    batch : ['./src/components', './content/html/'],

    helpers: {
			capitals : function(str){
				return str.toUpperCase();
			},
      aoRow : function(str){
        var out=str;
        //out = str.replace('±row±', '</div></div class="aoRow">');
        return out;
      }
    }
  }


var dst =       '_dist/pub/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fHtmlNot=   ['!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html'];
var fImages=    ['src/images/**/*', '!src/images/oud/**/*'];
var fJs=        'src/js/**/*';
var fJson=      ['src/**/*.json', 'content/**/*.json'];
var fMd=        'content/**/*.md';
var allImgStr = 'not working';


//var siteJson = require('./content/data/sites.json');
var siteJson = require('./siteJson.json');
var imagesJson = require('./content/data/images.json');
var themesJson = require('./content/data/themes.json');
//var manuscriptJson = require('./content/data/metadata.json');
var manuscriptJson = require('./manuscriptJson.json');
var folioJson = require('./content/data/folios.json');
var folioPartsJson = require('./content/data/folioParts.json');
var folioMultiList = require('./folioMultiList.json');
var extraInfo = require('./content/data/extraInfo.json');


var copyPath = require('./content/data/copyPath.json');



// Create HTML
function createHtml(fileName) {
  mammoth.convertToHtml({path: copyPath.copyDestination+fileName+".docx", outputDir: "content/html/"})
      .then(function(result){
          htmlOut = result.value; // The generated HTML
          htmlOut = handletextPre(htmlOut);
          htmlOut = handleManuscriptComponent(htmlOut);
          htmlOut = handleManuscriptComponentMulti(htmlOut);
          htmlOut = handleMetadata(htmlOut);
          htmlOut = handleModals(htmlOut);
          //htmlOut += '<p>±row±</p> <p>±col1±</p> <p>±col2±</p> <p>±col3±</p>';

          messages = result.messages; // Any messages, such as warnings during conversion
          //console.log(htmlOut);
          fs.writeFileSync('content/html/'+fileName+'.html', htmlOut)
      })
}

// gulp convHtml
gulp.task('convHtml', function (done) {
  var htmlOut='qqq';
  var messages;
  fs = require('fs');

  for(var ii=0; ii<siteJson.length; ii++) {
      page = siteJson[ii];
      fileName = page.docx_file;
      createHtml(fileName);
      }
      //extra popup
    for(var iii=0; iii<extraInfo.length; iii++) {
        page = extraInfo[iii];
        fileName = page.docx_file;
        createHtml(fileName);
        }
done();
});



gulp.task('browserSync', function(done) {
  browserSync.init({
    //proxy: "http://localhost:8888/wp-huc"
    server: {
      baseDir: dst
    },
    browser: ["firefox"], //, "firefox" google chrome
  })
  done();
})

function reload(done) {
  browserSync.reload();
  done();
}


// clear Json files en get new data from google docs
gulp.task('cleanJson', function () {
    return gulp.src(['content/data/sites.json','content/data/images.json','content/data/themes.json','content/data/metadata.json','content/data/folios.json','content/data/folioParts.json','content/data/multiples.json', 'content/data/extraInfo.json'], {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});

gulp.task('getJSite', function (cb) {
  exec('gsjson 1Ss17Y8N7xWnS2wqRzsSumUrlaNmfZXqm3p7ynLhEsS0 >> content/data/sites.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJImages', function (cb) {
  exec('gsjson 1mEsieK-v-vucBk8EnsuzAO-9sJAOUce7yGFJVIk66tM >> content/data/images.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJThemes', function (cb) {
  exec('gsjson 1loWI7zuCVXq-K3IdNgaeTV_f_wYrOjE_Lvm5z1zWjyA >> content/data/themes.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJMeta', function (cb) {
  exec('gsjson 1YYq7dZHayAeVoE4R9_lCQ1Yx_lxN-sfLqjH5Br_5cAU >> content/data/metadata.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJFolio', function (cb) {
  exec('gsjson 1Z-Y6VJPJ3uh86805So4OVd9Mri2ci5pmJNyN_zMFhjI >> content/data/folios.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJFolioParts', function (cb) {
  exec('gsjson 1_0NrQL1LMToaYBfMXuTICHLAQicRLTZR-5IkRyB9ndc >> content/data/folioParts.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJMul', function (cb) {
  exec('gsjson 1-w8vHWmHY0ZPqFPjxUm2Y5VPgoa4IqHX4_ab7ChT97E >> content/data/multiples.json -b', function (err, stdout, stderr) { cb(err); });
})

gulp.task('getJinfo', function (cb) {
  exec('gsjson 1bPIe6bKr6LdYvDpOne2p6UJH6hczuoJpa3_KA6ts-s4 >> content/data/extraInfo.json -b', function (err, stdout, stderr) { cb(err); });
})



//
gulp.task('getj', gulp.series('cleanJson', 'getJSite', 'getJImages', 'getJThemes', 'getJMeta', 'getJFolio', 'getJFolioParts','getJMul', 'getJinfo', function (done) {
  done();
}))

// gulp getj
// meta   1YYq7dZHayAeVoE4R9_lCQ1Yx_lxN-sfLqjH5Br_5cAU
// folio 1YYq7dZHayAeVoE4R9_lCQ1Yx_lxN-sfLqjH5Br_5cAU



gulp.task('clean', function () {
    return gulp.src(['_dist/**/*.html','_dist/js/**/*','_dist/css/**/*'], {read: false, allowEmpty: true})
        .pipe(plumber())
        .pipe(clean())
});



gulp.task('nav', function(done) {
  var navs = [1, 2, 3, "manuscripts"];
  var navItems = {"items":[], "t1":0, "t2":0, "t3":0, "tm":0};

  for(var i=0; i<navs.length; i++) {
    if (navs[i] == 1) {
      navItems.t1=1;
    }
    if (navs[i] == 2) {
      navItems.t2=1;
    }
    if (navs[i] == 3) {
      navItems.t3=1;
    }
    if (navs[i] == "manuscripts") {
      navItems.tm=1;
    };


    for (var j = 0; j < siteJson.length; j++) {
      if (siteJson[j].theme == navs[i]) {
        navItems.items.push(siteJson[j]);
      }
    }
    //console.log(navItems);

    gulp.src('./src/templates/nav.html') //
        .pipe(plumber())
        .pipe(handlebars(navItems, options))
        .pipe(rename('nav-' + navs[i]+ ".html"))
        .pipe(gulp.dest('src/components/'));

    navItems = {"items":[]};

  }

   done();
});

// create foilio components
gulp.task('fc', function(done) {

    for (var f = 0; f < folioMultiList.length; f++) {

      gulp.src('./src/templates/manuscriptComp.html') //
          .pipe(plumber())
          .pipe(handlebars(folioMultiList[f], options))
          .pipe(rename('folio-' + folioMultiList[f].folioname+ ".html"))
          .pipe(gulp.dest('src/components/folios'));

  }

   done();
});





gulp.task('sass', function(){
  return gulp.src('./src/scss/*')
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(dst+'css'))
});




gulp.task('buildFromTemplates', function(done) {
  var page;
  var fileName;
  var template;
  var messages;
  var nextHref;
  var nextTitle;


  for(var i=0; i<siteJson.length; i++) {
      page = siteJson[i];
      if ((typeof page.file_name == "undefined") || (page.file_name == "")) {
        fileName = '___';
      } else {
        fileName = page.file_name; //.replace(/ +/g, '-').toLowerCase();
      }



      template = page.template_file;
      // links for nextpage

      if (page.title != 'lastpage') {
        page.nextHref = siteJson[i+1].file_name;
        page.nextTitle = siteJson[i+1].title;
        // if (siteJson[i].file_name == 'text-portraits') {
        //   page.nextHref = 'theme1';
        //   page.nextTitle = 'Back to theme';
        // }
        // if (siteJson[i].file_name == 'ramon') {
        //   page.nextHref = 'theme2';
        //   page.nextTitle = 'Back to theme';
        // }
        // if (siteJson[i].file_name == 'syllogism') {
        //   page.nextHref = 'theme3';
        //   page.nextTitle = 'Back to theme';
        // }
        if (siteJson[i].file_name == 'introduction') {
          page.nextHref = 'index';
          page.nextTitle = 'Back to Home page';
        }
        if (siteJson[i].file_name == 'about') {
          page.nextHref = 'index';
          page.nextTitle = 'Back to Home page';
        }

        if (page.type == 'manuscript') {
          page.nextTitle = siteJson[i+1].shelfmark;
        }
      }

      // manuscript data
      var manuscriptMeta = '';
      var showTl = '';
      var showMap = '';
      if (page.type == 'manuscript') {
        //manuscriptMeta += '</div></div>';
        //manuscriptMeta += '<div class="aoRow aoMetadata">';
        manuscriptMeta += '<div class="aoCol1">';
        //manuscriptMeta += '<h3>Metadata</h3>';
        manuscriptMeta += '<h4>Date</h4>'+page.dateS1+'-'+page.dateS2;
        //manuscriptMeta += '<h4>Language</h4>'+page.language;
        manuscriptMeta += '<h4>Place of origin</h4>'+page.origin;
        manuscriptMeta += '</div>';
        manuscriptMeta += '<div class="aoCol1">';
        //manuscriptMeta += '<h3>Physics</h3>';
        manuscriptMeta += '<h4>Caption</h4>';
        manuscriptMeta += ''+page.material+' manuscript,<br> ' +page.foliation + ' folia,<br>  '+ page.dimensions+ ',<br>  '+ page.language;
        //manuscriptMeta += '<h4>Foliation</h4>'+page.foliation;
        manuscriptMeta += '</div>';
        manuscriptMeta += '<div class="aoCol1"><h4>Content</h4>'+page.contents;
        manuscriptMeta += '</div>';
        //manuscriptMeta += '</div></div>';

        showTl = '<div id="spotTL">1111</div>';
        showMap = '<div><div id="spotMp">2222';
      }
      var cTitle = page.title;
      if (page.type == 'manuscript') {
        cTitle = page.shelfmark;
      }

      var citeAs = ' “'+cTitle+'”, The art of reasoning in medieval manuscripts (Dec 2020), <a href="https://art-of-reasoning.huygens.knaw.nl/'+page.file_name+'">https://art-of-reasoning.huygens.knaw.nl/'+page.file_name+'</a>.'
      //Mariken Teeuwen, “The medieval classroom”, The art of reasoning in medieval manuscripts (Dec 2020), https://art-of-reasoning.huygens.knaw.nl/medieval-classroom.

      var emaill = '<script type="text/javascript">var emailAddress = (\'mariken.teeuwen@\' + \'huygens.knaw.nl\');document.write(\'<a href="mailto:\' + emailAddress + \'">\' + emailAddress + \'</a>\');</script>';





      gulp.src('./src/templates/'+template+'.html')

          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(replace('|', '<br>'))
          .pipe(replace('<p><br />', '<p>'))
          .pipe(replace('<br /></p>', '</p>'))
          .pipe(replace('± </p>', '±</p>'))
          .pipe(replace('<p> ±', '<p>±'))
          .pipe(replace('<p>±row±</p>', '</div></div><div class="aoRow">'))
          .pipe(replace('<p>±col1±</p>', '<div class="aoCol1">'))
          .pipe(replace('<p>±col1span±</p>', '<div class="aoCol1Span">'))
          .pipe(replace('<p>±col2±</p>', '</div><div class="aoCol1">'))

          .pipe(replace('<p>±col3i±</p>', '</div></div></div><div class="aoCol1">'))

          .pipe(replace('<p>±col2span±</p>', '</div><div class="aoCol2Span">'))
          .pipe(replace('<p>±col3±</p>', '</div><div class="aoCol1">'))

          .pipe(replace('<sup><sup><a', '<span class="aorNote"><a class="aorNoteA" '))
          .pipe(replace('<sup> <sup><a', '<span class="aorNote"><a class="aorNoteA" '))
          .pipe(replace('<sup><a', '<span class="aorNote"><a class="aorNoteA" '))
          .pipe(replace(']</a></sup></sup>', '</a></span>'))
          .pipe(replace(']</a></sup>', '</a></span>'))
          .pipe(replace('">[', '">'))
          .pipe(replace('file:///C:\\Users\\renees\\AppData\\Local\\Temp\\', '/'))

          .pipe(replace('<ol><li id="footnote-1">', '<div class="notes"><ol><li id="footnote-1">'))
          .pipe(replace('</li></ol>', '</li></ol></div>'))

          .pipe(replace('±ac±', '<a id="'))
          .pipe(replace('±/ac±', '" ></a>'))
          .pipe(replace('&quot; \\l &quot;', '#'))

          .pipe(replace('±meta±', manuscriptMeta))
          .pipe(replace('<p>±timeline±</p>',''))
          .pipe(replace('<p>±map±</p>', ''))
          .pipe(replace('<a id="_heading=h.gjdgxs"></a>', ''))
          .pipe(replace('<a href="file:///C:\\', '<a href="/'))
          //.pipe(replace('.html%3f', ".html?"))


          .pipe(replace('±cite±', citeAs))
          .pipe(replace('mariken.teeuwen@huygens.knaw.nl', emaill))

          .pipe(each(function(content, file, callback) {
            // replace images and theme names
            var newContent = handleImages(content);
            newContent = handleLinks(newContent);
            newContent = handleThemes(newContent);
            newContent = handleInternalLinks(newContent);

            callback(null, newContent);
            }))
          .pipe(useref())
          .pipe(gulp.dest(dst))
          .pipe(browserSync.stream());
  }
  done();
});


gulp.task('copyImg', function(){
  return gulp.src(fImages)
    .pipe(plumber())
    .pipe(gulp.dest(dst+'images'))
});

gulp.task('handleSvg', function(){
  return gulp.src('src/svg/aor_home.svg')
    .pipe(plumber())
    .pipe(replace('<!-- Generator: Adobe Illustrator 24.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->"', ''))
    .pipe(replace('<?xml version="1.0" encoding="utf-8"?>', ''))
    .pipe(rename(function (path) {
      path.extname = ".html";
    }))
    .pipe(gulp.dest('src/components/'));

    //height="500" width="1000"
    //<?xml version="1.0" encoding="utf-8"?>
});


gulp.task('build',
  gulp.series( 'clean', 'nav', 'sass', 'buildFromTemplates',// 'copyImg',
  function(done) {
      done();
  }
));


gulp.task('watch', function () {
  gulp.watch(['src/**/*.html', '!src/components/folios/**/*.html', '!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html','!src/components/aor_home.html', 'src/scss/**/*.scss','src/js/**/*', 'src/**/*.json', 'content/**/*.json'], gulp.series('build')); //, fHtmlNot, fScss, fJs, fJson, fMd
});


gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','copyImg','watch'),
  function(done) {
      done();
  }

));


function ifEmp(input, pre, post) {
  if(input != undefined) {
    return pre+input+post;
  }else {
    return '';
  }
}


function handleImages(content) {
  var output;

  for (var i = 0; i < imagesJson.length; i++) {
    var vHyperlink = '';
    if(typeof imagesJson[i].hyperlink !== "undefined") {
      vHyperlink = '<br><a href="'+imagesJson[i].hyperlink+'" class="aorSourceLink"  target="_blank">'+imagesJson[i].hyperlink+'</a>';
    }

    content = content.replace('[[['+imagesJson[i].img_file_name+']]]', '<figure class="aorIllu"><img src="images/content/'+imagesJson[i].img_file_name+'"><figcaption>'+imagesJson[i].description+ vHyperlink+'</figcaption></figure>');
  }

  return content;
}

function handleThemes(content) {
  for (var i = 0; i < themesJson.length; i++) {

    var find = themesJson[i].shortode;
    var regex = new RegExp(find, "g");
    //content = content.replace(regex, '<a href="'+themesJson[i].themelink+'">'+themesJson[i].themename+'</a>');
    content = content.replace(regex, themesJson[i].themename);
  }
  return content;
}

function handleLinks(content) {
  for (var i = 0; i < siteJson.length; i++) {

    var find = '±a±'+siteJson[i].page_id+'±a±';
    var regex = new RegExp(find, "g");
    content = content.replace(regex, '<a href="'+siteJson[i].file_name+'.html">'+siteJson[i].title+'</a>');
    //content = content.replace(regex, themesJson[i].themename);
  }
  return content;
}





function handleModals(content) {
  for (var i = 0; i < extraInfo.length; i++) {

    var find = '±i±'+extraInfo[i].info_id+'±i±';
    if (content.includes(find)) {
      var str1 = '<div class="aorModalFade" id="'+extraInfo[i].info_id+'"><div class="aorModalPop"><span class="closeModal closeButton" onclick="javascript:closeModal(\''+extraInfo[i].info_id+'\');"><img src="images/icons/close.png" alt=""></span><div class="aorModalContent">';
      var str2 = '</div></div></div>';
      content += str1+'{{> '+extraInfo[i].docx_file+' }}'+str2;
    }

    var regex = new RegExp(find, "g");
    content = content.replace(regex, '<span class="modalNote"><a href="#" onClick="javascript:modalLoad(\''+extraInfo[i].info_id+'\'); return false">i</a></span>');

  }
  return content;
}

function handleManuscriptComponent(content) {
    for (var f = 0; f < folioMultiList.length; f++) {
      var rplce='';
      rplce = '{{> folios/folio-'+folioMultiList[f].folioname+' }}';
      var find2 = '<p>±f±'+folioMultiList[f].folioname+'±f±</p>';
      var regex2 = new RegExp(find2, "g");
      content = content.replace(regex2,rplce);
    }
  return content;
}


function handleInternalLinks(content) {
  for (var i = 0; i < siteJson.length; i++) {
    //<a href="http://vlq103

    var find = '<a href="http://'+siteJson[i].file_name;
    var regex = new RegExp(find, "g");
    content = content.replace(regex, '<a href="/'+siteJson[i].file_name);
  }
  return content;
}




function handleManuscriptComponentMulti(content) {
    for (var f = 0; f < folioMultiList.length; f++) {
      var rplce='';


      rplce = '{{> folios/folio-'+folioMultiList[f].folioname+' }}';
      var find2 = '<p>±m±'+folioMultiList[f].folioname+'±m±</p>';
      var regex2 = new RegExp(find2, "g");
      content = content.replace(regex2,rplce);
    }
  return content;
}






// gulp convHtml
function handletextPre(content) {
    content = content.replace(/<p>±col2±	<\/p>/g, "<p>±col2±</p>");
    content = content.replace(/<p>±col2± <\/p>/g, "<p>±col2±</p>");
    content = content.replace(/±row±<br \/>±col1span±/g, "±row±</p><p>±col1span±");
    content = content.replace(/<strong><br \/><\/strong>/g, "<br />");
    content = content.replace(/±f±<br \/><\/p>/g, "±f±</p>");
    content = content.replace(/±m±<br \/><\/p>/g, "±m±</p>");
    content = content.replace(/<br \/>±col2span±<\/p>/g, "</p><p>±col2span±</p>");
    content = content.replace(/<p>±row±<br \/>±col1±<\/p>/g, "<p>±row±</p><p>±col1±</p>");
    content = content.replace(/]]] <\/p>/g, "]]]</p>");
    content = content.replace(/<p>±col3± <\/p>/g, "<p>±col3±</p>");
    content = content.replace(/<p>±row±<br \/>±col1span±<\/p>/g, "<p>±row±</p><p>±col1span±</p>");
    content = content.replace(/<h2>±col1±<\/h2>/g, "<p>±col1±</p>");
    content = content.replace(/<p>±row±<br \/>±col1±<br \/>/g, "<p>±row±</p><p>±col1±</p><p>");
    content = content.replace(/<p>±col2span± <\/p>/g, "<p>±col2span±</p>");
    content = content.replace(/<p>±col2±<br \/>/g, "<p>±col2±</p><p>");
    content = content.replace(/<p>±col1±<br \/>/g, "<p>±col1±</p><p>");
    content = content.replace(/]]]<br \/><\/p>/g, "]]]</p>");
    content = content.replace(/<p><br \/>±row±<br \/>±col1±<\/p>/g, "<p>±row±</p><p>±col1±</p>");
    content = content.replace(/±<br \/>\[\[\[/g, "±</p><p>[[[");
    content = content.replace(/±<br \/>±col2span±<\/p>/g, "</p><p>±col2span±</p>");



    content = content.replace(/<p><br \/>±row±<\/p>/g, "<p>±row±</p>");
    content = content.replace(/<p>±col2span±<br \/>/g, "<p>±col2span±</p><p>");
    content = content.replace(/<br \/><\/em>±col3±<\/p>/g, "</em></p><p>±col3±</p>");
    content = content.replace(/<br \/>±col2±<\/p>/g, "</p><p>±col2±</p>");
    content = content.replace(/<p><br \/>±row±<\/p>/g, "<p>±row±</p>");
    content = content.replace(/<br \/>±col2span±<br \/>/g, "<p><p>±col2span±</p><p>");
    content = content.replace(/<p>±row± /g, "<p>±row±");
    content = content.replace(/<p>±col1±  /g, "<p>±col1±");
    content = content.replace(/±m± <\/p>/g, "±m±</p>");
    content = content.replace(/±f± <\/p>/g, "±f±</p>");
    content = content.replace(/ ±m±<\/p>/g, "±m±</p>");
    content = content.replace(/ ±f±<\/p>/g, "±f±</p>");
    content = content.replace(/<h2>±colspan±<\/h2>/g, "<p>±colspan±</p>");
    content = content.replace(/<p>±colspan±<\/p>/g, "<p>±col1span±</p>");
    content = content.replace(/<p>±col3±<br \/>/g, "<p>±col3±</p><p>");
    content = content.replace(/<p>±row±<br \/>/g, "<p>±row±</p><p>");
    content = content.replace(/<p>±col1± <\/p>/g, "<p>±col1±</p>");
    content = content.replace(/<p>±col1span±<br \/>/g, "<p>±col1span±</p><p>");
    content = content.replace(/file:\/\/\/C:\\Users\\renees\\AppData\\Local\\Temp\\/g, "/");
    content = content.replace(/file:\/\/\/C:\\Users\\ReneeS\\AppData\\Local\\Temp\\/g, "/");
    content = content.replace(/\?fportait/g, "?portait");


    //<a id="_heading=h.gjdgxs"></a>
    //<a id="_heading=h.30j0zll"></a>
    //<a id="bookmark=id.gjdgxs">
    //±row±<br />±col1span±
    //<p>±row±	</p>
    //<a id="_heading=h.1fob9te"></a>
    //<br />±col2span±</p>
    //<p>±col1±  </p>
    //<p><a id="_headingh.3znysh7"></a>±row±<br />±col1±<br />
    //<br />±col2span±</p>
    content = content.replace(/<p><a id="_headingh.3znysh7"><\/a>±row±<br \/>±col1±<br \/>/g, "<p>±row±</p><p>±col1±</p>");
    content = content.replace(/<a id=\"_heading=h.gjdgxs\"><\/a>/g, "");
    content = content.replace(/<a id=\"_heading=h.30j0zll\"><\/a>/g, "");
    content = content.replace(/<a id=\"bookmark=id.gjdgxs\"><\/a>/g, "");
    content = content.replace(/±row±	<\/p>/g, "±row±</p>");
    content = content.replace(/<a id="_heading=h.1fob9te"><\/a>/g, "");
    content = content.replace(/<br \/>±col2span±<\/p>/g, "</p><p>±col2span±</p>");

    content = content.replace(/<p>±col1±  <\/p>/g, "<p>±col1±</p>");


    content = content.replace(/<a id="_heading=h.gjdgxs"><\/a>/g, "");
    content = content.replace(/.html%3f/g, ".html?");
    content = content.replace(/<p>±row± <\/p>/g, "<p>±row±</p>");
    content = content.replace(/<p><a id="theme1"><\/a>±col1span±<\/p>/g, '<p>±col1span±</p><a id="theme1"></a>');



    //content = content.replace(/±timeline±/g, '<div class="">{{> timeline}}</div>');
    //content = content.replace(/±map±/g, '<div class="">{{> map}}</div>');
    content = content.replace(/<p>\[\[\[timeline\]\]\]<\/p><p>\[\[\[map\]\]\]<\/p>/g, '');
    content = content.replace(/<p>±map±<\/p>/g, '');
    content = content.replace(/±timeline±/g, '');
    content = content.replace(/±map±/g, '');

    //content = content.replace(/±meta±/g, '±meta±');
    //<div><h2>Timeline</h2>{{> timeline}}</div><div><h2>Map</h2>{{> map}}</div>

//            <p>±row± </p>
  return content;
}

//±meta±

function handleMetadata(content) {
    //content = content.replace('<p>±row±</p>', '±meta± <p>±row±</p>'); // ±timeline± ±map±
    //content = content.replace('<p>±row±</p>', '±meta± ±timeline± ±map± <p>±row±</p>'); // ±timeline± ±map±

  return content;
}
