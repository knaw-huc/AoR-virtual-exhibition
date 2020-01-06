// npm i
// npm audit fix --force

// npm install -g google-spreadsheet-to-json
// gulp getj
// gulp convHtml

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

var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const using = require('gulp-using');

var options = {
    batch : ['./src/components', './content/html/'],
    helpers: {
			capitals : function(str){
				return str.toUpperCase();
			},
      test1 : function(str){
        return '***'+str+'***'
      }
    }
  }


var dst =       '_dist/';
var prebuild =  'prebuild';
var fScss=      'src/scss/**/*.scss';
var fHtml=      'src/**/*.html';
var fHtmlNot=   ['!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html'];
var fImages=    ['src/images/**/*', '!src/images/oud/**/*'];
var fJs=        'src/js/**/*';
var fJson=      ['src/**/*.json', 'content/**/*.json'];
var fMd=        'content/**/*.md';
var allImgStr = 'not working';


var siteJson = require('./content/data/sites.json');
var imagesJson = require('./content/data/images.json');
var themesJson = require('./content/data/themes.json');
var manuscriptJson = require('./content/data/metadata.json');
//var manuscriptJson = require('./content/data/metadataTest.json');

var folioJson = require('./content/data/folios.json');
var folioPartsJson = require('./content/data/folioParts.json');

var copyPath = require('./content/data/copyPath.json');

function combineJson(){
  for (var mi = 0; mi < manuscriptJson.length; mi++) { // all manuscriptJson
    // add folio
    manuscriptJson[mi].folios = [];
    for (var fi = 0; fi < folioJson.length; fi++) {
      if (folioJson[fi].manuscript_id == manuscriptJson[mi].id) {
        manuscriptJson[mi].folios.push(folioJson[fi]);
        folioJson[fi].folioParts=[];

        //find folio parts
        for (var pi = 0; pi < folioPartsJson.length; pi++) {

          if (folioJson[fi].folioid == folioPartsJson[pi].folioid) {
            //add folioparts
            manuscriptJson[mi].folios[fi].folioParts.push(folioPartsJson[pi]);
          }//if
        }//parts
      }//if
    }//folios
  }// manuscript
  //console.log(manuscriptJson[0].folios[0]);
  //console.log(manuscriptJson);
}// function
combineJson();




// Create HTML
function createHtml(fileName) {
  mammoth.convertToHtml({path: copyPath.copyDestination+fileName+".docx", outputDir: "content/html/"})
      .then(function(result){
          htmlOut = result.value; // The generated HTML
          htmlOut = handleManuscriptComponent(htmlOut);
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
    return gulp.src(['content/data/sites.json','content/data/images.json','content/data/themes.json','content/data/metadata.json','content/data/folios.json','content/data/folioParts.json'], {read: false, allowEmpty: true})
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

//
gulp.task('getj', gulp.series('cleanJson', 'getJSite', 'getJImages', 'getJThemes', 'getJMeta', 'getJFolio', 'getJFolioParts', function (done) {
  done();
}))

// gulp getj
// meta   1YYq7dZHayAeVoE4R9_lCQ1Yx_lxN-sfLqjH5Br_5cAU
// folio 1YYq7dZHayAeVoE4R9_lCQ1Yx_lxN-sfLqjH5Br_5cAU



gulp.task('clean', function () {
    return gulp.src(dst, {read: false, allowEmpty: true})
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




gulp.task('manuscriptComps', function(done) {
  for (var m = 0; m < manuscriptJson.length; m++) {
    var manuscriptData = manuscriptJson[m];

    // get data from site to get filename of manuscriptpage
    for (var i = 0; i < siteJson.length; i++) {
      if (siteJson[i].manuscript_id == manuscriptJson[m].id) {
        //console.log(siteJson[i].manuscript_id);
        var pageFilename = siteJson[i].file_name+'.html';
      }
    }
    manuscriptData.filename=pageFilename;




    for (var f = 0; f < manuscriptJson[m].folios.length; f++) {
      //console.log(manuscriptData);

      manuscriptJson[m].folios[f].manuscriptData = manuscriptData;

      gulp.src('./src/templates/manuscriptComp.html') //
          .pipe(plumber())
          .pipe(handlebars(manuscriptJson[m].folios[f], options))
          .pipe(rename('folio-' + manuscriptJson[m].folios[f].folioid+ ".html"))
          .pipe(gulp.dest('src/components/folios'));
    }
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
      fileName = page.file_name; //.replace(/ +/g, '-').toLowerCase();
      template = page.template_file;
      // links for nextpage
      if (page.title != 'lastpage') {
        page.nextHref = siteJson[i+1].file_name;
        page.nextTitle = siteJson[i+1].title;
      }



      gulp.src('./src/templates/'+template+'.html')
          .pipe(plumber())
          .pipe(handlebars(page, options))
          .pipe(rename(fileName + ".html"))
          .pipe(replace('|', '<br>'))
          .pipe(each(function(content, file, callback) {
            // replace images and theme names
            var newContent = handleImages(content);
            newContent = handleThemes(newContent);
            newContent = handleManuscriptComponent(newContent)
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
  gulp.series('manuscriptComps', 'clean', 'handleSvg', 'nav', 'sass', 'buildFromTemplates', 'copyImg',
  function(done) {
      done();
  }
));


gulp.task('watch', function () {
  gulp.watch(['src/**/*.html', '!src/components/folios/**/*.html', '!src/components/nav-top.html','!src/components/nav-1.html','!src/components/nav-2.html','!src/components/nav-3.html','!src/components/nav.html','!src/components/nav-manuscripts.html','!src/components/aor_home.html', 'src/scss/**/*.scss','src/js/**/*', 'src/**/*.json', 'content/**/*.json'], gulp.series('build')); //, fHtmlNot, fScss, fJs, fJson, fMd
});


gulp.task('default',
  gulp.series('build', gulp.parallel('browserSync','watch'),
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
    content = content.replace('[[['+imagesJson[i].img_file_name+']]]', '<figure><img src="images/content/'+imagesJson[i].img_file_name+'"><figcaption>'+imagesJson[i].description+'<br>Source: '+imagesJson[i].resource+'</figcaption></figure>');
  }

  return content;
}

function handleThemes(content) {
  for (var i = 0; i < themesJson.length; i++) {

    var find = themesJson[i].shortode;
    var regex = new RegExp(find, "g");
    content = content.replace(regex, '<a href="'+themesJson[i].themelink+'">'+themesJson[i].themename+'</a>');
  }
  return content;
}

function handleManuscriptComponent(content) {


  for (var m = 0; m < manuscriptJson.length; m++) {
    for (var f = 0; f < manuscriptJson[m].folios.length; f++) {
      var rplce='';
      rplce += '{{> folios/folio-'+manuscriptJson[m].folios[f].folioid+' }}';

       content = content.replace('<p>±f±'+manuscriptJson[m].folios[f].folioid+'±f±</p>',rplce); //
    }
  }



  return content;
}
